from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Dict, Any, Optional
import uuid
from datetime import datetime, date, time
from datetime import datetime, timezone
from app.core.security import (
    create_access_token,
    get_current_user_payload,
    get_password_hash,
    verify_password
)
from app.database.session import get_db

from app.models.models import (
    User, LoginLog, MoodEntry, JournalEntry,
    EmotionAnalysis, VoiceAnalysis, FacialAnalysis,
    MultimodalFusionResult, WellnessActivity,
    Professional, Appointment, CommunityPost
)
from app.schemas.schemas import (
    UserRegister, UserLogin, UserResponse, UserUpdate, TokenResponse,
    TextEmotionRequest, TextEmotionResponse,
    VoiceAnalysisRequest, VoiceAnalysisResponse,
    FacialAnalysisRequest, FacialAnalysisResponse,
    MultimodalFusionRequest, MultimodalFusionResponse,
    MoodEntryCreate, JournalEntryCreate,
    ChatMessageRequest, ChatMessageResponse,
    AppointmentCreate, CommunityPostCreate
)
from app.ml.text_emotion import text_emotion_analyzer
from app.ml.voice_emotion import voice_emotion_analyzer
from app.ml.facial_emotion import facial_expression_analyzer
from app.ml.fusion_engine import multimodal_fusion_engine
from app.services.gemini_service import gemini_assistant_service

# 1. AUTHENTICATION ROUTER
auth_router = APIRouter(prefix="/auth", tags=["Authentication"])


def create_user_session(user: User, db: Session):
    session_id = str(uuid.uuid4())

    token = create_access_token({
        "sub": str(user.id),
        "email": user.email,
        "jti": session_id
    })

    login_record = LoginLog(
        user_id=user.id,
        session_token_id=session_id
    )

    db.add(login_record)
    db.commit()

    return token


@auth_router.post("/register", response_model=TokenResponse)
def register(req: UserRegister, db: Session = Depends(get_db)):

    email = req.email.lower().strip()

    existing = db.query(User).filter(User.email == email).first()

    if existing:
        raise HTTPException(
            status_code=400,
            detail="An account with this email already exists."
        )

    new_user = User(
        id=uuid.uuid4(),
        full_name=req.full_name.strip(),
        email=email,
        contact_number=req.contact_number.strip(),
        password_hash=get_password_hash(req.password)
    )

    db.add(new_user)

    try:
        db.commit()
        db.refresh(new_user)

        token = create_user_session(new_user, db)

    except Exception:
        db.rollback()
        raise

    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": str(new_user.id),
            "full_name": new_user.full_name,
            "email": new_user.email,
            "contact_number": new_user.contact_number,
            "created_at": new_user.created_at.isoformat()
                if new_user.created_at else None
        }
    }


@auth_router.post("/login", response_model=TokenResponse)
def login(req: UserLogin, db: Session = Depends(get_db)):

    email = req.email.lower().strip()

    user = db.query(User).filter(User.email == email).first()

    if not user or not verify_password(
        req.password, user.password_hash
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password."
        )

    token = create_user_session(user, db)

    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": str(user.id),
            "full_name": user.full_name,
            "email": user.email,
            "contact_number": user.contact_number,
            "created_at": user.created_at.isoformat()
                if user.created_at else None
        }
    }


@auth_router.post("/logout")
def logout(
    payload: dict = Depends(get_current_user_payload),
    db: Session = Depends(get_db)
):

    session_id = payload.get("jti")
    user_id = payload.get("sub")

    login_record = db.query(LoginLog).filter(
        LoginLog.session_token_id == session_id,
        LoginLog.user_id == user_id,
        LoginLog.logout_at.is_(None)
    ).first()

    if not login_record:
        raise HTTPException(
            status_code=404,
            detail="Active login session not found."
        )

    login_record.logout_at = datetime.now(timezone.utc)
    db.commit()

    return {"message": "Logged out successfully."}

# 2. USERS ROUTER (Strictly Own Account Access)
users_router = APIRouter(prefix="/users", tags=["Users"])

@users_router.get("/me", response_model=UserResponse)
def get_current_user(payload: dict = Depends(get_current_user_payload), db: Session = Depends(get_db)):
    user_id = payload.get("sub")
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User account not found.")
    return user

@users_router.put("/me", response_model=UserResponse)
def update_current_user(req: UserUpdate, payload: dict = Depends(get_current_user_payload), db: Session = Depends(get_db)):
    user_id = payload.get("sub")
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User account not found.")

    if req.full_name is not None:
        user.full_name = req.full_name.strip()
    if req.contact_number is not None:
        user.contact_number = req.contact_number.strip()

    db.commit()
    db.refresh(user)
    return user

@users_router.delete("/me")
def delete_current_user(payload: dict = Depends(get_current_user_payload), db: Session = Depends(get_db)):
    user_id = payload.get("sub")
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User account not found.")

    db.delete(user)
    db.commit()
    return {"message": "Account and all associated wellness records permanently deleted."}

# 3. EMOTION ANALYSIS (TEXT)
emotions_router = APIRouter(prefix="/emotions", tags=["Text Emotion Analysis"])

@emotions_router.post("/analyze-text", response_model=TextEmotionResponse)
def analyze_text(req: TextEmotionRequest, payload: dict = Depends(get_current_user_payload), db: Session = Depends(get_db)):
    user_id = payload.get("sub")
    dominant, confidence, scores, reflection_prompt = text_emotion_analyzer.analyze(req.text)

    record = EmotionAnalysis(
        user_id=uuid.UUID(user_id) if user_id else uuid.uuid4(),
        input_text=req.text,
        detected_emotion=dominant,
        confidence=confidence,
        emotion_scores=scores,
        model_version="GoEmotions-DistilBERT-v1.4"
    )
    db.add(record)
    db.commit()
    db.refresh(record)

    return {
        "id": record.id,
        "input_text": req.text,
        "detected_emotion": dominant,
        "confidence": confidence,
        "emotion_scores": scores,
        "reflection_prompt": reflection_prompt,
        "model_version": record.model_version
    }

# 4. VOICE ACOUSTIC ANALYSIS
voice_router = APIRouter(prefix="/voice", tags=["Voice Emotion Analysis"])

@voice_router.post("/analyze-acoustic", response_model=VoiceAnalysisResponse)
def analyze_voice(req: VoiceAnalysisRequest, payload: dict = Depends(get_current_user_payload), db: Session = Depends(get_db)):
    user_id = payload.get("sub")
    predicted, confidence, features = voice_emotion_analyzer.analyze_features(
        duration_seconds=req.duration_seconds,
        pitch_mean_hz=req.pitch_mean_hz,
        pitch_variability=req.pitch_variability,
        vocal_energy=req.vocal_energy,
        speech_rate_wpm=req.speech_rate_wpm,
        pause_frequency=req.pause_frequency
    )

    record = VoiceAnalysis(
        user_id=uuid.UUID(user_id) if user_id else uuid.uuid4(),
        duration_seconds=req.duration_seconds,
        pitch_mean_hz=req.pitch_mean_hz,
        pitch_variability=req.pitch_variability,
        vocal_energy=req.vocal_energy,
        speech_rate_wpm=req.speech_rate_wpm,
        pause_frequency=req.pause_frequency,
        acoustic_features=features,
        predicted_state=predicted,
        confidence=confidence
    )
    db.add(record)
    db.commit()
    db.refresh(record)

    return {
        "id": record.id,
        "duration_seconds": req.duration_seconds,
        "pitch_mean_hz": req.pitch_mean_hz,
        "vocal_energy": req.vocal_energy,
        "speech_rate_wpm": req.speech_rate_wpm,
        "pause_frequency": req.pause_frequency,
        "predicted_state": predicted,
        "confidence": confidence,
        "model_version": "Acoustic-Wav2Vec-LSTM-v2.1",
        "limitations_notice": voice_emotion_analyzer.LIMITATIONS_NOTICE
    }

# 5. FACIAL LANDMARK ANALYSIS
facial_router = APIRouter(prefix="/facial", tags=["Facial Landmark Analysis"])

@facial_router.post("/analyze-landmarks", response_model=FacialAnalysisResponse)
def analyze_facial(req: FacialAnalysisRequest, payload: dict = Depends(get_current_user_payload), db: Session = Depends(get_db)):
    user_id = payload.get("sub")
    predicted, confidence, uncertainty, patterns = facial_expression_analyzer.analyze_patterns(
        smiling=req.smiling,
        brow_furrow=req.brow_furrow,
        raised_eyebrows=req.raised_eyebrows,
        eye_squint=req.eye_squint,
        jaw_clench=req.jaw_clench
    )

    record = FacialAnalysis(
        user_id=uuid.UUID(user_id) if user_id else uuid.uuid4(),
        visible_patterns=patterns,
        predicted_expression=predicted,
        confidence=confidence,
        uncertainty_level=uncertainty
    )
    db.add(record)
    db.commit()
    db.refresh(record)

    return {
        "id": record.id,
        "visible_patterns": patterns,
        "predicted_expression": predicted,
        "confidence": confidence,
        "uncertainty_level": uncertainty,
        "ethical_disclaimer": facial_expression_analyzer.ETHICAL_DISCLAIMER
    }

# 6. MULTIMODAL FUSION
fusion_router = APIRouter(prefix="/fusion", tags=["Multimodal Fusion Engine"])

@fusion_router.post("/fuse", response_model=MultimodalFusionResponse)
def fuse_modalities(req: MultimodalFusionRequest, payload: dict = Depends(get_current_user_payload), db: Session = Depends(get_db)):
    user_id = payload.get("sub")
    result = multimodal_fusion_engine.fuse(
        text_emotion=req.text_emotion,
        voice_state=req.voice_state,
        facial_expression=req.facial_expression,
        reported_mood_score=req.reported_mood_score
    )

    record = MultimodalFusionResult(
        user_id=uuid.UUID(user_id) if user_id else uuid.uuid4(),
        fused_state=result["fused_state"],
        overall_confidence=result["overall_confidence"],
        modality_weights=result["modality_weights"],
        inconsistency_detected=result["inconsistency_detected"],
        inconsistency_note=result["inconsistency_note"],
        gentle_reflection_prompt=result["gentle_reflection_prompt"]
    )
    db.add(record)
    db.commit()
    db.refresh(record)

    return {
        "id": record.id,
        **result
    }

# 7. MOODS ROUTER
moods_router = APIRouter(prefix="/moods", tags=["Mood Tracking"])

@moods_router.post("/")
def create_mood(req: MoodEntryCreate, payload: dict = Depends(get_current_user_payload), db: Session = Depends(get_db)):
    user_id = payload.get("sub")
    entry = MoodEntry(
        user_id=uuid.UUID(user_id),
        mood_score=req.mood_score,
        primary_emotion=req.primary_emotion,
        secondary_emotions=req.secondary_emotions,
        energy_level=req.energy_level,
        sleep_hours=req.sleep_hours,
        notes=req.notes,
        triggers=req.triggers
    )
    db.add(entry)
    db.commit()
    return {"message": "Mood logged successfully", "id": str(entry.id)}

@moods_router.get("/history")
def get_mood_history(payload: dict = Depends(get_current_user_payload), db: Session = Depends(get_db)):
    user_id = payload.get("sub")
    entries = db.query(MoodEntry).filter(MoodEntry.user_id == user_id).order_by(MoodEntry.created_at.desc()).limit(30).all()
    return [
        {
            "id": str(e.id),
            "mood_score": e.mood_score,
            "primary_emotion": e.primary_emotion,
            "energy_level": e.energy_level,
            "sleep_hours": float(e.sleep_hours) if e.sleep_hours else 7.0,
            "notes": e.notes,
            "logged_date": str(e.logged_date),
            "created_at": str(e.created_at)
        }
        for e in entries
    ]

# 8. JOURNALS ROUTER
journals_router = APIRouter(prefix="/journals", tags=["Emotional Journaling"])

@journals_router.post("/")
def create_journal(req: JournalEntryCreate, payload: dict = Depends(get_current_user_payload), db: Session = Depends(get_db)):
    user_id = payload.get("sub")
    entry = JournalEntry(
        user_id=uuid.UUID(user_id),
        title=req.title,
        content=req.content,
        is_encrypted=req.is_encrypted,
        prompt_used=req.prompt_used,
        tags=req.tags
    )
    db.add(entry)
    db.commit()
    return {"message": "Journal saved", "id": str(entry.id)}

@journals_router.get("/")
def get_journals(payload: dict = Depends(get_current_user_payload), db: Session = Depends(get_db)):
    user_id = payload.get("sub")
    entries = db.query(JournalEntry).filter(JournalEntry.user_id == user_id).order_by(JournalEntry.created_at.desc()).all()
    return [
        {
            "id": str(e.id),
            "title": e.title,
            "content": e.content,
            "prompt_used": e.prompt_used,
            "tags": e.tags or [],
            "created_at": str(e.created_at)
        }
        for e in entries
    ]

# 9. ASSISTANT ROUTER (MANO AI GEMINI)
assistant_router = APIRouter(prefix="/assistant", tags=["Mano AI Assistant"])

@assistant_router.post("/chat", response_model=ChatMessageResponse)
def chat_with_assistant(req: ChatMessageRequest):
    conv_id = req.conversation_id or uuid.uuid4()
    result = gemini_assistant_service.generate_reflection(req.message)

    return {
        "conversation_id": conv_id,
        "message": result["message"],
        "suggested_activities": result.get("suggested_activities", []),
        "crisis_flag": result["crisis_flag"]
    }

# 10. ACTIVITIES ROUTER
activities_router = APIRouter(prefix="/activities", tags=["Wellness Activities"])

@activities_router.get("/")
def list_activities(db: Session = Depends(get_db)):
    return db.query(WellnessActivity).filter(WellnessActivity.is_active == True).all()

# 11. PROFESSIONALS ROUTER
professionals_router = APIRouter(prefix="/professionals", tags=["Professional Support Directory"])

@professionals_router.get("/")
def get_professionals(city: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(Professional)
    if city:
        query = query.filter(Professional.city.ilike(f"%{city}%"))
    return query.all()

# 12. APPOINTMENTS ROUTER
appointments_router = APIRouter(prefix="/appointments", tags=["Appointment Booking"])

@appointments_router.post("/")
def book_appointment(req: AppointmentCreate, payload: dict = Depends(get_current_user_payload), db: Session = Depends(get_db)):
    user_id = payload.get("sub")
    appt = Appointment(
        user_id=uuid.UUID(user_id),
        professional_id=req.professional_id,
        appointment_date=req.appointment_date,
        start_time=req.start_time,
        end_time=req.end_time,
        consultation_mode=req.consultation_mode,
        meeting_link="https://meet.manoshakti.org/room/" + str(uuid.uuid4())[:8],
        status="confirmed",
        client_notes=req.client_notes
    )
    db.add(appt)
    db.commit()
    return {"message": "Appointment confirmed", "appointment_id": str(appt.id), "meeting_link": appt.meeting_link}

@appointments_router.get("/my")
def get_my_appointments(payload: dict = Depends(get_current_user_payload), db: Session = Depends(get_db)):
    user_id = payload.get("sub")
    return db.query(Appointment).filter(Appointment.user_id == user_id).order_by(Appointment.appointment_date.asc()).all()

# 13. COMMUNITY ROUTER
community_router = APIRouter(prefix="/community", tags=["Community Support"])

@community_router.get("/posts")
def get_posts(category: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(CommunityPost).filter(CommunityPost.is_moderated == True)
    if category and category != "all":
        query = query.filter(CommunityPost.category == category)
    return query.order_by(CommunityPost.created_at.desc()).limit(50).all()

@community_router.post("/posts")
def create_post(req: CommunityPostCreate, payload: dict = Depends(get_current_user_payload), db: Session = Depends(get_db)):
    user_id = payload.get("sub")
    post = CommunityPost(
        user_id=uuid.UUID(user_id),
        author_alias=req.author_alias,
        is_anonymous=req.is_anonymous,
        category=req.category,
        title=req.title,
        content=req.content,
        is_moderated=True
    )
    db.add(post)
    db.commit()
    return {"message": "Post shared with peer community", "post_id": str(post.id)}

# 14. STRESS MANAGEMENT ROUTER
stress_router = APIRouter(
    prefix="/stress",
    tags=["Stress Management"]
)

# 15. NOTIFICATIONS ROUTER
notifications_router = APIRouter(
    prefix="/notifications",
    tags=["Notifications"]
)

# 16. GOALS ROUTER
goals_router = APIRouter(
    prefix="/goals",
    tags=["User Goals"]
)

# 17. ADMIN ROUTER
admin_router = APIRouter(
    prefix="/admin",
    tags=["Administration"]
)