import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  useTheme,
} from '@mui/material';
import {
  Work as WorkIcon,
  School as SchoolIcon,
  Business as BusinessIcon,
  Search as SearchIcon,
  TrendingUp as TrendingUpIcon,
  Security as SecurityIcon,
} from '@mui/icons-material';

function Home() {
  const theme = useTheme();

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(45deg, #1a73e8 30%, #0d47a1 90%)',
          color: 'white',
          py: 8,
          position: 'relative',
          overflow: 'hidden',
          '&:hover': {
            background: 'linear-gradient(45deg, #0d47a1 30%, #1a73e8 90%)',
            transition: 'background 0.5s ease-in-out',
          },
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography 
                variant="h2" 
                component="h1" 
                gutterBottom
                sx={{
                  '&:hover': {
                    transform: 'scale(1.05)',
                    textShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
                    transition: 'all 0.3s ease-in-out',
                    cursor: 'default',
                  },
                }}
              >
                Welcome to Nirmaan
              </Typography>
              <Typography 
                variant="h5" 
                gutterBottom
                sx={{
                  '&:hover': {
                    transform: 'translateX(5px)',
                    transition: 'transform 0.3s ease-in-out',
                  },
                }}
              >
                Empowering Rural India through Employment Opportunities
              </Typography>
              <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
                <Button
                  component={Link}
                  to="/register"
                  variant="contained"
                  color="secondary"
                  size="large"
                  startIcon={<WorkIcon />}
                  sx={{
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: 3,
                      transition: 'all 0.3s ease-in-out',
                    },
                  }}
                >
                  Register as User
                </Button>
                <Button
                  component={Link}
                  to="/register-provider?role=jobProvider"
                  variant="outlined"
                  color="inherit"
                  size="large"
                  startIcon={<BusinessIcon />}
                  sx={{
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: 3,
                      transition: 'all 0.3s ease-in-out',
                    },
                  }}
                >
                  Register as Provider
                </Button>
                <Button
                  component={Link}
                  to="/register-provider?role=csc"
                  variant="outlined"
                  color="inherit"
                  size="large"
                  startIcon={<SchoolIcon />}
                  sx={{
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: 3,
                      transition: 'all 0.3s ease-in-out',
                    },
                  }}
                >
                  Register as CSC
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="/hero-image.jpg"
                alt="Rural Development"
                sx={{
                  width: '100%',
                  borderRadius: 2,
                  boxShadow: 3,
                  '&:hover': {
                    transform: 'scale(1.02)',
                    transition: 'transform 0.3s ease-in-out',
                  },
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" align="center" gutterBottom>
          Key Features
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <SearchIcon color="primary" sx={{ fontSize: 40, mb: 2 }} />
                <Typography variant="h5" gutterBottom>
                  Job Search
                </Typography>
                <Typography>
                  Find employment opportunities in your local area with our easy-to-use job search platform.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <TrendingUpIcon color="primary" sx={{ fontSize: 40, mb: 2 }} />
                <Typography variant="h5" gutterBottom>
                  Skill Development
                </Typography>
                <Typography>
                  Access training programs and skill development courses to enhance your employability.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <SecurityIcon color="primary" sx={{ fontSize: 40, mb: 2 }} />
                <Typography variant="h5" gutterBottom>
                  Secure Platform
                </Typography>
                <Typography>
                  Your data is protected with industry-standard security measures and privacy controls.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Home; 