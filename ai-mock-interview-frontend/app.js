// ---------- config ----------
// Point this at wherever your Flask backend is running.
const API_BASE_URL = "http://localhost:5000";
const TOTAL_QUESTIONS = 5;

// ---------- state ----------
let interviewId = null;
let currentSubject = "";
let mediaRecorder = null;
let recordedChunks = [];
let isRecording = false;

// ---------- element refs ----------
const screens = {
  subject: document.getElementById("screen-subject"),
  interview: document.getElementById("screen-interview"),
  feedback: document.getElementById("screen-feedback"),
  history: document.getElementById("screen-history"),
};

const subjectForm = document.getElementById("subject-form");
const subjectInput = document.getElementById("subject-input");
const subjectError = document.getElementById("subject-error");

const progressDotsEl = document.getElementById("progress-dots");
const interviewSubjectLabel = document.getElementById("interview-subject-label");
const questionText = document.getElementById("question-text");
const qStatusLabel = document.getElementById("q-status-label");
const recordBtn = document.getElementById("record-btn");
const micCaption = document.getElementById("mic-caption");
const waveform = document.getElementById("waveform");
const questionAudio = document.getElementById("question-audio");

const scoreValue = document.getElementById("score-value");
const feedbackSubjectLabel = document.getElementById("feedback-subject-label");
const feedbackStrengths = document.getElementById("feedback-strengths");
const feedbackImprovements = document.getElementById("feedback-improvements");
const restartBtn = document.getElementById("restart-btn");

const historyToggle = document.getElementById("history-toggle");
const historyBack = document.getElementById("history-back");
const historyList = document.getElementById("history-list");

// ---------- helpers ----------
function showScreen(name) {
  Object.values(screens).forEach((el) => (el.hidden = true));
  screens[name].hidden = false;
}

function renderProgress(current) {
  progressDotsEl.innerHTML = "";
  for (let i = 1; i <= TOTAL_QUESTIONS; i++) {
    const dot = document.createElement("div");
    dot.className = "progress-dot";
    if (i < current) dot.classList.add("done");
    else if (i === current) dot.classList.add("active");
    progressDotsEl.appendChild(dot);
  }
}

function setMicState(state) {
  // state: "asking" | "ready" | "recording" | "submitting"
  recordBtn.classList.remove("ready", "recording");
  waveform.classList.remove("active");

  if (state === "asking") {
    recordBtn.disabled = true;
    micCaption.textContent = "Listening to the question…";
    qStatusLabel.textContent = "Natalie is asking";
  } else if (state === "ready") {
    recordBtn.disabled = false;
    recordBtn.classList.add("ready");
    micCaption.textContent = "Tap the mic to answer";
    qStatusLabel.textContent = "Your turn";
  } else if (state === "recording") {
    recordBtn.disabled = false;
    recordBtn.classList.add("recording");
    waveform.classList.add("active");
    micCaption.textContent = "Recording… tap to stop";
    qStatusLabel.textContent = "Your turn";
  } else if (state === "submitting") {
    recordBtn.disabled = true;
    micCaption.textContent = "Sending your answer…";
    qStatusLabel.textContent = "One moment";
  }
}

function playBase64Audio(base64, format) {
  return new Promise((resolve) => {
    questionAudio.src = `data:audio/${format};base64,${base64}`;
    questionAudio.onended = resolve;
    questionAudio.onerror = resolve;
    questionAudio.play().catch(resolve); // resolve anyway if autoplay is blocked
  });
}

function showError(message) {
  subjectError.textContent = message;
  subjectError.hidden = false;
}

// ---------- interview flow ----------
async function startInterview(subject) {
  const res = await fetch(`${API_BASE_URL}/start-interview`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ subject }),
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.error || "Could not start interview");
  return data;
}

async function submitAnswer(blob) {
  const formData = new FormData();
  formData.append("interview_id", interviewId);
  formData.append("audio", blob, "answer.webm");

  const res = await fetch(`${API_BASE_URL}/submit-answer`, {
    method: "POST",
    body: formData,
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.error || "Could not submit answer");
  return data;
}

async function fetchFeedback() {
  const res = await fetch(`${API_BASE_URL}/get-feedback`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ interview_id: interviewId }),
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.error || "Could not generate feedback");
  return data;
}

async function fetchHistory() {
  const res = await fetch(`${API_BASE_URL}/interviews`);
  const data = await res.json();
  return data.success ? data.interviews : [];
}

// ---------- recording ----------
async function ensureMicAccess() {
  if (mediaRecorder) return;
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  mediaRecorder = new MediaRecorder(stream);

  mediaRecorder.ondataavailable = (e) => {
    if (e.data.size > 0) recordedChunks.push(e.data);
  };

  mediaRecorder.onstop = async () => {
    const blob = new Blob(recordedChunks, { type: "audio/webm" });
    recordedChunks = [];
    setMicState("submitting");
    try {
      const result = await submitAnswer(blob);
      if (result.interview_completed) {
        await showFeedbackScreen();
      } else {
        renderProgress(result.question_number);
        questionText.textContent = result.question;
        setMicState("asking");
        await playBase64Audio(result.audio, result.audio_format || "mp3");
        setMicState("ready");
      }
    } catch (err) {
      micCaption.textContent = `Error: ${err.message}. Tap the mic to retry.`;
      setMicState("ready");
    }
  };
}

async function toggleRecording() {
  try {
    await ensureMicAccess();
  } catch (err) {
    micCaption.textContent = "Microphone access is required to answer.";
    return;
  }

  if (!isRecording) {
    recordedChunks = [];
    mediaRecorder.start();
    isRecording = true;
    setMicState("recording");
  } else {
    mediaRecorder.stop();
    isRecording = false;
  }
}

// ---------- screen transitions ----------
async function beginInterview(subject) {
  subjectError.hidden = true;
  currentSubject = subject;

  const data = await startInterview(subject);
  interviewId = data.interview_id;

  interviewSubjectLabel.textContent = data.subject;
  showScreen("interview");
  renderProgress(1);
  questionText.textContent = data.question;
  setMicState("asking");

  await playBase64Audio(data.audio, data.audio_format || "mp3");
  setMicState("ready");
}

async function showFeedbackScreen() {
  qStatusLabel.textContent = "Wrapping up";
  micCaption.textContent = "Generating your feedback…";
  const { feedback } = await fetchFeedback();

  scoreValue.textContent = feedback.candidate_score ?? "-";
  feedbackSubjectLabel.textContent = feedback.subject || currentSubject;
  feedbackStrengths.textContent = feedback.feedback || "";
  feedbackImprovements.textContent = feedback.areas_of_improvement || "";

  showScreen("feedback");
}

function resetToSubjectScreen() {
  interviewId = null;
  currentSubject = "";
  subjectInput.value = "";
  subjectError.hidden = true;
  showScreen("subject");
}

async function openHistory() {
  historyList.innerHTML = `<p class="history-empty">Loading…</p>`;
  showScreen("history");

  const interviews = await fetchHistory();
  if (!interviews.length) {
    historyList.innerHTML = `<p class="history-empty">No sessions yet.</p>`;
    return;
  }

  historyList.innerHTML = "";
  interviews.forEach((item) => {
    const row = document.createElement("div");
    row.className = "history-item";
    const date = new Date(item.created_at + "Z").toLocaleString();
    row.innerHTML = `
      <div>
        <div class="h-subject">${item.subject}</div>
        <div class="h-meta">${item.status} · ${date}</div>
      </div>
      <div class="h-score">${item.score != null ? item.score + "/5" : "—"}</div>
    `;
    historyList.appendChild(row);
  });
}

// ---------- event wiring ----------
subjectForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const subject = subjectInput.value.trim();
  if (!subject) return;

  const submitBtn = subjectForm.querySelector("button[type=submit]");
  submitBtn.disabled = true;
  try {
    await beginInterview(subject);
  } catch (err) {
    showError(err.message);
  } finally {
    submitBtn.disabled = false;
  }
});

recordBtn.addEventListener("click", toggleRecording);
restartBtn.addEventListener("click", resetToSubjectScreen);
historyToggle.addEventListener("click", openHistory);
historyBack.addEventListener("click", () => showScreen("subject"));