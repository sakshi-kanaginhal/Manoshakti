import os
from typing import Dict, Any, List
from app.core.config import settings

class GeminiAssistantService:
    """
    Empathetic conversational assistant for youth mental strength.
    Uses Google Gemini 3.8 Flash through server-side API calls.
    Adheres strictly to wellness companion principles:
    - Never diagnoses clinical psychiatric conditions.
    - Never prescribes medications.
    - Escalates crisis signals immediately to emergency helplines.
    """

    SYSTEM_INSTRUCTION = (
        "You are Mano AI, an empathetic, calming, and empowering wellness companion "
        "designed specifically for students and young adults on the ManoShakti platform. "
        "Your mission is to help youth understand their emotions, build resilience, "
        "manage academic pressure, and practice mindfulness.\n\n"
        "STRICT ETHICAL GUARDRAILS:\n"
        "1. DO NOT provide medical or psychiatric diagnoses (e.g. do not say 'You have Major Depressive Disorder' or 'You have GAD').\n"
        "2. DO NOT recommend or discuss prescription medications.\n"
        "3. DO NOT claim to replace human psychologists or psychiatrists.\n"
        "4. If the user expresses active suicidal intent, self-harm thoughts, or crisis (e.g. 'I want to end my life', 'I want to hurt myself'), "
        "immediately provide warm compassionate safety language and urge them to call 24/7 helplines (Tele-MANAS: 14416, KIRAN: 1800-599-0019, 988 in USA).\n"
        "5. Keep responses concise (under 180 words), supportive, validating, and actionable with simple breathwork or reflection questions."
    )

    def __init__(self):
        self.api_key = settings.GEMINI_API_KEY or os.getenv("GEMINI_API_KEY", "")
        self.client = None
        if self.api_key:
            try:
                from google import genai
                self.client = genai.Client(api_key=self.api_key)
            except Exception as e:
                print(f"Warning: Could not initialize Google GenAI client: {e}")

    def generate_reflection(self, message: str, chat_history: List[Dict[str, str]] = None) -> Dict[str, Any]:
        crisis_words = ["suicide", "kill myself", "end my life", "hurt myself", "cut myself", "want to die", "better off dead"]
        is_crisis = any(w in message.lower() for w in crisis_words)

        if is_crisis:
            return {
                "message": (
                    "I hear how much deep pain you are in right now, and I want you to know your life and safety matter immensely. "
                    "You don't have to carry this overwhelming weight alone. Please reach out to compassionate professionals immediately:\n\n"
                    "• Tele-MANAS (24/7 Toll-Free India): 14416 or 1800-891-4416\n"
                    "• KIRAN Mental Health Helpline: 1800-599-0019\n"
                    "• 988 Suicide & Crisis Lifeline (US/Intl): Call or text 988\n\n"
                    "A counselor is ready to listen without judgment. Please reach out right now, or let me notify your trusted contact."
                ),
                "crisis_flag": True,
                "suggested_activities": ["Grounding 5-4-3-2-1", "Contact Counselor", "Call 14416"]
            }

        if self.client:
            try:
                response = self.client.models.generate_content(
                    model="gemini-3.8-flash",
                    contents=message,
                    config={
                        "system_instruction": self.SYSTEM_INSTRUCTION,
                        "temperature": 0.7
                    }
                )
                return {
                    "message": response.text or "Take a gentle breath. I am right here with you.",
                    "crisis_flag": False,
                    "suggested_activities": ["Box Breathing", "Quick Journaling", "Academic Pomodoro"]
                }
            except Exception as e:
                print(f"Gemini API error: {e}")

        # Empathetic fallback response when offline or key pending
        return {
            "message": (
                "It takes meaningful self-awareness to pause and express how you feel. "
                "Academic expectations and daily pressures can build up silently. "
                "Would it help to take two minutes for a calming Box Breathing exercise together, "
                "or would you like to unpack what's on your mind?"
            ),
            "crisis_flag": False,
            "suggested_activities": ["Box Breathing 4-4-4-4", "Sensory Grounding", "Emotional Journal"]
        }

gemini_assistant_service = GeminiAssistantService()
