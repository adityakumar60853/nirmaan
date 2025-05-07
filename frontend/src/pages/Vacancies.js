import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getVacancies } from '../features/vacancies/vacancySlice';
import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  CircularProgress,
  Box,
} from '@mui/material';
import { Work as WorkIcon } from '@mui/icons-material';

function Vacancies() {
  const dispatch = useDispatch();
  const { vacancies, isLoading } = useSelector((state) => state.vacancies);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getVacancies());
  }, [dispatch]);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Job Vacancies
      </Typography>
      <Grid container spacing={3}>
        {vacancies.map((vacancy) => (
          <Grid item xs={12} md={6} key={vacancy._id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <WorkIcon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
                  <Typography variant="h6">{vacancy.title}</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {vacancy.description}
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Chip
                    label={vacancy.employmentType}
                    color="primary"
                    size="small"
                    sx={{ mr: 1 }}
                  />
                  <Chip
                    label={vacancy.location}
                    color="secondary"
                    size="small"
                    sx={{ mr: 1 }}
                  />
                  <Chip
                    label={vacancy.requiredExperience}
                    variant="outlined"
                    size="small"
                  />
                </Box>
                <Typography variant="body2">
                  <strong>Required Skills:</strong>
                </Typography>
                <Box sx={{ mt: 1, mb: 2 }}>
                  {vacancy.requiredSkills.map((skill, index) => (
                    <Chip
                      key={index}
                      label={skill}
                      size="small"
                      sx={{ mr: 1, mb: 1 }}
                    />
                  ))}
                </Box>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  variant="contained"
                  disabled={vacancy.applicants.some(
                    (app) => app.user === user?._id
                  )}
                >
                  {vacancy.applicants.some((app) => app.user === user?._id)
                    ? 'Applied'
                    : 'Apply Now'}
                </Button>
                <Button size="small">View Details</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Vacancies; 