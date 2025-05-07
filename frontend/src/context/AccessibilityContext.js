import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLanguage } from './LanguageContext';

const AccessibilityContext = createContext();

export const useAccessibility = () => useContext(AccessibilityContext);

export const AccessibilityProvider = ({ children }) => {
  const [isSpeechEnabled, setIsSpeechEnabled] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const { currentLanguage } = useLanguage();

  useEffect(() => {
    // Initialize speech recognition
    if (window.webkitSpeechRecognition || window.SpeechRecognition) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      setRecognition(recognitionInstance);
    }
  }, []);

  // Screen reader functionality
  const speak = (text, priority = false) => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech if this is a priority message
      if (priority) {
        window.speechSynthesis.cancel();
      }

      const utterance = new SpeechSynthesisUtterance(text);
      
      // Set language based on current language
      switch (currentLanguage) {
        case 'hi':
          utterance.lang = 'hi-IN';
          break;
        case 'bn':
          utterance.lang = 'bn-IN';
          break;
        default:
          utterance.lang = 'en-US';
      }

      window.speechSynthesis.speak(utterance);
    }
  };

  // Read the current page content
  const readPageContent = () => {
    if (!isSpeechEnabled) return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    // Get all headings, paragraphs, and buttons
    const contentElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, button, a[href], input[type="text"], label');
    let contentToRead = [];

    contentElements.forEach(element => {
      if (element.tagName.toLowerCase() === 'input') {
        // For input fields, read their labels and placeholder text
        const label = element.labels?.[0]?.textContent;
        const placeholder = element.placeholder;
        if (label) contentToRead.push(label);
        if (placeholder) contentToRead.push(placeholder);
      } else {
        // For other elements, read their text content
        const text = element.textContent.trim();
        if (text) contentToRead.push(text);
      }
    });

    // Read the collected content
    contentToRead.forEach((text, index) => {
      setTimeout(() => speak(text), index * 100);
    });
  };

  // Observer for dynamic content changes
  useEffect(() => {
    if (!isSpeechEnabled) return;

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === 1) { // Element node
              const text = node.textContent?.trim();
              if (text && !node.classList?.contains('MuiSnackbarContent-root')) {
                speak(text);
              }
            }
          });
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => observer.disconnect();
  }, [isSpeechEnabled]);

  // Toggle speech functionality
  const toggleSpeech = () => {
    const newState = !isSpeechEnabled;
    setIsSpeechEnabled(newState);
    if (newState) {
      speak('Screen reader enabled', true);
      // Start reading page content after announcing screen reader is enabled
      setTimeout(readPageContent, 1000);
    } else {
      speak('Screen reader disabled', true);
      window.speechSynthesis.cancel();
    }
  };

  // Start voice command listening
  const startListening = () => {
    if (recognition) {
      recognition.start();
      setIsListening(true);
      speak('Voice commands enabled');
    }
  };

  // Stop voice command listening
  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
      speak('Voice commands disabled');
    }
  };

  // Voice-to-text for form inputs
  const startVoiceInput = (callback) => {
    if (window.webkitSpeechRecognition || window.SpeechRecognition) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      const inputRecognition = new SpeechRecognition();
      inputRecognition.continuous = false;
      inputRecognition.interimResults = false;
      inputRecognition.lang = currentLanguage === 'hi' ? 'hi-IN' : 
                             currentLanguage === 'bn' ? 'bn-IN' : 'en-US';

      inputRecognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        callback(transcript);
        speak('Input received: ' + transcript);
      };

      inputRecognition.start();
    }
  };

  const value = {
    isSpeechEnabled,
    isListening,
    speak,
    toggleSpeech,
    startListening,
    stopListening,
    startVoiceInput,
    readPageContent
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
}; 