# ManoShakti – Architecture & ML Specifications

## 1. System Overview

ManoShakti is a full-stack youth mental strength and resilience platform built with:
- **Frontend**: React 19, TypeScript, Tailwind CSS v4, React Router, Recharts, Lucide Icons
- **Backend**: Python 3.11+, FastAPI, Pydantic v2, SQLAlchemy ORM, Alembic
- **Database**: PostgreSQL (Supabase compatible) with UUID primary keys, JSONB metadata, foreign keys, and indexes
- **AI/ML Engine**: Multimodal Emotion Detection (Text GoEmotions + Acoustic Voice + Facial Landmarks) + Google Gemini 3.8 Flash Assistant

---

## 2. Multimodal Emotion Engine

### A. Text Emotion Pipeline (Pipeline A)
- **Model**: GoEmotions taxonomy with DistilBERT-v1.4 embedding representations.
- **Classes (8)**: Happiness, Sadness, Anger, Fear, Anxiety, Frustration, Surprise, Neutral.
- **Output**: Calibrated confidence score, discrete emotion probability distribution, and customized compassionate reflection prompts.

### B. Voice Acoustic Pipeline (Pipeline B)
- **Features Extracted**:
  - Fundamental frequency ($f_0$ pitch mean in Hz)
  - Pitch variability (standard deviation across frames)
  - Vocal energy / Root Mean Square (RMS)
  - Speech rate in words-per-minute (WPM)
  - Hesitation and pause frequency
- **Output**: Autonomic physical arousal estimation (e.g. *Anxious/Agitated Cadence*, *Fatigued/Low Energy*, *Steady Baseline*).
- **Ethical Limitation**: Voice dynamics reflect somatic and physiological arousal, not psychiatric illness. Raw audio is processed ephemerally and never written to raw disk.

### C. Facial Landmark Pipeline (Pipeline C)
- **Landmarks Evaluated**:
  - Smiling curvature (Zygomaticus major activation)
  - Brow furrow index (Corrugator supercilii contraction)
  - Eyebrow lift (Frontalis muscle movement)
  - Eye squint aperture and jaw clench tension
- **Ethical AI Disclaimer**: Visible facial movements do **NOT** determine internal emotional reality. No biometric templates or video feeds are ever stored.

### D. Late Multimodal Fusion Engine
- **Epistemic Principle**: Self-reported voluntary text reflections hold primary epistemic priority.
- **Normalized Weights**:
  - Typed reflection text: $45\%$
  - Longitudinal mood check-in score: $25\%$
  - Vocal acoustic arousal: $15\%$
  - Facial landmark tension: $15\%$
- **Inconsistency / Discordance Handling**:
  - If a student types expressions of grief or academic panic while visible facial landmarks show a smile:
    The engine flags this as *Discordant Affect* and issues a caring reflection inquiry:
    *"Sometimes we smile out of habit or social politeness when carrying heavy thoughts. How is your heart truly feeling right now?"*
  - **Zero Accusations**: The system NEVER calls the user a liar, NEVER asserts clinical illness, and NEVER diagnoses pathology.

---

## 3. Mano AI – Google Gemini 3.8 Flash Assistant

- Server-side invocation via `server.ts` or FastAPI `services/gemini_service.py`
- Employs `gemini-3.8-flash` with system prompt guardrails:
  1. Never diagnose psychiatric conditions.
  2. Never prescribe or suggest pharmaceuticals.
  3. Never claim to replace accredited psychologists or counselors.
  4. Automatically activates crisis escalation protocols upon detecting suicidal signals.

---

## 4. Database Architecture (PostgreSQL)

Normalized schema encompassing 23 tables:
1. `users`
2. `user_profiles`
3. `user_consents`
4. `mood_entries`
5. `journal_entries`
6. `emotion_analyses`
7. `voice_analyses`
8. `facial_analyses`
9. `multimodal_fusion_results`
10. `stress_assessments`
11. `wellness_activities`
12. `user_activity_logs`
13. `user_goals`
14. `ai_conversations`
15. `ai_messages`
16. `professionals`
17. `professional_verifications`
18. `appointments`
19. `community_posts`
20. `community_comments`
21. `community_reports`
22. `trusted_contacts`
23. `notifications`
