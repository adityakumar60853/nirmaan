import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  useTheme,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  Person as PersonIcon,
  Work as WorkIcon,
  School as SchoolIcon,
  AccountBalance as AccountBalanceIcon,
  TrendingUp as TrendingUpIcon,
  Notifications as NotificationsIcon,
  Edit as EditIcon,
} from '@mui/icons-material';
import { useLanguage } from '../context/LanguageContext';

function UserDashboard() {
  const { user, isLoading, isError, message } = useSelector((state) => state.auth);
  const { t } = useLanguage();
  const theme = useTheme();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  useEffect(() => {
    if (isError) {
      setError(message || t('An error occurred loading your dashboard'));
    }
    
    // If no user is found, redirect to login
    if (!user && !isLoading) {
      navigate('/login');
    }
  }, [user, isLoading, isError, message, navigate, t]);

  // Show loading state
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  // Show error state
  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Button variant="contained" color="primary" onClick={() => navigate('/login')}>
          {t('Return to Login')}
        </Button>
      </Container>
    );
  }

  // If no user data is available, don't render the dashboard
  if (!user) {
    return null;
  }

  const quickActions = [
    {
      icon: WorkIcon,
      title: t('Find Jobs'),
      description: t('Browse and apply for job opportunities'),
      link: '/jobs',
      color: theme.palette.primary.main,
    },
    {
      icon: SchoolIcon,
      title: t('Training Courses'),
      description: t('Access skill development courses'),
      link: '/courses',
      color: theme.palette.secondary.main,
    },
    {
      icon: AccountBalanceIcon,
      title: t('Government Schemes'),
      description: t('View and apply for government schemes'),
      link: '/schemes',
      color: theme.palette.success.main,
    },
  ];

  const recentActivities = [
    {
      type: 'job',
      title: t('Job Application Submitted'),
      description: t('Applied for Software Developer position'),
      date: '2024-03-20',
    },
    {
      type: 'course',
      title: t('Course Enrolled'),
      description: t('Enrolled in Digital Marketing Basics'),
      date: '2024-03-19',
    },
    {
      type: 'scheme',
      title: t('Scheme Application'),
      description: t('Applied for PM Kisan Samman Nidhi'),
      date: '2024-03-18',
    },
  ];

  return (
    <Box sx={{ py: 4, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Container maxWidth="lg">
        {/* Welcome Section */}
        <Paper
          elevation={3}
          sx={{
            p: 4,
            mb: 4,
            background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.light} 90%)`,
            color: 'white',
            borderRadius: 2,
          }}
        >
          <Grid container spacing={3} alignItems="center">
            <Grid item>
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  bgcolor: 'white',
                  color: theme.palette.primary.main,
                }}
              >
                {user?.name ? user.name.charAt(0).toUpperCase() : <PersonIcon />}
              </Avatar>
            </Grid>
            <Grid item xs>
              <Typography variant="h4" gutterBottom>
                {t('Welcome')}, {user?.name}!
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9 }}>
                {t('Access your personalized dashboard for jobs, training, and government schemes.')}
              </Typography>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                color="inherit"
                startIcon={<EditIcon />}
                component={Link}
                to="/profile/edit"
              >
                {t('Edit Profile')}
              </Button>
            </Grid>
          </Grid>
        </Paper>

        {/* Quick Actions */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {quickActions.map((action, index) => (
            <Grid item xs={12} md={4} key={index}>
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
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <action.icon sx={{ fontSize: 40, color: action.color, mr: 2 }} />
                    <Typography variant="h6">{action.title}</Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {action.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    component={Link}
                    to={action.link}
                    size="small"
                    sx={{ color: action.color }}
                  >
                    {t('View More')}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Profile and Recent Activities */}
        <Grid container spacing={3}>
          {/* Profile Section */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Typography variant="h6" gutterBottom>
                {t('Profile Information')}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <List>
                <ListItem>
                  <ListItemIcon>
                    <PersonIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary={t('Name')}
                    secondary={user?.name || t('Not provided')}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <NotificationsIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary={t('Contact')}
                    secondary={user?.contactNo || t('Not provided')}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <WorkIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary={t('Work Type')}
                    secondary={user?.workType || t('Not provided')}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <TrendingUpIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary={t('Location')}
                    secondary={user?.district && user?.state ? `${user.district}, ${user.state}` : t('Not provided')}
                  />
                </ListItem>
              </List>
            </Paper>
          </Grid>

          {/* Recent Activities */}
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Typography variant="h6" gutterBottom>
                {t('Recent Activities')}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <List>
                {recentActivities.map((activity, index) => (
                  <React.Fragment key={index}>
                    <ListItem>
                      <ListItemIcon>
                        {activity.type === 'job' && <WorkIcon color="primary" />}
                        {activity.type === 'course' && <SchoolIcon color="primary" />}
                        {activity.type === 'scheme' && <AccountBalanceIcon color="primary" />}
                      </ListItemIcon>
                      <ListItemText
                        primary={activity.title}
                        secondary={
                          <>
                            <Typography variant="body2" component="span">
                              {activity.description}
                            </Typography>
                            <Typography
                              variant="caption"
                              display="block"
                              color="text.secondary"
                            >
                              {new Date(activity.date).toLocaleDateString()}
                            </Typography>
                          </>
                        }
                      />
                    </ListItem>
                    {index < recentActivities.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default UserDashboard; 