import React from 'react';
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
} from '@mui/material';
import {
  Work as WorkIcon,
  People as PeopleIcon,
  Assessment as AssessmentIcon,
  Business as BusinessIcon,
} from '@mui/icons-material';

function JobProviderDashboard() {
  const { user } = useSelector((state) => state.auth);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Welcome Section */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h4" gutterBottom>
              Job Provider Dashboard
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Welcome back, {user?.name}! Manage your job postings and applications here.
            </Typography>
          </Paper>
        </Grid>

        {/* Quick Access Cards */}
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <WorkIcon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
                <Typography variant="h6">Job Postings</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Create and manage job vacancies
              </Typography>
            </CardContent>
            <CardActions>
              <Button component={Link} to="/vacancies/manage" size="small" color="primary">
                Manage Jobs
              </Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PeopleIcon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
                <Typography variant="h6">Applications</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Review job applications
              </Typography>
            </CardContent>
            <CardActions>
              <Button component={Link} to="/applications" size="small" color="primary">
                View Applications
              </Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AssessmentIcon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
                <Typography variant="h6">Analytics</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                View job posting statistics
              </Typography>
            </CardContent>
            <CardActions>
              <Button component={Link} to="/analytics" size="small" color="primary">
                View Analytics
              </Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <BusinessIcon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
                <Typography variant="h6">Company Profile</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Manage company information
              </Typography>
            </CardContent>
            <CardActions>
              <Button component={Link} to="/company/profile" size="small" color="primary">
                Edit Profile
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default JobProviderDashboard; 