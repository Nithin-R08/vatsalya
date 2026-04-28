import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

// --- TRANSLATION DATA ---
const resources = {
  en: {
    translation: {
      "greeting": "Hello, Arthur",
      "subtitle": "How can we help you today?",
      "sosBtn": "EMERGENCY HELP",
      "sosDesc": "Tap here to alert Jane immediately",
      "callJane": "Call Jane",
      "myMedicines": "My Medicines",
      "doctorVisit": "Doctor Visit",
      "healthStats": "Health Stats",
      "voicePrompt": "Tap the mic and say <1>\"Call Jane\"</1> or <1>\"I need help\"</1>",
      "due": "Due",
      "listening": "Listening...",
      "processing": "Vatsalya AI is processing...",
      "callingJane": "Calling Jane...",
      "sosTriggered": "SOS Triggered",
      "alerting": "Alerting Jane and Emergency Services in",
      "cancelAlert": "Cancel Alert",
      "alertSent": "Alert Sent!",
      "alertSentDesc": "Jane has been notified. Calling ambulance...",
      "dismiss": "Dismiss",
      "speakToJane": "Speak to Jane",
      "language": "English",
      "exit": "Exit"
    }
  },
  hi: {
    translation: {
      "greeting": "नमस्ते, आर्थर",
      "subtitle": "आज हम आपकी कैसे मदद कर सकते हैं?",
      "sosBtn": "आपातकालीन सहायता",
      "sosDesc": "जेन को तुरंत अलर्ट करने के लिए यहाँ टैप करें",
      "callJane": "जेन को कॉल करें",
      "myMedicines": "मेरी दवाएं",
      "doctorVisit": "डॉक्टर से मिलें",
      "healthStats": "स्वास्थ्य आंकड़े",
      "voicePrompt": "माइक टैप करें और बोलें <1>\"जेन को कॉल करें\"</1> या <1>\"मुझे मदद चाहिए\"</1>",
      "due": "बाकी",
      "listening": "सुन रहा हूँ...",
      "processing": "वात्सल्य AI प्रोसेस कर रहा है...",
      "callingJane": "जेन को कॉल कर रहा हूँ...",
      "sosTriggered": "SOS ट्रिगर हुआ",
      "alerting": "जेन और आपातकालीन सेवाओं को अलर्ट कर रहे हैं:",
      "cancelAlert": "अलर्ट रद्द करें",
      "alertSent": "अलर्ट भेज दिया गया!",
      "alertSentDesc": "जेन को सूचित कर दिया गया है। एम्बुलेंस बुला रहे हैं...",
      "dismiss": "हटाएं",
      "speakToJane": "जेन से बात करें",
      "language": "हिंदी",
      "exit": "बाहर जाएँ"
    }
  },
  ta: {
    translation: {
      "greeting": "வணக்கம், ஆர்தர்",
      "subtitle": "இன்று நாங்கள் உங்களுக்கு எப்படி உதவ முடியும்?",
      "sosBtn": "அவசர உதவி",
      "sosDesc": "ஜேனை உடனடியாக எச்சரிக்க இங்கே தட்டவும்",
      "callJane": "ஜேனை அழைக்கவும்",
      "myMedicines": "என் மருந்துகள்",
      "doctorVisit": "மருத்துவர் வருகை",
      "healthStats": "சுகாதார புள்ளிவிவரங்கள்",
      "voicePrompt": "மைக்கைத் தட்டி <1>\"ஜேனை அழைக்கவும்\"</1> அல்லது <1>\"எனக்கு உதவி வேண்டும்\"</1> என்று கூறவும்",
      "due": "பாக்கி",
      "listening": "கேட்கிறது...",
      "processing": "வாத்ஸல்யா AI செயலாக்குகிறது...",
      "callingJane": "ஜேனை அழைக்கிறது...",
      "sosTriggered": "SOS தூண்டப்பட்டது",
      "alerting": "ஜேன் மற்றும் அவசர சேவைகளை எச்சரிக்கிறது:",
      "cancelAlert": "எச்சரிக்கையை ரத்துசெய்",
      "alertSent": "எச்சரிக்கை அனுப்பப்பட்டது!",
      "alertSentDesc": "ஜேனுக்கு அறிவிக்கப்பட்டது. ஆம்புலன்ஸை அழைக்கிறது...",
      "dismiss": "நிராகரி",
      "speakToJane": "ஜேனிடம் பேசுங்கள்",
      "language": "தமிழ்",
      "exit": "வெளியேறு"
    }
  }
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", // Default language
    fallbackLng: "en",
    interpolation: {
      escapeValue: false // React already safes from xss
    }
  })

export default i18n
