from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.routers import (
    auth_router, users_router, emotions_router, voice_router,
    facial_router, fusion_router, moods_router, journals_router,
    assistant_router, stress_router, activities_router,
    professionals_router, appointments_router, community_router,
    notifications_router, goals_router, admin_router
)
from app.database.base import Base
from app.database.session import engine
from app.models import models

app = FastAPI(
    title="ManoShakti – Empowering Youth Mental Strength API",
    description=(
        "Production-ready backend API for ManoShakti mental wellness platform. "
        "Provides multimodal emotion detection pipelines (text, voice acoustic, facial landmarks), "
        "multimodal late fusion engine, Mano AI Gemini companion, student academic stress tools, "
        "and certified counselor directory."
    ),
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)


@app.on_event("startup")
def create_database_tables():
    Base.metadata.create_all(
        bind=engine,
        tables=[
            models.User.__table__,
            models.LoginLog.__table__
        ]
    )
    print("Users and login_logs tables checked/created successfully!")
# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include all API Routers
api_prefix = "/api"
app.include_router(auth_router, prefix=api_prefix)
app.include_router(users_router, prefix=api_prefix)
app.include_router(emotions_router, prefix=api_prefix)
app.include_router(voice_router, prefix=api_prefix)
app.include_router(facial_router, prefix=api_prefix)
app.include_router(fusion_router, prefix=api_prefix)
app.include_router(moods_router, prefix=api_prefix)
app.include_router(journals_router, prefix=api_prefix)
app.include_router(assistant_router, prefix=api_prefix)
app.include_router(stress_router, prefix=api_prefix)
app.include_router(activities_router, prefix=api_prefix)
app.include_router(professionals_router, prefix=api_prefix)
app.include_router(appointments_router, prefix=api_prefix)
app.include_router(community_router, prefix=api_prefix)
app.include_router(notifications_router, prefix=api_prefix)
app.include_router(goals_router, prefix=api_prefix)
app.include_router(admin_router, prefix=api_prefix)

@app.get("/")
def root():
    return {
        "platform": "ManoShakti – Empowering Youth Mental Strength",
        "tagline": "Understand Your Emotions. Strengthen Your Mind.",
        "status": "online",
        "documentation": "/docs"
    }

@app.get("/health")
def health_check():
    return {"status": "healthy", "service": "manoshakti-fastapi-backend"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
