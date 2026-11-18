from pydantic import BaseModel, EmailStr, Field, field_validator
from typing import Optional, List, Dict, Any
from datetime import datetime, date, time
from uuid import UUID
import re

# User & Auth - Minimal 6-field User model specification
class UserRegister(BaseModel):
    full_name: str = Field(..., min_length=2, max_length=255)
    email: EmailStr
    contact_number: str = Field(..., min_length=7, max_length=20)
    password: str = Field(..., min_length=6)

    @field_validator('contact_number')
    @classmethod
    def validate_contact(cls, v: str) -> str:
        # Validate contact number format
        cleaned = re.sub(r'[\s\-\(\)]', '', v)
        if not re.match(r'^\+?[0-9]{7,15}$', cleaned):
            raise ValueError('Invalid contact number format. Must contain 7-15 digits with optional leading +.')
        return v

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: UUID
    full_name: str
    email: str
    contact_number: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class UserUpdate(BaseModel):
    full_name: Optional[str] = Field(None, min_length=2, max_length=255)
    contact_number: Optional[str] = None

    @field_validator('contact_number')
    @classmethod
    def validate_contact(cls, v: Optional[str]) -> Optional[str]:
        if v is None:
            return None
        cleaned = re.sub(r'[\s\-\(\)]', '', v)
        if not re.match(r'^\+?[0-9]{7,15}$', cleaned):
            raise ValueError('Invalid contact number format. Must contain 7-15 digits with optional leading +.')
        return v

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: Dict[str, Any]

# Emotion ML Schemas
class TextEmotionRequest(BaseModel):
    text: str = Field(..., min_length=2)

class TextEmotionResponse(BaseModel):
    id: Optional[UUID] = None
    input_text: str
    detected_emotion: str
    confidence: float
    emotion_scores: Dict[str, float]
    reflection_prompt: str
    model_version: str

class VoiceAnalysisRequest(BaseModel):
    duration_seconds: float
    pitch_mean_hz: float
    pitch_variability: float
    vocal_energy: float
    speech_rate_wpm: int
    pause_frequency: float
    sample_rate: int = 16000

class VoiceAnalysisResponse(BaseModel):
    id: Optional[UUID] = None
    duration_seconds: float
    pitch_mean_hz: float
    vocal_energy: float
    speech_rate_wpm: int
    pause_frequency: float
    predicted_state: str
    confidence: float
    model_version: str
    limitations_notice: str

class FacialAnalysisRequest(BaseModel):
    smiling: float = Field(..., ge=0.0, le=1.0)
    brow_furrow: float = Field(..., ge=0.0, le=1.0)
    raised_eyebrows: float = Field(..., ge=0.0, le=1.0)
    eye_squint: float = Field(..., ge=0.0, le=1.0)
    jaw_clench: float = Field(..., ge=0.0, le=1.0)

class FacialAnalysisResponse(BaseModel):
    id: Optional[UUID] = None
    visible_patterns: Dict[str, float]
    predicted_expression: str
    confidence: float
    uncertainty_level: float
    ethical_disclaimer: str

class MultimodalFusionRequest(BaseModel):
    text_emotion: Optional[Dict[str, Any]] = None
    voice_state: Optional[Dict[str, Any]] = None
    facial_expression: Optional[Dict[str, Any]] = None
    reported_mood_score: Optional[int] = Field(None, ge=1, le=10)

class MultimodalFusionResponse(BaseModel):
    id: Optional[UUID] = None
    fused_state: str
    overall_confidence: float
    modality_weights: Dict[str, float]
    inconsistency_detected: bool
    inconsistency_note: Optional[str] = None
    gentle_reflection_prompt: str
    actionable_recommendations: List[str]

# Mood & Journal
class MoodEntryCreate(BaseModel):
    mood_score: int = Field(..., ge=1, le=10)
    primary_emotion: str
    secondary_emotions: Optional[List[str]] = []
    energy_level: Optional[int] = Field(5, ge=1, le=10)
    sleep_hours: Optional[float] = 7.0
    notes: Optional[str] = None
    triggers: Optional[List[str]] = []

class JournalEntryCreate(BaseModel):
    title: str
    content: str
    is_encrypted: bool = True
    prompt_used: Optional[str] = None
    tags: Optional[List[str]] = []

# Assistant
class ChatMessageRequest(BaseModel):
    message: str
    conversation_id: Optional[UUID] = None

class ChatMessageResponse(BaseModel):
    conversation_id: UUID
    message: str
    suggested_activities: Optional[List[str]] = []
    crisis_flag: bool = False

# Appointment
class AppointmentCreate(BaseModel):
    professional_id: UUID
    appointment_date: date
    start_time: time
    end_time: time
    consultation_mode: str = "online"
    client_notes: Optional[str] = None

# Community
class CommunityPostCreate(BaseModel):
    title: str
    content: str
    category: str
    is_anonymous: bool = True
    author_alias: str
