import uuid
from datetime import datetime, date
from sqlalchemy import (
    Column, String, Boolean, Integer, Numeric, Text, ForeignKey,
    DateTime, Date, Time, func
)
from sqlalchemy.dialects.postgresql import UUID, JSONB, ARRAY
from sqlalchemy.orm import relationship
from app.database.base import Base

class User(Base):
    """
    Stores essential user account details.
    """
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    full_name = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, nullable=False, index=True)
    contact_number = Column(String(50), nullable=False)
    password_hash = Column(String(255), nullable=False)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(
        DateTime(timezone=True),
        onupdate=func.now(),
        server_default=func.now()
    )

    # Relationships
    mood_entries = relationship("MoodEntry", back_populates="user")
    journal_entries = relationship("JournalEntry", back_populates="user")
    appointments = relationship("Appointment", back_populates="user")

class MoodEntry(Base):
    __tablename__ = "mood_entries"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    mood_score = Column(Integer, nullable=False) # 1 to 10
    primary_emotion = Column(String(100), nullable=False)
    secondary_emotions = Column(ARRAY(String), nullable=True)
    energy_level = Column(Integer, nullable=True) # 1 to 10
    sleep_hours = Column(Numeric(4, 1), nullable=True)
    notes = Column(Text, nullable=True)
    triggers = Column(ARRAY(String), nullable=True)
    logged_date = Column(Date, default=date.today)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="mood_entries")

class JournalEntry(Base):
    __tablename__ = "journal_entries"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    title = Column(String(255), nullable=False)
    content = Column(Text, nullable=False)
    is_encrypted = Column(Boolean, default=True)
    prompt_used = Column(String(255), nullable=True)
    tags = Column(ARRAY(String), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now(), server_default=func.now())

    user = relationship("User", back_populates="journal_entries")

class EmotionAnalysis(Base):
    __tablename__ = "emotion_analyses"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    input_text = Column(Text, nullable=False)
    detected_emotion = Column(String(100), nullable=False)
    confidence = Column(Numeric(5, 4), nullable=False)
    emotion_scores = Column(JSONB, nullable=False)
    model_version = Column(String(100), default="GoEmotions-DistilBERT-v1.4")
    user_correction = Column(String(100), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class VoiceAnalysis(Base):
    __tablename__ = "voice_analyses"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    duration_seconds = Column(Numeric(6, 2), nullable=False)
    pitch_mean_hz = Column(Numeric(8, 2), nullable=True)
    pitch_variability = Column(Numeric(8, 2), nullable=True)
    vocal_energy = Column(Numeric(8, 4), nullable=True)
    speech_rate_wpm = Column(Integer, nullable=True)
    pause_frequency = Column(Numeric(5, 2), nullable=True)
    acoustic_features = Column(JSONB, nullable=True)
    predicted_state = Column(String(100), nullable=False)
    confidence = Column(Numeric(5, 4), nullable=False)
    model_version = Column(String(100), default="Acoustic-Wav2Vec-LSTM-v2.1")
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class FacialAnalysis(Base):
    __tablename__ = "facial_analyses"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    visible_patterns = Column(JSONB, nullable=False)
    predicted_expression = Column(String(100), nullable=False)
    confidence = Column(Numeric(5, 4), nullable=False)
    uncertainty_level = Column(Numeric(5, 4), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class MultimodalFusionResult(Base):
    __tablename__ = "multimodal_fusion_results"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    fused_state = Column(String(100), nullable=False)
    overall_confidence = Column(Numeric(5, 4), nullable=False)
    modality_weights = Column(JSONB, nullable=False)
    inconsistency_detected = Column(Boolean, default=False)
    inconsistency_note = Column(Text, nullable=True)
    gentle_reflection_prompt = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class WellnessActivity(Base):
    __tablename__ = "wellness_activities"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title = Column(String(255), nullable=False)
    category = Column(String(100), nullable=False)
    duration_minutes = Column(Integer, nullable=False)
    instructions = Column(Text, nullable=False)
    difficulty = Column(String(50), default="beginner")
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class Professional(Base):
    __tablename__ = "professionals"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    full_name = Column(String(255), nullable=False)
    title = Column(String(100), nullable=False)
    registration_number = Column(String(100), nullable=False)
    registration_board = Column(String(255), nullable=False)
    specializations = Column(ARRAY(String), nullable=False)
    experience_years = Column(Integer, nullable=False)
    clinic_or_hospital = Column(String(255), nullable=False)
    city = Column(String(100), nullable=False)
    state = Column(String(100), nullable=True)
    languages = Column(ARRAY(String), nullable=False)
    consultation_modes = Column(ARRAY(String), nullable=False)
    consultation_fee = Column(Numeric(10, 2), default=0.0)
    bio = Column(Text, nullable=False)
    is_verified = Column(Boolean, default=False)
    is_demo = Column(Boolean, default=True)
    rating = Column(Numeric(3, 2), default=4.9)
    review_count = Column(Integer, default=24)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class Appointment(Base):
    __tablename__ = "appointments"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    professional_id = Column(UUID(as_uuid=True), ForeignKey("professionals.id", ondelete="CASCADE"), nullable=False)
    appointment_date = Column(Date, nullable=False)
    start_time = Column(Time, nullable=False)
    end_time = Column(Time, nullable=False)
    consultation_mode = Column(String(50), default="online")
    meeting_link = Column(Text, nullable=True)
    status = Column(String(50), default="confirmed")
    client_notes = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="appointments")
    professional = relationship("Professional")

class CommunityPost(Base):
    __tablename__ = "community_posts"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    author_alias = Column(String(100), nullable=False)
    is_anonymous = Column(Boolean, default=True)
    category = Column(String(100), nullable=False)
    title = Column(String(255), nullable=False)
    content = Column(Text, nullable=False)
    hearts_count = Column(Integer, default=0)
    is_moderated = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class LoginLog(Base):
    __tablename__ = "login_logs"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)

    user_id = Column(
        UUID(as_uuid=True),
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
        index=True
    )

    session_token_id = Column(String(255), unique=True, nullable=False)
    login_at = Column(DateTime(timezone=True), server_default=func.now())
    logout_at = Column(DateTime(timezone=True), nullable=True)