import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  useTheme,
  Paper,
} from '@mui/material';
import { ArrowForward as ArrowForwardIcon } from '@mui/icons-material';

const schemes = [
  {
    image: 'https://images.unsplash.com/photo-1581094794329-c8112c4e3f0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    title: 'Mahatma Gandhi National Rural Employment Guarantee Act',
    description: 'Providing 100 days of guaranteed wage employment to rural households.',
    link: '/schemes/mgnrega',
    color: '#1a73e8',
  },
  {
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    title: 'Pradhan Mantri Kisan Samman Nidhi',
    description: 'Income support scheme for farmers with direct benefit transfer.',
    link: '/schemes/pmkisan',
    color: '#0d47a1',
  },
  {
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    title: 'Pradhan Mantri Awas Yojana',
    description: 'Housing for All by 2022 - Affordable housing scheme.',
    link: '/schemes/pmay',
    color: '#1565c0',
  },
];

function SchemeSlideshow() {
  const theme = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % schemes.length);
      setImageError(false);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const currentScheme = schemes[currentIndex];

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <Box
      sx={{
        position: 'relative',
        height: '500px',
        overflow: 'hidden',
        borderRadius: '8px',
        boxShadow: theme.shadows[4],
        mb: 6,
        background: imageError ? `linear-gradient(135deg, ${currentScheme.color} 0%, ${theme.palette.primary.dark} 100%)` : 'none',
      }}
    >
      {!imageError && (
        <Box
          component="img"
          src={currentScheme.image}
          alt={currentScheme.title}
          onError={handleImageError}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'brightness(0.7)',
          }}
        />
      )}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          background: imageError 
            ? 'none' 
            : 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
          padding: theme.spacing(4),
          color: 'white',
        }}
      >
        <Typography
          variant="h4"
          component="h2"
          sx={{
            fontWeight: 600,
            mb: 2,
            textShadow: '0 2px 4px rgba(0,0,0,0.3)',
          }}
        >
          {currentScheme.title}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            mb: 3,
            fontSize: '1.1rem',
            textShadow: '0 1px 2px rgba(0,0,0,0.3)',
          }}
        >
          {currentScheme.description}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          endIcon={<ArrowForwardIcon />}
          href={currentScheme.link}
          sx={{
            backgroundColor: 'white',
            color: theme.palette.primary.main,
            '&:hover': {
              backgroundColor: 'white',
              transform: 'translateY(-2px)',
            },
          }}
        >
          Learn More
        </Button>
      </Box>
      <Box
        sx={{
          position: 'absolute',
          bottom: theme.spacing(2),
          right: theme.spacing(2),
          display: 'flex',
          gap: theme.spacing(1),
        }}
      >
        {schemes.map((_, index) => (
          <Paper
            key={index}
            sx={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: index === currentIndex ? 'white' : 'rgba(255,255,255,0.5)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'scale(1.2)',
              },
            }}
            onClick={() => {
              setCurrentIndex(index);
              setImageError(false);
            }}
          />
        ))}
      </Box>
    </Box>
  );
}

export default SchemeSlideshow; 