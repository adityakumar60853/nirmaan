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
  People as PeopleIcon,
  School as SchoolIcon,
  Work as WorkIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';

function AdminDashboard() {
  const { user } = useSelector((state) => state.auth);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Welcome Section */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h4" gutterBottom>
              Admin Dashboard
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Welcome back, {user?.name}! Manage your administrative tasks here.
            </Typography>
          </Paper>
        </Grid>

        {/* Quick Access Cards */}
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PeopleIcon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
                <Typography variant="h6">User Management</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Manage users, roles, and permissions
              </Typography>
            </CardContent>
            <CardActions>
              <Button component={Link} to="/admin/users" size="small" color="primary">
                Manage Users
              </Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <SchoolIcon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
                <Typography variant="h6">Course Management</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Add, edit, and manage training courses
              </Typography>
            </CardContent>
            <CardActions>
              <Button component={Link} to="/admin/courses" size="small" color="primary">
                Manage Courses
              </Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <WorkIcon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
                <Typography variant="h6">Vacancy Management</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Manage job postings and applications
              </Typography>
            </CardContent>
            <CardActions>
              <Button component={Link} to="/admin/vacancies" size="small" color="primary">
                Manage Vacancies
              </Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <SettingsIcon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
                <Typography variant="h6">System Settings</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Configure system settings and preferences
              </Typography>
            </CardContent>
            <CardActions>
              <Button component={Link} to="/admin/settings" size="small" color="primary">
                Manage Settings
              </Button>
            </CardActions>
          </Card>
        </Grid>

        {/* Statistics Section */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3, mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              System Overview
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={3}>
                <Typography variant="h4" color="primary">
                  150
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Users
                </Typography>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Typography variant="h4" color="primary">
                  25
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Active Courses
                </Typography>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Typography variant="h4" color="primary">
                  45
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Open Vacancies
                </Typography>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Typography variant="h4" color="primary">
                  10
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  CSC Activities
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default AdminDashboard; 