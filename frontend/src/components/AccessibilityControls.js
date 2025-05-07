import React from 'react';
import { useAccessibility } from '../context/AccessibilityContext';
import { useLanguage } from '../context/LanguageContext';
import {
  Box,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Tooltip,
} from '@mui/material';
import {
  Mic as MicIcon,
  MicOff as MicOffIcon,
  RecordVoiceOver as RecordVoiceOverIcon,
  VoiceOverOff as VoiceOverOffIcon,
  Accessibility as AccessibilityIcon,
} from '@mui/icons-material';

const AccessibilityControls = () => {
  const { t } = useLanguage();
  const {
    isSpeechEnabled,
    isListening,
    toggleSpeech,
    startListening,
    stopListening,
    readPageContent,
  } = useAccessibility();

  const handleScreenReaderToggle = () => {
    toggleSpeech();
    if (!isSpeechEnabled) {
      // If enabling screen reader, read the page content after a short delay
      setTimeout(readPageContent, 1000);
    }
  };

  const actions = [
    {
      icon: isSpeechEnabled ? <VoiceOverOffIcon /> : <RecordVoiceOverIcon />,
      name: isSpeechEnabled ? t('disableScreenReader') : t('enableScreenReader'),
      onClick: handleScreenReaderToggle,
      'aria-label': isSpeechEnabled ? t('disableScreenReader') : t('enableScreenReader'),
    },
    {
      icon: isListening ? <MicOffIcon /> : <MicIcon />,
      name: isListening ? t('stopVoiceCommands') : t('startVoiceCommands'),
      onClick: isListening ? stopListening : startListening,
      'aria-label': isListening ? t('stopVoiceCommands') : t('startVoiceCommands'),
    }
  ];

  return (
    <Box
      sx={{
        position: 'fixed',
        right: 16,
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 1000,
      }}
      role="complementary"
      aria-label={t('accessibilityControls')}
    >
      <SpeedDial
        ariaLabel={t('accessibilityControls')}
        icon={<SpeedDialIcon icon={<AccessibilityIcon />} />}
        direction="up"
        sx={{
          '& .MuiFab-primary': {
            width: 48,
            height: 48,
            backgroundColor: '#2e7d32',
            '&:hover': {
              backgroundColor: '#1b5e20',
            },
          },
        }}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.onClick}
            aria-label={action['aria-label']}
            sx={{
              width: 40,
              height: 40,
            }}
          />
        ))}
      </SpeedDial>
    </Box>
  );
};

export default AccessibilityControls; 