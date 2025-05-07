import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCSCData } from '../features/csc/cscSlice';
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
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
} from '@mui/material';
import {
  Group as GroupIcon,
  Event as EventIcon,
  LocationOn as LocationIcon,
  Language as LanguageIcon,
  People as PeopleIcon,
} from '@mui/icons-material';

function CSC() {
  const dispatch = useDispatch();
  const { cscData, volunteers, programs, isLoading } = useSelector(
    (state) => state.csc
  );

  useEffect(() => {
    dispatch(getCSCData());
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
        Community Service Center
      </Typography>

      {cscData && (
        <Grid container spacing={3}>
          {/* CSC Information */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Center Information
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <LocationIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="Location"
                      secondary={cscData.location}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <LanguageIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="Primary Language"
                      secondary={cscData.demographics.primaryLanguage}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <PeopleIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="Population"
                      secondary={cscData.demographics.population}
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* Volunteers Section */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <GroupIcon sx={{ fontSize: 30, color: 'primary.main', mr: 2 }} />
                  <Typography variant="h6">Volunteers</Typography>
                </Box>
                <List>
                  {volunteers.slice(0, 5).map((volunteer) => (
                    <React.Fragment key={volunteer._id}>
                      <ListItem>
                        <ListItemText
                          primary={volunteer.user.name}
                          secondary={`Role: ${volunteer.role} | Hours: ${volunteer.hours}`}
                        />
                        <Chip
                          label={volunteer.status}
                          color={volunteer.status === 'active' ? 'success' : 'default'}
                          size="small"
                        />
                      </ListItem>
                      <Divider />
                    </React.Fragment>
                  ))}
                </List>
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  Become a Volunteer
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Programs Section */}
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
              Current Programs
            </Typography>
            <Grid container spacing={3}>
              {programs.map((program) => (
                <Grid item xs={12} md={4} key={program._id}>
                  <Card>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <EventIcon
                          sx={{ fontSize: 30, color: 'primary.main', mr: 2 }}
                        />
                        <Typography variant="h6">{program.name}</Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        {program.description}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Status:</strong>{' '}
                        <Chip
                          label={program.status}
                          color={
                            program.status === 'ongoing'
                              ? 'success'
                              : program.status === 'planned'
                              ? 'primary'
                              : 'default'
                          }
                          size="small"
                        />
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" color="primary">
                        Learn More
                      </Button>
                      <Button size="small">Register</Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}

export default CSC; 