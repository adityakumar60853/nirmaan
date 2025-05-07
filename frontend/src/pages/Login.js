import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login, reset } from '../features/auth/authSlice';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Paper,
  Tabs,
  Tab,
  Snackbar,
  InputAdornment,
} from '@mui/material';
import { Email as EmailIcon, Lock as LockIcon } from '@mui/icons-material';
import '../components.css';
import { useLanguage } from '../context/LanguageContext';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [loginType, setLoginType] = useState(0); // 0 for User, 1 for Job Provider, 2 for CSC

  const { email, password } = formData;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useLanguage();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      setError(message || t('Login failed. Please try again.'));
      setLoading(false);
      console.log('Login error:', message);
    }

    if (isSuccess && user) {
      console.log('Login successful, user:', user);
      setShowSuccess(true);
      setLoading(false);

      // Role-based redirection
      const userRole = user.role;
      console.log('User role for redirection:', userRole);

      if (userRole === 'admin') {
        navigate('/admin/dashboard');
      } else if (userRole === 'jobProvider') {
        navigate('/job-provider/dashboard');
      } else if (userRole === 'csc') {
        navigate('/csc/dashboard');
      } else if (userRole === 'user') {
        navigate('/user/dashboard');
      } else {
        console.error('Unknown user role:', userRole);
        setError('Invalid user role');
      }
    }

    return () => {
      dispatch(reset());
    };
  }, [user, isError, isSuccess, message, navigate, dispatch, t]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLoginTypeChange = (event, newValue) => {
    setLoginType(newValue);
    setError('');
  };

  const validateForm = () => {
    if (!email || !password) {
      setError(t('Please fill in all fields'));
      return false;
    }
    return true;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    if (!validateForm()) {
      setLoading(false);
      return;
    }

    let role;
    switch (loginType) {
      case 0:
        role = 'user';
        break;
      case 1:
        role = 'jobProvider';
        break;
      case 2:
        role = 'csc';
        break;
      default:
        role = 'user';
    }

    const userData = {
      email: email.trim().toLowerCase(),
      password,
      role,
    };

    dispatch(login(userData));
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #4a7e3d 0%, #2e5e1f 100%)',
        py: 4,
      }}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 2,
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
            <img
              src="/emblem.png"
              alt="Government of India Emblem"
              style={{ height: 60, width: 'auto', marginBottom: '8px' }}
            />
          </Box>

          <Typography
            variant="h5"
            component="h1"
            gutterBottom
            align="center"
            sx={{ mb: 4, fontWeight: 500 }}
          >
            {t('Login')}
          </Typography>

          <Box sx={{ mb: 4 }}>
            <Typography variant="subtitle1" gutterBottom sx={{ mb: 2 }}>
              {t('Select your role:')}
            </Typography>
            <Tabs
              value={loginType}
              onChange={handleLoginTypeChange}
              variant="fullWidth"
              sx={{ 
                border: 1,
                borderColor: 'divider',
                borderRadius: 1,
                '& .MuiTabs-indicator': {
                  backgroundColor: '#2e7d32',
                },
              }}
            >
              <Tab
                label={t('User')}
                sx={{
                  color: loginType === 0 ? '#2e7d32' : 'text.secondary',
                  fontWeight: loginType === 0 ? 600 : 400,
                }}
              />
              <Tab
                label={t('Job Provider')}
                sx={{
                  color: loginType === 1 ? '#2e7d32' : 'text.secondary',
                  fontWeight: loginType === 1 ? 600 : 400,
                }}
              />
              <Tab
                label={t('CSC')}
                sx={{
                  color: loginType === 2 ? '#2e7d32' : 'text.secondary',
                  fontWeight: loginType === 2 ? 600 : 400,
                }}
              />
            </Tabs>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {showSuccess && (
            <Alert severity="success" sx={{ mb: 3 }}>
              {t('Login successful!')}
            </Alert>
          )}

          <Box component="form" onSubmit={onSubmit}>
            <TextField
              fullWidth
              label={t('Email')}
              name="email"
              type="email"
              value={email}
              onChange={onChange}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon sx={{ color: 'text.secondary' }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: '#2e7d32',
                  },
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#2e7d32',
                },
              }}
            />

            <TextField
              fullWidth
              label={t('Password')}
              name="password"
              type="password"
              value={password}
              onChange={onChange}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon sx={{ color: 'text.secondary' }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: '#2e7d32',
                  },
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#2e7d32',
                },
              }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              sx={{
                py: 1.5,
                backgroundColor: '#2e7d32',
                '&:hover': {
                  backgroundColor: '#1b5e20',
                },
                borderRadius: 1,
                textTransform: 'uppercase',
              }}
            >
              {loading ? <CircularProgress size={24} /> : t('Login')}
            </Button>

            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                {t("Don't have an account?")}
                {' '}
                <Link
                  to={loginType === 0 ? '/register' : '/register-provider'}
                  style={{ color: '#2e7d32', textDecoration: 'none' }}
                >
                  {t('Register here')}
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
      <Snackbar
        open={showSuccess}
        autoHideDuration={1500}
        onClose={() => setShowSuccess(false)}
        message={t('Login successful!')}
      />
    </Box>
  );
}

export default Login; 