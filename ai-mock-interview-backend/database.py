"""
database.py

Small SQLite persistence layer for the AI Mock Interview app.
Stores one row per interview, and one row per question/answer pair.
No ORM - just sqlite3 - so it's easy to read and easy to swap out later.
"""

import sqlite3
import os
from contextlib import contextmanager

DB_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "interviews.db")


@contextmanager
def get_connection():
    conn = sqlite3.connect(DB_PATH, check_same_thread=False)
    conn.row_factory = sqlite3.Row
    try:
        yield conn
        conn.commit()
    finally:
        conn.close()


def init_db():
    """Create tables if they don't exist yet. Call once at startup."""
    with get_connection() as conn:
        conn.execute("""
            CREATE TABLE IF NOT EXISTS interviews (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                subject TEXT NOT NULL,
                status TEXT NOT NULL DEFAULT 'in_progress',
                score INTEGER,
                feedback TEXT,
                areas_of_improvement TEXT,
                created_at TEXT NOT NULL DEFAULT (datetime('now'))
            )
        """)
        conn.execute("""
            CREATE TABLE IF NOT EXISTS questions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                interview_id INTEGER NOT NULL,
                question_number INTEGER NOT NULL,
                question TEXT NOT NULL,
                answer TEXT,
                created_at TEXT NOT NULL DEFAULT (datetime('now')),
                FOREIGN KEY (interview_id) REFERENCES interviews (id)
            )
        """)


# ---------- interviews ----------

def create_interview(subject: str) -> int:
    with get_connection() as conn:
        cur = conn.execute(
            "INSERT INTO interviews (subject, status) VALUES (?, ?)",
            (subject, "in_progress"),
        )
        return cur.lastrowid


def mark_completed(interview_id: int) -> None:
    with get_connection() as conn:
        conn.execute(
            "UPDATE interviews SET status = 'completed' WHERE id = ?",
            (interview_id,),
        )


def save_feedback(interview_id: int, score, feedback_text: str, areas_of_improvement: str) -> None:
    with get_connection() as conn:
        conn.execute(
            """UPDATE interviews
               SET score = ?, feedback = ?, areas_of_improvement = ?, status = 'feedback_ready'
               WHERE id = ?""",
            (score, feedback_text, areas_of_improvement, interview_id),
        )


def get_interview(interview_id: int):
    with get_connection() as conn:
        interview = conn.execute(
            "SELECT * FROM interviews WHERE id = ?", (interview_id,)
        ).fetchone()
        if not interview:
            return None
        questions = conn.execute(
            """SELECT question_number, question, answer FROM questions
               WHERE interview_id = ? ORDER BY question_number""",
            (interview_id,),
        ).fetchall()
        result = dict(interview)
        result["questions"] = [dict(q) for q in questions]
        return result


def get_all_interviews():
    with get_connection() as conn:
        rows = conn.execute(
            """SELECT id, subject, status, score, created_at
               FROM interviews ORDER BY id DESC"""
        ).fetchall()
        return [dict(r) for r in rows]


# ---------- questions ----------

def add_question(interview_id: int, question_number: int, question_text: str) -> None:
    with get_connection() as conn:
        conn.execute(
            "INSERT INTO questions (interview_id, question_number, question) VALUES (?, ?, ?)",
            (interview_id, question_number, question_text),
        )


def save_answer(interview_id: int, question_number: int, answer_text: str) -> None:
    with get_connection() as conn:
        conn.execute(
            "UPDATE questions SET answer = ? WHERE interview_id = ? AND question_number = ?",
            (answer_text, interview_id, question_number),
        )


def get_question_count(interview_id: int) -> int:
    with get_connection() as conn:
        row = conn.execute(
            "SELECT COUNT(*) as c FROM questions WHERE interview_id = ?",
            (interview_id,),
        ).fetchone()
        return row["c"] if row else 0