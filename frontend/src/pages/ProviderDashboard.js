import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Container, Grid, Paper, Typography, Button } from '@mui/material';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';

function ProviderDashboard() {
  const { user } = useSelector((state) => state.auth);
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <Box sx={{ py: 4 }}>
      <Container>
        <Typography variant="h4" gutterBottom>
          {t('Welcome')}, {user?.name}
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Typography variant="h6" gutterBottom>
                {t('Organization Profile')}
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Typography><strong>{t('Email')}:</strong> {user?.email}</Typography>
                <Typography><strong>{t('Contact')}:</strong> {user?.contactNo}</Typography>
                <Typography><strong>{t('Organization')}:</strong> {user?.organizationName}</Typography>
                <Typography><strong>{t('Location')}:</strong> {user?.district}, {user?.state}</Typography>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Typography variant="h6" gutterBottom>
                {t('Quick Actions')}
              </Typography>
              <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button 
                  variant="contained" 
                  color="primary"
                  onClick={() => navigate('/post-job')}
                >
                  {t('Post New Job')}
                </Button>
                <Button 
                  variant="outlined" 
                  color="primary"
                  onClick={() => navigate('/manage-jobs')}
                >
                  {t('Manage Posted Jobs')}
                </Button>
                <Button 
                  variant="outlined" 
                  color="primary"
                  onClick={() => navigate('/view-applications')}
                >
                  {t('View Applications')}
                </Button>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                {t('Recent Activities')}
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <Paper sx={{ p: 2, bgcolor: 'primary.light', color: 'white' }}>
                    <Typography variant="h6">0</Typography>
                    <Typography>{t('Active Jobs')}</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Paper sx={{ p: 2, bgcolor: 'secondary.light', color: 'white' }}>
                    <Typography variant="h6">0</Typography>
                    <Typography>{t('Total Applications')}</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Paper sx={{ p: 2, bgcolor: 'success.light', color: 'white' }}>
                    <Typography variant="h6">0</Typography>
                    <Typography>{t('Positions Filled')}</Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ProviderDashboard; 