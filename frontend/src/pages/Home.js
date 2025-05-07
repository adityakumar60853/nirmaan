import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import {
  Container,
  Typography,
  Button,
  Grid,
  Box,
  Paper,
} from '@mui/material';
import {
  Work as WorkIcon,
  Business as BusinessIcon,
  Computer as ComputerIcon,
} from '@mui/icons-material';
import SchemeSlideshow from '../components/SchemeSlideshow';

function Home() {
  const { t } = useLanguage();

  return (
    <div className="home-container">
      {/* Hero Section with Background Image */}
      <Box
        sx={{
          position: 'relative',
          height: '100vh',
          width: '100vw',
          margin: 0,
          padding: 0,
          paddingTop: '64px', // Height of the navbar
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'url(https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            opacity: 0.8,
            zIndex: 1,
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 2,
          },
        }}
      >
        <Container 
          maxWidth={false}
          sx={{ 
            position: 'relative',
            zIndex: 3,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            color: 'white',
            p: 0,
            m: 0,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
              mb: 4,
            }}
          >
            <Typography
              variant="h2"
              sx={{ 
                fontWeight: 'bold',
                color: 'white',
                fontStyle: 'italic',
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                mb: 2,
              }}
            >
              "Rozgaar. Raasta. Roshni"
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 3,
              }}
            >
              <Typography
                component="h1"
                variant="h2"
                className="typing-text"
                sx={{ 
                  fontWeight: 'bold',
                  color: 'white',
                  display: 'inline-block',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                }}
              >
                {t('welcome')}
              </Typography>
              <Typography 
                variant="h5" 
                paragraph
                sx={{
                  color: 'white',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.01)',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
                  },
                }}
              >
                {t('welcomeSubtitle')}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ mt: 4 }}>
            <Grid container spacing={2} justifyContent="center">
              <Grid item>
                <Button
                  component={Link}
                  to="/register"
                  variant="contained"
                  size="large"
                  startIcon={<WorkIcon />}
                  sx={{
                    transition: 'all 0.3s ease-in-out',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    color: 'primary.main',
                    '&:hover': {
                      transform: 'translateY(-3px)',
                      boxShadow: 4,
                      backgroundColor: 'white',
                    },
                  }}
                >
                  {t('registerJobSeeker')}
                </Button>
              </Grid>
              <Grid item>
                <Button
                  component={Link}
                  to="/register-provider"
                  variant="outlined"
                  size="large"
                  startIcon={<BusinessIcon />}
                  sx={{
                    transition: 'all 0.3s ease-in-out',
                    borderColor: 'white',
                    color: 'white',
                    '&:hover': {
                      transform: 'translateY(-3px)',
                      boxShadow: 4,
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      borderColor: 'white',
                    },
                  }}
                >
                  {t('registerJobProvider')}
                </Button>
              </Grid>
              <Grid item>
                <Button
                  component={Link}
                  to="/register-provider?role=csc"
                  variant="outlined"
                  size="large"
                  startIcon={<ComputerIcon />}
                  sx={{
                    transition: 'all 0.3s ease-in-out',
                    borderColor: 'white',
                    color: 'white',
                    '&:hover': {
                      transform: 'translateY(-3px)',
                      boxShadow: 4,
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      borderColor: 'white',
                    },
                  }}
                >
                  {t('registerCSC')}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid 
          container 
          spacing={4} 
          sx={{ 
            display: 'flex',
            alignItems: 'stretch',
            flexWrap: 'nowrap',
            '& .MuiGrid-item': {
              width: '33.333%',
              flex: '0 0 33.333%',
            }
          }}
        >
          <Grid item>
            <Paper
              sx={{
                p: 4,
                height: '300px',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                transition: 'all 0.3s ease-in-out',
                backgroundColor: 'background.paper',
                borderRadius: 2,
                '&:hover': {
                  transform: 'translateY(-10px)',
                  boxShadow: 6,
                },
              }}
            >
              <WorkIcon sx={{ fontSize: 48, mb: 3, color: 'primary.main' }} />
              <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
                {t('findJobs')}
              </Typography>
              <Typography variant="body1" sx={{ flex: 1, maxWidth: '90%', mx: 'auto' }}>
                {t('findJobsDesc')}
              </Typography>
            </Paper>
          </Grid>
          <Grid item>
            <Paper
              sx={{
                p: 4,
                height: '300px',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                transition: 'all 0.3s ease-in-out',
                backgroundColor: 'background.paper',
                borderRadius: 2,
                '&:hover': {
                  transform: 'translateY(-10px)',
                  boxShadow: 6,
                },
              }}
            >
              <BusinessIcon sx={{ fontSize: 48, mb: 3, color: 'primary.main' }} />
              <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
                {t('skillDevelopment')}
              </Typography>
              <Typography variant="body1" sx={{ flex: 1, maxWidth: '90%', mx: 'auto' }}>
                {t('skillDevelopmentDesc')}
              </Typography>
            </Paper>
          </Grid>
          <Grid item>
            <Paper
              sx={{
                p: 4,
                height: '300px',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                transition: 'all 0.3s ease-in-out',
                backgroundColor: 'background.paper',
                borderRadius: 2,
                '&:hover': {
                  transform: 'translateY(-10px)',
                  boxShadow: 6,
                },
              }}
            >
              <ComputerIcon sx={{ fontSize: 48, mb: 3, color: 'primary.main' }} />
              <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
                {t('multiLingual')}
              </Typography>
              <Typography variant="body1" sx={{ flex: 1, maxWidth: '90%', mx: 'auto' }}>
                {t('multiLingualDesc')}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Schemes Section */}
      <Box sx={{ bgcolor: 'background.default', py: 8 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            component="h2"
            align="center"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              mb: 6,
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                color: 'primary.main',
              },
            }}
          >
            {t('governmentSchemes')}
          </Typography>
          <SchemeSlideshow />
        </Container>
      </Box>
    </div>
  );
}

export default Home; 