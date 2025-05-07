import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { register, reset } from '../features/auth/authSlice';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Paper,
  Snackbar,
  FormHelperText,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import VoiceInput from '../components/VoiceInput';
import { useLanguage } from '../context/LanguageContext';
import '../components.css';
import axios from 'axios';

const WORK_TYPES = [
  'IT',
  'Agriculture',
  'Labour',
  'Electrician',
  'Fitter',
  'Plumber',
  'Other'
];

const STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat',
  'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra',
  'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim',
  'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
];

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user',
    contactNo: '',
    aadhaarNo: '',
    address: '',
    annualIncome: '',
    workType: '',
    state: '',
    district: '',
    dob: null,
  });

  const [errors, setErrors] = useState({});
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const { t } = useLanguage();

  useEffect(() => {
    if (isError) {
      setError(message);
      setLoading(false);
    }

    if (isSuccess && user) {
      setShowSuccess(true);
      setLoading(false);
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    }

    return () => {
      dispatch(reset());
    };
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name) newErrors.name = t('Name is required');
    if (!formData.email) newErrors.email = t('Email is required');
    if (!formData.password) newErrors.password = t('Password is required');
    if (formData.password.length < 6) newErrors.password = t('Password must be at least 6 characters');
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = t('Passwords do not match');
    if (!formData.contactNo) newErrors.contactNo = t('Contact number is required');
    if (formData.contactNo.length !== 10) newErrors.contactNo = t('Contact number must be 10 digits');
    if (!formData.aadhaarNo) newErrors.aadhaarNo = t('Aadhaar number is required');
    if (formData.aadhaarNo.length !== 12) newErrors.aadhaarNo = t('Aadhaar number must be 12 digits');
    if (!formData.address) newErrors.address = t('Address is required');
    if (!formData.annualIncome) newErrors.annualIncome = t('Annual income is required');
    if (!formData.workType) newErrors.workType = t('Work type is required');
    if (!formData.state) newErrors.state = t('State is required');
    if (!formData.district) newErrors.district = t('District is required');
    if (!formData.dob) newErrors.dob = t('Date of birth is required');

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    const userData = {
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      password: formData.password,
      contactNo: formData.contactNo.trim(),
      aadhaarNo: formData.aadhaarNo.trim(),
      address: formData.address.trim(),
      annualIncome: Number(formData.annualIncome),
      workType: formData.workType,
      state: formData.state,
      district: formData.district,
      dob: formData.dob,
      role: 'user'
    };

    dispatch(register(userData));
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
      <Container maxWidth="md">
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
              src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg"
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
            Create Your Account
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {showSuccess && (
            <Alert severity="success" sx={{ mb: 3 }}>
              Registration successful! Redirecting to dashboard...
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <Box sx={{ mb: 4 }}>
              <Typography 
                variant="h6" 
                gutterBottom
                sx={{ 
                  color: '#2e7d32',
                  fontWeight: 500,
                  mb: 2 
                }}
              >
                {t('personalInformation')}
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <VoiceInput
                    fullWidth
                    label={t('fullName')}
                    name="name"
                    value={formData.name}
                    onChange={onChange}
                    error={!!errors.name}
                    helperText={errors.name}
                    required
                    sx={{
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
                </Grid>
                <Grid item xs={12} sm={6}>
                  <VoiceInput
                    fullWidth
                    label={t('email')}
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={onChange}
                    error={!!errors.email}
                    helperText={errors.email}
                    required
                    sx={{
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
                </Grid>
                <Grid item xs={12} sm={6}>
                  <VoiceInput
                    fullWidth
                    label={t('password')}
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={onChange}
                    error={!!errors.password}
                    helperText={errors.password}
                    required
                    sx={{
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
                </Grid>
                <Grid item xs={12} sm={6}>
                  <VoiceInput
                    fullWidth
                    label={t('confirmPassword')}
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={onChange}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword}
                    required
                    sx={{
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
                </Grid>
                <Grid item xs={12} sm={6}>
                  <VoiceInput
                    fullWidth
                    label={t('contactNumber')}
                    name="contactNo"
                    value={formData.contactNo}
                    onChange={onChange}
                    error={!!errors.contactNo}
                    helperText={errors.contactNo}
                    required
                    sx={{
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
                </Grid>
                <Grid item xs={12} sm={6}>
                  <VoiceInput
                    fullWidth
                    label={t('aadhaarNumber')}
                    name="aadhaarNo"
                    value={formData.aadhaarNo}
                    onChange={onChange}
                    error={!!errors.aadhaarNo}
                    helperText={errors.aadhaarNo}
                    required
                    sx={{
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
                </Grid>
                <Grid item xs={12}>
                  <VoiceInput
                    fullWidth
                    label={t('address')}
                    name="address"
                    value={formData.address}
                    onChange={onChange}
                    error={!!errors.address}
                    helperText={errors.address}
                    multiline
                    rows={3}
                    required
                    sx={{
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
                </Grid>
                <Grid item xs={12} sm={6}>
                  <VoiceInput
                    fullWidth
                    label={t('annualIncome')}
                    name="annualIncome"
                    type="number"
                    value={formData.annualIncome}
                    onChange={onChange}
                    error={!!errors.annualIncome}
                    helperText={errors.annualIncome}
                    required
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        height: '56px',
                        '&.Mui-focused fieldset': {
                          borderColor: '#2e7d32',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        transform: 'translate(14px, 16px) scale(1)',
                        '&.Mui-focused, &.MuiFormLabel-filled': {
                          transform: 'translate(14px, -9px) scale(0.75)',
                          color: '#2e7d32',
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth error={!!errors.workType}>
                    <InputLabel>{t('workType')}</InputLabel>
                    <Select
                      name="workType"
                      value={formData.workType}
                      onChange={onChange}
                      label={t('workType')}
                      required
                    >
                      {WORK_TYPES.map((type) => (
                        <MenuItem key={type} value={type}>
                          {t(type)}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.workType && (
                      <FormHelperText>{errors.workType}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth error={!!errors.state}>
                    <InputLabel>{t('state')}</InputLabel>
                    <Select
                      name="state"
                      value={formData.state}
                      onChange={onChange}
                      label={t('state')}
                      required
                    >
                      {STATES.map((state) => (
                        <MenuItem key={state} value={state}>
                          {state}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.state && (
                      <FormHelperText>{errors.state}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <VoiceInput
                    fullWidth
                    label={t('district')}
                    name="district"
                    value={formData.district}
                    onChange={onChange}
                    error={!!errors.district}
                    helperText={errors.district}
                    required
                    sx={{
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
                </Grid>
                <Grid item xs={12} sm={6}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label={t('dateOfBirth')}
                      value={formData.dob}
                      onChange={(newValue) => {
                        setFormData((prevState) => ({
                          ...prevState,
                          dob: newValue,
                        }));
                      }}
                      renderInput={(params) => (
                        <VoiceInput
                          {...params}
                          fullWidth
                          error={!!errors.dob}
                          helperText={errors.dob}
                          required
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              height: '56px',
                              '&.Mui-focused fieldset': {
                                borderColor: '#2e7d32',
                              },
                            },
                            '& .MuiInputLabel-root': {
                              transform: 'translate(14px, 16px) scale(1)',
                              '&.Mui-focused, &.MuiFormLabel-filled': {
                                transform: 'translate(14px, -9px) scale(0.75)',
                                color: '#2e7d32',
                              },
                            },
                          }}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>
              </Grid>
            </Box>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              sx={{
                mt: 2,
                py: 1.5,
                backgroundColor: '#2e7d32',
                '&:hover': {
                  backgroundColor: '#1b5e20',
                },
                borderRadius: 1,
                textTransform: 'uppercase',
              }}
            >
              {loading ? <CircularProgress size={24} /> : t('register')}
            </Button>
          </form>
        </Paper>
      </Container>
      <Snackbar
        open={showSuccess}
        autoHideDuration={2000}
        onClose={() => setShowSuccess(false)}
        message="Registration successful!"
      />
    </Box>
  );
}

export default Register; 