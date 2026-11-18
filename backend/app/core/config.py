import os
from typing import List
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "ManoShakti – Empowering Youth Mental Strength"
    API_V1_STR: str = "/api"
    SECRET_KEY: str = os.getenv("SECRET_KEY", "manoshakti-secure-jwt-secret-key-change-in-production")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7 # 7 days
    
    # PostgreSQL / Supabase
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL",
        "postgresql://postgres:postgres@localhost:5432/manoshakti"
    )
    
    SUPABASE_URL: str = os.getenv("SUPABASE_URL", "https://your-project.supabase.co")
    SUPABASE_KEY: str = os.getenv("SUPABASE_KEY", "")
    SUPABASE_JWT_SECRET: str = os.getenv("SUPABASE_JWT_SECRET", "")
    
    # Google Gemini AI
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")
    
    # CORS
    CORS_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://localhost:5173",
        "https://ais-dev-7bbiyldilpcfjzxayjxx2y-733154554902.asia-southeast1.run.app",
        "*"
    ]
    
    class Config:
        env_file = ".env"
        extra = "allow"

settings = Settings()
