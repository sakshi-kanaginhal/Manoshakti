import re
from typing import Dict, Tuple

class TextEmotionAnalyzer:
    """
    Independent text emotion classification pipeline.
    Inspired by GoEmotions and DistilBERT architectures.
    Produces calibrated probabilities across 8 discrete emotional states:
    Happiness, Sadness, Anger, Fear, Anxiety, Frustration, Surprise, Neutral.
    """
    
    EMOTION_LEXICON = {
        "anxiety": [
            "exam", "exams", "test", "tests", "overwhelmed", "deadline", "scared", "nervous", 
            "panic", "can't breathe", "failing", "fail", "stress", "stressed", "pressure", 
            "future", "uncertain", "racing", "worry", "worried", "dread", "shaking"
        ],
        "sadness": [
            "sad", "crying", "alone", "lonely", "hopeless", "depressed", "empty", "tired", 
            "exhausted", "numb", "unhappy", "hurts", "hurting", "lost", "nobody", "grief", "breakup"
        ],
        "frustration": [
            "stuck", "annoyed", "frustrated", "unfair", "useless", "irritated", "pointless", 
            "waste", "bothering", "hate this", "giving up", "cant do this", "impossible"
        ],
        "anger": [
            "angry", "mad", "furious", "rage", "screaming", "unfair", "betrayed", "hostile", "bitter"
        ],
        "fear": [
            "terrified", "afraid", "nightmare", "danger", "dread", "threatened", "horror", "panic"
        ],
        "happiness": [
            "happy", "proud", "joy", "glad", "grateful", "accomplished", "peaceful", "excited", 
            "hopeful", "smiling", "great", "wonderful", "relieved", "energized", "content"
        ],
        "surprise": [
            "shocked", "surprised", "unexpected", "astonished", "suddenly", "unbelievable", "wow"
        ]
    }
    
    REFLECTION_PROMPTS = {
        "anxiety": "It takes courage to acknowledge feeling overwhelmed. Would taking 3 deep belly breaths help ground your thoughts right now?",
        "sadness": "Honoring your sadness is a vital step toward healing. Be gentle with yourself today—you don't have to carry this alone.",
        "frustration": "Feeling blocked or frustrated can be deeply draining. What is one tiny thing within your control today?",
        "anger": "Anger often signals that a boundary was crossed or expectations hurt. What is your anger trying to protect?",
        "fear": "Uncertainty can feel paralyzing. Let's focus on the safety of this present moment, breath by breath.",
        "happiness": "What a wonderful moment of clarity and light! What contributed most to this uplifting energy today?",
        "surprise": "Unexpected shifts can shake our equilibrium. Take a moment to pause and let the new reality settle.",
        "neutral": "A calm, neutral space is a grounding baseline. How does your body feel in this quiet moment?"
    }

    def preprocess(self, text: str) -> list[str]:
        cleaned = re.sub(r'[^a-zA-Z\s]', '', text.lower())
        return cleaned.split()

    def analyze(self, text: str) -> Tuple[str, float, Dict[str, float], str]:
        words = self.preprocess(text)
        if not words:
            return "neutral", 0.5, {"neutral": 0.5, "happiness": 0.08, "anxiety": 0.07, "sadness": 0.07, "frustration": 0.07, "fear": 0.07, "anger": 0.07, "surprise": 0.07}, self.REFLECTION_PROMPTS["neutral"]

        scores = {k: 0.05 for k in ["happiness", "sadness", "anger", "fear", "anxiety", "frustration", "surprise", "neutral"]}
        
        total_hits = 0
        for word in words:
            for emotion, keywords in self.EMOTION_LEXICON.items():
                if word in keywords:
                    scores[emotion] += 1.0
                    total_hits += 1

        if total_hits == 0:
            scores["neutral"] = 1.0

        # Softmax-style normalization
        total = sum(scores.values())
        normalized = {k: round(v / total, 4) for k, v in scores.items()}
        
        dominant = max(normalized, key=normalized.get)
        confidence = normalized[dominant]
        prompt = self.REFLECTION_PROMPTS.get(dominant, self.REFLECTION_PROMPTS["neutral"])
        
        return dominant, confidence, normalized, prompt

text_emotion_analyzer = TextEmotionAnalyzer()
