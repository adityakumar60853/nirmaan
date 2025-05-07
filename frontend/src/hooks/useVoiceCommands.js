import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccessibility } from '../context/AccessibilityContext';
import { useLanguage } from '../context/LanguageContext';

const useVoiceCommands = () => {
  const navigate = useNavigate();
  const { isListening, speak } = useAccessibility();
  const { currentLanguage } = useLanguage();

  useEffect(() => {
    if (!isListening) return;

    const recognition = new (window.webkitSpeechRecognition || window.SpeechRecognition)();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = currentLanguage;

    const commands = {
      en: {
        'go to home': '/',
        'go to schemes': '/schemes',
        'go to training': '/training',
        'go to healthcare': '/healthcare',
        'go to agriculture': '/agriculture',
        'go to community': '/community',
        'go to login': '/login',
        'go to register': '/register',
      },
      hi: {
        'होम पर जाएं': '/',
        'योजनाओं पर जाएं': '/schemes',
        'प्रशिक्षण पर जाएं': '/training',
        'स्वास्थ्य पर जाएं': '/healthcare',
        'कृषि पर जाएं': '/agriculture',
        'समुदाय पर जाएं': '/community',
        'लॉगिन पर जाएं': '/login',
        'रजिस्टर पर जाएं': '/register',
      },
      bn: {
        'হোমে যান': '/',
        'স্কিমে যান': '/schemes',
        'প্রশিক্ষণে যান': '/training',
        'স্বাস্থ্যসেবায় যান': '/healthcare',
        'কৃষিতে যান': '/agriculture',
        'কমিউনিটিতে যান': '/community',
        'লগইনে যান': '/login',
        'রেজিস্টারে যান': '/register',
      },
    };

    recognition.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase();
      const currentCommands = commands[currentLanguage] || commands.en;

      Object.entries(currentCommands).forEach(([command, path]) => {
        if (transcript.includes(command.toLowerCase())) {
          navigate(path);
          speak(`Navigating to ${command}`);
        }
      });
    };

    recognition.start();

    return () => {
      recognition.stop();
    };
  }, [isListening, currentLanguage, navigate, speak]);
};

export default useVoiceCommands; 