import React, { useState } from 'react';
import { useAccessibility } from '../context/AccessibilityContext';
import { useLanguage } from '../context/LanguageContext';
import {
  TextField,
  IconButton,
  InputAdornment,
  Tooltip,
} from '@mui/material';
import {
  Mic as MicIcon,
  MicOff as MicOffIcon,
} from '@mui/icons-material';

const VoiceInput = ({
  value,
  onChange,
  label,
  name,
  type = 'text',
  required = false,
  fullWidth = true,
  ...props
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const { startVoiceInput } = useAccessibility();
  const { t, currentLanguage } = useLanguage();

  const handleVoiceInput = () => {
    setIsRecording(true);
    startVoiceInput((transcript) => {
      onChange({ target: { name, value: transcript } });
      setIsRecording(false);
    });
  };

  return (
    <TextField
      value={value}
      onChange={onChange}
      label={label}
      name={name}
      type={type}
      required={required}
      fullWidth={fullWidth}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Tooltip title={t('startSpeaking')}>
              <IconButton
                onClick={handleVoiceInput}
                edge="end"
                color={isRecording ? 'error' : 'default'}
                aria-label={t('voiceInput')}
              >
                {isRecording ? <MicOffIcon /> : <MicIcon />}
              </IconButton>
            </Tooltip>
          </InputAdornment>
        ),
      }}
      {...props}
    />
  );
};

export default VoiceInput; 