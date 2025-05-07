import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Button,
  useTheme,
  Tabs,
  Tab,
  Paper,
} from '@mui/material';
import {
  Work as WorkIcon,
  School as SchoolIcon,
  Home as HomeIcon,
  LocalHospital as HealthIcon,
  Agriculture as AgricultureIcon,
  Group as GroupIcon,
} from '@mui/icons-material';

const dummySchemes = [
  {
    id: 1,
    name: 'Mahatma Gandhi National Rural Employment Guarantee Act (MGNREGA)',
    description: 'A social security measure that aims to guarantee the right to work. It aims to enhance livelihood security in rural areas by providing at least 100 days of wage employment in a financial year to every household whose adult members volunteer to do unskilled manual work.',
    benefits: [
      '100 days of guaranteed wage employment per year',
      'Equal wages for men and women',
      'Work within 5 km of residence',
      'Unemployment allowance if work is not provided'
    ],
    eligibility: [
      'Must be a citizen of India',
      'Must be above 18 years of age',
      'Must be willing to do unskilled manual work',
      'Must be a member of a rural household'
    ],
    category: 'Employment',
    icon: WorkIcon,
    color: '#1a73e8',
  },
  {
    id: 2,
    name: 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)',
    description: 'A Central Sector Scheme with 100% funding from Government of India. Under this scheme, income support of Rs. 6,000 per year is provided to all farmer families across the country in three equal installments of Rs. 2,000 each.',
    benefits: [
      'Rs. 6,000 per year in three installments',
      'Direct benefit transfer to bank accounts',
      'No middlemen involved',
      'Covers all farmer families'
    ],
    eligibility: [
      'Must be a farmer',
      'Must have cultivable land',
      'Must have valid land records',
      'Must have a bank account'
    ],
    category: 'Agriculture',
    icon: AgricultureIcon,
    color: '#0d47a1',
  },
  {
    id: 3,
    name: 'Pradhan Mantri Awas Yojana (PMAY)',
    description: 'A flagship mission of Government of India being implemented by Ministry of Housing and Urban Affairs (MoHUA), was launched on 25th June 2015. The Mission addresses urban housing shortage among the EWS/LIG and MIG categories including the slum dwellers.',
    benefits: [
      'Subsidy on home loans',
      'Affordable housing units',
      'Infrastructure development',
      'Slum rehabilitation'
    ],
    eligibility: [
      'Must be a citizen of India',
      'Must not own a pucca house',
      'Must belong to EWS/LIG/MIG category',
      'Must have valid income proof'
    ],
    category: 'Housing',
    icon: HomeIcon,
    color: '#1565c0',
  },
  {
    id: 4,
    name: 'Ayushman Bharat Pradhan Mantri Jan Arogya Yojana (AB-PMJAY)',
    description: 'A flagship scheme of Government of India that was launched as recommended by the National Health Policy 2017, to achieve the vision of Universal Health Coverage (UHC).',
    benefits: [
      'Health cover of Rs. 5 lakhs per family per year',
      'Cashless and paperless access to services',
      'Covers secondary and tertiary hospitalization',
      'No restrictions on family size, age or gender'
    ],
    eligibility: [
      'Must be listed in the SECC database',
      'Must belong to identified occupational categories',
      'Must not have any pucca house',
      'Must not have any four-wheeler'
    ],
    category: 'Healthcare',
    icon: HealthIcon,
    color: '#e53935',
  },
  {
    id: 5,
    name: 'Pradhan Mantri Ujjwala Yojana (PMUY)',
    description: 'A scheme of the Ministry of Petroleum & Natural Gas for providing LPG connections to women from Below Poverty Line (BPL) households.',
    benefits: [
      'Free LPG connection',
      'Financial support for connection',
      'Easy EMI options',
      'Health benefits from clean cooking fuel'
    ],
    eligibility: [
      'Must be a woman above 18 years',
      'Must belong to BPL household',
      'Must not have an LPG connection',
      'Must have valid BPL certificate'
    ],
    category: 'Social Welfare',
    icon: GroupIcon,
    color: '#f57c00',
  },
  {
    id: 6,
    name: 'Pradhan Mantri Gramin Digital Saksharta Abhiyan (PMGDISHA)',
    description: 'The Scheme aims to make 6 crore persons in rural areas, across States/UTs, digitally literate, reaching to around 40% of rural households by covering one member from every eligible household.',
    benefits: [
      'Free digital literacy training',
      'Certification upon completion',
      'Enhanced employability',
      'Access to digital services'
    ],
    eligibility: [
      'Must be a rural resident',
      'Age between 14-60 years',
      'Must not be digitally literate',
      'Must have Aadhaar card'
    ],
    category: 'Education',
    icon: SchoolIcon,
    color: '#43a047',
  },
];

const categories = [
  { id: 'all', label: 'All Schemes', icon: GroupIcon },
  { id: 'Employment', label: 'Employment', icon: WorkIcon },
  { id: 'Education', label: 'Education', icon: SchoolIcon },
  { id: 'Housing', label: 'Housing', icon: HomeIcon },
  { id: 'Healthcare', label: 'Healthcare', icon: HealthIcon },
  { id: 'Agriculture', label: 'Agriculture', icon: AgricultureIcon },
  { id: 'Social Welfare', label: 'Social Welfare', icon: GroupIcon },
];

function Schemes() {
  const theme = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [schemes, setSchemes] = useState(dummySchemes);

  useEffect(() => {
    if (selectedCategory === 'all') {
      setSchemes(dummySchemes);
    } else {
      setSchemes(dummySchemes.filter(scheme => scheme.category === selectedCategory));
    }
  }, [selectedCategory]);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
        Government Schemes
      </Typography>

      {/* Category Tabs */}
      <Paper sx={{ mb: 4, borderRadius: 2 }}>
        <Tabs
          value={selectedCategory}
          onChange={(e, newValue) => setSelectedCategory(newValue)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            '& .MuiTab-root': {
              minHeight: 72,
              textTransform: 'none',
              fontWeight: 500,
            },
          }}
        >
          {categories.map((category) => (
            <Tab
              key={category.id}
              value={category.id}
              label={category.label}
              icon={<category.icon />}
              iconPosition="start"
            />
          ))}
        </Tabs>
      </Paper>

      {/* Scheme Cards */}
      <Grid container spacing={4}>
        {schemes.map((scheme) => {
          const Icon = scheme.icon;
          return (
            <Grid item xs={12} md={6} lg={4} key={scheme.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: theme.shadows[8],
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Box
                      sx={{
                        backgroundColor: `${scheme.color}15`,
                        borderRadius: 2,
                        p: 1,
                        mr: 2,
                      }}
                    >
                      <Icon sx={{ color: scheme.color, fontSize: 32 }} />
                    </Box>
                    <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
                      {scheme.name}
                    </Typography>
                  </Box>

                  <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                    {scheme.description}
                  </Typography>

                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                      Key Benefits:
                    </Typography>
                    {scheme.benefits.map((benefit, index) => (
                      <Chip
                        key={index}
                        label={benefit}
                        size="small"
                        sx={{
                          mr: 1,
                          mb: 1,
                          backgroundColor: `${scheme.color}15`,
                          color: scheme.color,
                        }}
                      />
                    ))}
                  </Box>

                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                      Eligibility:
                    </Typography>
                    {scheme.eligibility.map((item, index) => (
                      <Chip
                        key={index}
                        label={item}
                        size="small"
                        variant="outlined"
                        sx={{ mr: 1, mb: 1 }}
                      />
                    ))}
                  </Box>

                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      backgroundColor: scheme.color,
                      '&:hover': {
                        backgroundColor: scheme.color,
                        opacity: 0.9,
                      },
                    }}
                  >
                    Apply Now
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}

export default Schemes; 