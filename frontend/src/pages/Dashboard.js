import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  useTheme,
  Tabs,
  Tab,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  School as SchoolIcon,
  Work as WorkIcon,
  Group as GroupIcon,
  Language as LanguageIcon,
  AccountBalance as AccountBalanceIcon,
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';

const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिंदी' },
  { code: 'bn', name: 'বাংলা' },
  { code: 'te', name: 'తెలుగు' },
  { code: 'ta', name: 'தமிழ்' },
  { code: 'mr', name: 'मराठी' },
  { code: 'gu', name: 'ગુજરાતી' },
  { code: 'kn', name: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'മലയാളം' },
];

const SKILL_CATEGORIES = [
  'Agriculture',
  'Construction',
  'Manufacturing',
  'Healthcare',
  'IT & Digital',
  'Retail',
  'Hospitality',
  'Other Services'
];

function Dashboard() {
  const { user } = useSelector((state) => state.auth);
  const theme = useTheme();
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [selectedCategory, setSelectedCategory] = useState(0);

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  const handleCategoryChange = (event, newValue) => {
    setSelectedCategory(newValue);
  };

  const cardData = [
    {
      icon: SchoolIcon,
      title: 'Upskilling Courses',
      description: 'Access training courses, workshops, and educational resources to enhance your skills.',
      link: '/courses',
      buttonText: 'View Courses',
      color: theme.palette.primary.main,
    },
    {
      icon: WorkIcon,
      title: 'Job Opportunities',
      description: 'Explore job opportunities and internships that match your skills and experience.',
      link: '/jobs',
      buttonText: 'View Jobs',
      color: theme.palette.secondary.main,
    },
    {
      icon: AccountBalanceIcon,
      title: 'Government Schemes',
      description: 'Discover and apply for government schemes and benefits available to you.',
      link: '/schemes',
      buttonText: 'View Schemes',
      color: theme.palette.success.main,
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 6, mb: 6 }}>
      {/* Welcome Section */}
      <Box
        sx={{
          mb: 6,
          textAlign: 'center',
          position: 'relative',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.light} 90%)`,
            color: 'white',
            borderRadius: 2,
          }}
        >
          <Typography
            variant="h3"
            gutterBottom
            sx={{
              fontWeight: 600,
              mb: 2,
            }}
          >
            Hello {user && user.name ? user.name : ''}!
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 400,
              opacity: 0.9,
            }}
          >
            Welcome to your personalized dashboard. Explore opportunities and resources tailored for you.
          </Typography>
        </Paper>
      </Box>

      {/* Feature Cards */}
      <Box sx={{ width: '100%', mt: 4 }}>
        <Grid 
          container 
          spacing={2}
          direction="row"
          alignItems="stretch"
          sx={{ flexWrap: 'nowrap' }}
        >
          {cardData.map((card, index) => (
            <Grid 
              item
              key={index}
              sx={{
                flex: '0 0 auto',
                width: '32%',
                minWidth: '300px'
              }}
            >
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 6,
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      mb: 2,
                    }}
                  >
                    <Box
                      sx={{
                        p: 1.5,
                        borderRadius: 2,
                        backgroundColor: `${card.color}15`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: 2,
                      }}
                    >
                      <card.icon
                        sx={{
                          fontSize: 40,
                          color: card.color,
                        }}
                      />
                    </Box>
                    <Typography
                      variant="h6"
                      component="h2"
                      sx={{
                        fontWeight: 600,
                      }}
                    >
                      {card.title}
                    </Typography>
                  </Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mb: 2,
                      lineHeight: 1.6,
                    }}
                  >
                    {card.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{ p: 3, pt: 0 }}>
                  <Button
                    component={Link}
                    to={card.link}
                    variant="contained"
                    size="large"
                    sx={{
                      backgroundColor: card.color,
                      '&:hover': {
                        backgroundColor: `${card.color}dd`,
                        opacity: 0.9
                      },
                    }}
                    fullWidth
                  >
                    {card.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}

export default Dashboard; 