import React, { useState } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Tabs,
  Tab,
  TextField,
  InputAdornment,
} from '@mui/material';
import {
  Search as SearchIcon,
  School as SchoolIcon,
  AccessTime as AccessTimeIcon,
  Star as StarIcon,
} from '@mui/icons-material';

const COURSE_CATEGORIES = [
  'All Courses',
  'Agriculture',
  'Construction',
  'Manufacturing',
  'Healthcare',
  'IT & Digital',
  'Retail',
  'Hospitality',
];

const COURSE_THUMBNAILS = {
  'IT & Digital': '/images/courses/it-digital.jpg',
  'Agriculture': '/images/courses/agriculture.jpg',
  'Construction': '/images/courses/construction.jpg',
  'Manufacturing': '/images/courses/manufacturing.jpg',
  'Healthcare': '/images/courses/healthcare.jpg',
  'Retail': '/images/courses/retail.jpg',
  'Hospitality': '/images/courses/hospitality.jpg',
  'default': '/images/courses/default.jpg'
};

const DUMMY_COURSES = [
  {
    id: 1,
    title: 'Basic Computer Skills',
    description: 'Learn essential computer skills including MS Office, internet usage, and basic troubleshooting.',
    duration: '2 months',
    level: 'Beginner',
    rating: 4.5,
    category: 'IT & Digital',
  },
  {
    id: 2,
    title: 'Agricultural Techniques',
    description: 'Modern farming techniques, crop management, and sustainable agriculture practices.',
    duration: '3 months',
    level: 'Intermediate',
    rating: 4.2,
    category: 'Agriculture',
  },
  {
    id: 3,
    title: 'Construction Safety',
    description: 'Essential safety protocols and best practices in construction work.',
    duration: '1 month',
    level: 'Beginner',
    rating: 4.7,
    category: 'Construction',
  },
  {
    id: 4,
    title: 'Healthcare Assistant',
    description: 'Basic healthcare procedures, patient care, and medical terminology.',
    duration: '4 months',
    level: 'Intermediate',
    rating: 4.3,
    category: 'Healthcare',
  },
];

function Courses() {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const handleCategoryChange = (event, newValue) => {
    setSelectedCategory(newValue);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredCourses = DUMMY_COURSES.filter(course => {
    const matchesCategory = selectedCategory === 0 || course.category === COURSE_CATEGORIES[selectedCategory];
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Upskilling Courses
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>
          Enhance your skills with our comprehensive training programs
        </Typography>

        {/* Search Bar */}
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search courses..."
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{ mb: 3 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        {/* Categories */}
        <Tabs
          value={selectedCategory}
          onChange={handleCategoryChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ mb: 3 }}
        >
          {COURSE_CATEGORIES.map((category, index) => (
            <Tab key={index} label={category} />
          ))}
        </Tabs>
      </Box>

      {/* Course Grid */}
      <Grid container spacing={3}>
        {filteredCourses.map((course) => (
          <Grid item xs={12} sm={6} key={course.id}>
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
              <Box
                sx={{
                  height: 200,
                  backgroundImage: `url(${COURSE_THUMBNAILS[course.category] || COURSE_THUMBNAILS.default})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  position: 'relative',
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    bgcolor: 'rgba(0, 0, 0, 0.6)',
                    color: 'white',
                    p: 1,
                  }}
                >
                  <Typography variant="subtitle1">{course.category}</Typography>
                </Box>
              </Box>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>
                  {course.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {course.description}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                  <Chip
                    icon={<AccessTimeIcon />}
                    label={course.duration}
                    size="small"
                  />
                  <Chip
                    icon={<SchoolIcon />}
                    label={course.level}
                    size="small"
                  />
                  <Chip
                    icon={<StarIcon />}
                    label={course.rating}
                    size="small"
                  />
                </Box>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Enroll Now
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Courses; 