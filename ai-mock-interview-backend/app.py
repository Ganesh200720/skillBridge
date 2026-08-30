from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

from langchain.chat_models import init_chat_model
from langgraph.checkpoint.memory import InMemorySaver
from langchain.agents import create_agent
from groq import Groq
from langchain_groq import ChatGroq

import edge_tts
import asyncio
import tempfile
import base64
import os
import json

import database

# ENVIRONMENT

load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API")

if not GROQ_API_KEY:
    raise ValueError("GROQ_API is missing from .env")

# FLASK APP
app = Flask(__name__)

CORS(app)

# DATABASE
database.init_db()

# GROQ CLIENT

client = Groq(api_key=GROQ_API_KEY)

# LANGCHAIN MODEL
model = ChatGroq(
    model="groq/compound-mini",
    api_key=GROQ_API_KEY
)

# INTERVIEW AGENT
# NOTE: the agent + checkpointer are created ONCE at startup, not per
# interview. LangGraph keeps conversation histories separate per
# "thread_id" inside the same checkpointer, so every interview gets its
# own thread_id (its database row id) instead of a single shared
# "interview_session" id. That was the bug in the original version:
# a single global thread_id meant two people interviewing at the same
# time would overwrite each other's conversation.
checkpointer = InMemorySaver()

agent = create_agent(
    model=model,
    tools=[],
    checkpointer=checkpointer
)

TOTAL_QUESTIONS = 5

# INTERVIEW PROMPT

INTERVIEW_PROMPT = """
You are Natalie, a friendly and conversational interviewer
conducting a natural {subject} interview.

IMPORTANT GUIDELINES:

1. Ask exactly 5 questions total throughout the interview.
2. Keep questions SHORT and CRISP (1-2 sentences maximum).
3. ALWAYS reference what the candidate ACTUALLY said in their
   previous answer. Do NOT make up or assume their answers.
4. Show genuine interest with brief acknowledgments based on
   their REAL responses.
5. Adapt questions based on their ACTUAL responses.
6. Go deeper if they are strong.
7. Adjust the difficulty if they are uncertain.
8. Be warm and conversational but CONCISE.
9. No lengthy explanations.
10. Ask clear and direct questions.

CRITICAL:

Read the conversation history carefully.

Only acknowledge what the candidate truly said.

Keep it short, conversational, and adaptive.
"""

# FEEDBACK PROMPT

FEEDBACK_PROMPT = """
Based on our complete interview conversation, provide detailed
feedback as JSON only.

Return EXACTLY this structure:

{
    "subject": "<topic>",
    "candidate_score": <1-5>,
    "feedback": "<detailed strengths with specific examples from their actual answers>",
    "areas_of_improvement": "<constructive suggestions based on gaps you noticed>"
}

Be specific.

Reference ACTUAL things the candidate said during the interview.

Do not invent candidate answers.

Return ONLY valid JSON.
"""


# EDGE TTS

async def generate_tts(text):
    """
    Generate speech using Microsoft Edge TTS
    and return the audio as base64.
    """

    temp_audio = tempfile.NamedTemporaryFile(delete=False, suffix=".mp3")
    temp_audio_path = temp_audio.name
    temp_audio.close()

    try:
        communicate = edge_tts.Communicate(text=text, voice="en-GB-SoniaNeural")
        await communicate.save(temp_audio_path)

        with open(temp_audio_path, "rb") as audio_file:
            audio_bytes = audio_file.read()

        return base64.b64encode(audio_bytes).decode("utf-8")

    finally:
        if os.path.exists(temp_audio_path):
            os.remove(temp_audio_path)


def text_to_speech(text):
    """Synchronous wrapper around Edge TTS."""
    return asyncio.run(generate_tts(text))


# SPEECH TO TEXT

def speech_to_text(audio_path):
    """Convert candidate audio into text using Groq Whisper."""
    with open(audio_path, "rb") as audio_file:
        transcription = client.audio.transcriptions.create(
            model="whisper-large-v3-turbo",
            file=audio_file,
            response_format="verbose_json",
            language="en"
        )
    return transcription.text


def parse_interview_id(raw_value):
    """Best-effort int parse; returns None if invalid/missing."""
    try:
        return int(raw_value)
    except (TypeError, ValueError):
        return None


@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "message": "AI Mock Interview API is running",
        "endpoints": [
            "/health",
            "/start-interview",
            "/submit-answer",
            "/get-feedback",
            "/interviews",
            "/interviews/<id>"
        ]
    })


# HEALTH CHECK

@app.route("/health", methods=["GET"])
def health():
    return jsonify({"success": True, "status": "ok", "service": "AI Mock Interview"})


# START INTERVIEW

@app.route("/start-interview", methods=["POST"])
def start_interview():
    try:
        data = request.get_json() or {}
        subject = (data.get("subject") or "Python").strip() or "Python"

        # Create a new DB row - its id becomes this interview's thread_id
        interview_id = database.create_interview(subject)
        thread_id = str(interview_id)

        config = {"configurable": {"thread_id": thread_id}}

        formatted_prompt = INTERVIEW_PROMPT.format(subject=subject)

        response = agent.invoke(
            {
                "messages": [
                    {"role": "system", "content": formatted_prompt},
                    {
                        "role": "user",
                        "content": (
                            f"Start the interview with a warm greeting "
                            f"and ask the first question about {subject}. "
                            f"Keep it SHORT (1-2 sentences)."
                        )
                    }
                ]
            },
            config=config
        )

        question = response["messages"][-1].content

        database.add_question(interview_id, 1, question)

        print(f"\n[Interview {interview_id}] [Question 1] {question}")

        audio_base64 = text_to_speech(question)

        return jsonify({
            "success": True,
            "interview_completed": False,
            "interview_id": interview_id,
            "question_number": 1,
            "total_questions": TOTAL_QUESTIONS,
            "subject": subject,
            "question": question,
            "audio": audio_base64,
            "audio_format": "mp3"
        })

    except Exception as e:
        print(f"Error starting interview: {e}")
        return jsonify({"success": False, "error": str(e)}), 500


# SUBMIT ANSWER

@app.route("/submit-answer", methods=["POST"])
def submit_answer():
    try:
        interview_id = parse_interview_id(request.form.get("interview_id"))

        if interview_id is None:
            return jsonify({"success": False, "error": "Missing or invalid interview_id"}), 400

        interview = database.get_interview(interview_id)
        if not interview:
            return jsonify({"success": False, "error": "Interview not found"}), 404

        if "audio" not in request.files:
            return jsonify({"success": False, "error": "No audio file provided"}), 400

        audio_file = request.files["audio"]

        temp_file = tempfile.NamedTemporaryFile(delete=False, suffix=".webm")
        temp_path = temp_file.name
        temp_file.close()

        try:
            audio_file.save(temp_path)
            answer = speech_to_text(temp_path)
        finally:
            if os.path.exists(temp_path):
                os.remove(temp_path)

        if not answer:
            answer = "Empty Text received"

        current_question_number = database.get_question_count(interview_id)
        database.save_answer(interview_id, current_question_number, answer)

        print(f"\n[Interview {interview_id}] [Answer {current_question_number}] {answer}")

        thread_id = str(interview_id)
        config = {"configurable": {"thread_id": thread_id}}

        # Feed the answer into the running conversation
        agent.invoke(
            {"messages": [{"role": "user", "content": answer}]},
            config=config
        )

        if current_question_number >= TOTAL_QUESTIONS:
            database.mark_completed(interview_id)
            return jsonify({
                "success": True,
                "interview_completed": True,
                "interview_id": interview_id,
                "question_number": current_question_number,
                "total_questions": TOTAL_QUESTIONS,
                "answer": answer,
                "message": "Interview completed. Request feedback."
            })

        next_question_number = current_question_number + 1

        prompt = f"""
The candidate just answered question {current_question_number}.

Look at their ACTUAL answer above.

Do NOT assume or make up what they said.

Now ask question {next_question_number} of {TOTAL_QUESTIONS}.

Requirements:

1. Briefly acknowledge what they ACTUALLY said.
2. Ask your next question that builds on their REAL response.
3. If they said "I don't know" or gave a wrong answer,
   acknowledge that and ask something simpler.
4. Keep the TOTAL response under 3 sentences.
5. Keep the question short and conversational.

Only reference what they truly said.
"""

        response = agent.invoke(
            {"messages": [{"role": "user", "content": prompt}]},
            config=config
        )

        question = response["messages"][-1].content

        database.add_question(interview_id, next_question_number, question)

        print(f"\n[Interview {interview_id}] [Question {next_question_number}] {question}")

        audio_base64 = text_to_speech(question)

        return jsonify({
            "success": True,
            "interview_completed": False,
            "interview_id": interview_id,
            "question_number": next_question_number,
            "total_questions": TOTAL_QUESTIONS,
            "answer": answer,
            "question": question,
            "audio": audio_base64,
            "audio_format": "mp3"
        })

    except Exception as e:
        print(f"Error submitting answer: {e}")
        return jsonify({"success": False, "error": str(e)}), 500


# GET FEEDBACK

@app.route("/get-feedback", methods=["POST"])
def get_feedback():
    try:
        data = request.get_json() or {}
        interview_id = parse_interview_id(data.get("interview_id"))

        if interview_id is None:
            return jsonify({"success": False, "error": "Missing or invalid interview_id"}), 400

        interview = database.get_interview(interview_id)
        if not interview:
            return jsonify({"success": False, "error": "Interview not found"}), 404

        thread_id = str(interview_id)
        config = {"configurable": {"thread_id": thread_id}}

        response = agent.invoke(
            {
                "messages": [
                    {
                        "role": "user",
                        "content": (
                            f"{FEEDBACK_PROMPT}\n\n"
                            f"Review our complete {interview['subject']} "
                            f"interview conversation and provide detailed feedback."
                        )
                    }
                ]
            },
            config=config
        )

        text = response["messages"][-1].content

        print(f"\n[Interview {interview_id}] [Feedback Generated]\n{text}\n")

        cleaned = text.strip()

        if "```" in cleaned:
            parts = cleaned.split("```")
            if len(parts) >= 2:
                cleaned = parts[1].replace("json", "", 1).strip()

        try:
            feedback = json.loads(cleaned)
        except json.JSONDecodeError:
            return jsonify({
                "success": False,
                "error": "AI returned invalid JSON",
                "raw_feedback": text
            }), 500

        database.save_feedback(
            interview_id,
            feedback.get("candidate_score"),
            feedback.get("feedback"),
            feedback.get("areas_of_improvement")
        )

        return jsonify({
            "success": True,
            "interview_id": interview_id,
            "feedback": feedback
        })

    except Exception as e:
        print(f"Error generating feedback: {e}")
        return jsonify({"success": False, "error": str(e)}), 500


# LIST PAST INTERVIEWS

@app.route("/interviews", methods=["GET"])
def list_interviews():
    try:
        return jsonify({"success": True, "interviews": database.get_all_interviews()})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500


# GET A SINGLE INTERVIEW (questions, answers, feedback)

@app.route("/interviews/<int:interview_id>", methods=["GET"])
def get_interview_detail(interview_id):
    try:
        interview = database.get_interview(interview_id)
        if not interview:
            return jsonify({"success": False, "error": "Interview not found"}), 404
        return jsonify({"success": True, "interview": interview})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500


# RUN SERVER

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
