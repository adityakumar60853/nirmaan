import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton, Divider } from '@mui/material';
import { useLanguage } from '../../context/LanguageContext';
import {
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  LinkedIn as LinkedInIcon,
  Instagram as InstagramIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon,
} from '@mui/icons-material';

const Footer = () => {
  const { t } = useLanguage();

  const socialLinks = [
    { icon: <FacebookIcon />, url: 'https://facebook.com/nirmaan' },
    { icon: <TwitterIcon />, url: 'https://twitter.com/nirmaan' },
    { icon: <LinkedInIcon />, url: 'https://linkedin.com/company/nirmaan' },
    { icon: <InstagramIcon />, url: 'https://instagram.com/nirmaan' },
  ];

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#1565c0',
        color: 'white',
        py: 2,
        mt: 'auto',
        height: '128px', // Twice the header height (64px * 2)
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={2} alignItems="center">
          {/* About Section */}
          <Grid item xs={12} md={4} sx={{ display: 'flex', alignItems: 'center' }}>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1rem', mb: 0.5 }}>
                NIRMAAN
                <Typography component="span" variant="subtitle2" sx={{ ml: 1, fontStyle: 'italic' }}>
                  Rozgaar. Raasta. Roshni
                </Typography>
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                {socialLinks.map((social, index) => (
                  <IconButton
                    key={index}
                    component="a"
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    size="small"
                    sx={{
                      color: 'white',
                      p: 0.5,
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      },
                    }}
                  >
                    {social.icon}
                  </IconButton>
                ))}
              </Box>
            </Box>
          </Grid>

          {/* Quick Links Section */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4 }}>
              <Box>
                <Link href="/" color="inherit" underline="hover" sx={{ opacity: 0.9, fontSize: '0.875rem' }}>
                  {t('home')}
                </Link>
                <Link href="/schemes" color="inherit" underline="hover" sx={{ opacity: 0.9, fontSize: '0.875rem', ml: 2 }}>
                  {t('schemes')}
                </Link>
              </Box>
              <Box>
                <Link href="/about" color="inherit" underline="hover" sx={{ opacity: 0.9, fontSize: '0.875rem' }}>
                  {t('aboutUs')}
                </Link>
                <Link href="/contact" color="inherit" underline="hover" sx={{ opacity: 0.9, fontSize: '0.875rem', ml: 2 }}>
                  {t('contactUs')}
                </Link>
              </Box>
            </Box>
          </Grid>

          {/* Contact Section */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <EmailIcon sx={{ fontSize: '1rem' }} />
                <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                  contact@nirmaan.org
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PhoneIcon sx={{ fontSize: '1rem' }} />
                <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                  +91 123 456 7890
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 1, borderColor: 'rgba(255, 255, 255, 0.2)' }} />

        {/* Copyright Section */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" sx={{ fontSize: '0.75rem' }}>
            © {new Date().getFullYear()} Nirmaan. {t('allRightsReserved')}
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Link href="/terms" color="inherit" underline="hover" sx={{ opacity: 0.9, fontSize: '0.75rem' }}>
              {t('terms')}
            </Link>
            <Link href="/privacy" color="inherit" underline="hover" sx={{ opacity: 0.9, fontSize: '0.75rem' }}>
              {t('privacy')}
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 