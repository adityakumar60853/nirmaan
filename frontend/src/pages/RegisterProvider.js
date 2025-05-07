import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { register, reset } from '../features/auth/authSlice';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  CircularProgress,
  Snackbar,
  FormHelperText,
} from '@mui/material';
import { useLanguage } from '../context/LanguageContext';
import { STATES } from '../constants/states';
import '../components.css';

const COMPANY_SECTORS = [
  'Information Technology',
  'Healthcare',
  'Manufacturing',
  'Education',
  'Finance',
  'Retail',
  'Construction',
  'Agriculture',
  'Transportation',
  'Hospitality',
  'Other'
];

function RegisterProvider() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { t } = useLanguage();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
    role: searchParams.get('role') || 'jobProvider',
    companyName: '',
    companyType: '',
    registrationNo: '',
    gstNo: '',
    state: '',
    district: '',
    cscId: '',
    cscType: '',
    companySector: '',
    companyAddress: '',
  });

  const [errors, setErrors] = useState({});
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess: authSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    const role = searchParams.get('role');
    if (role && (role === 'jobProvider' || role === 'csc')) {
      setFormData(prev => ({ ...prev, role }));
    }

    if (isError) {
      setError(message);
      setLoading(false);
    }

    if (authSuccess || user) {
      setShowSuccess(true);
      setTimeout(() => {
        // Role-based redirection
        switch (formData.role) {
          case 'csc':
            navigate('/csc/dashboard');
            break;
          case 'jobProvider':
          default:
            navigate('/provider/dashboard');
        }
      }, 2000);
    }

    return () => {
      dispatch(reset());
    };
  }, [searchParams, navigate, dispatch, authSuccess, user, isError, message, formData.role]);

  const validateForm = () => {
    const newErrors = {};
    
    // Common validations
    if (!formData.name) newErrors.name = t('Name is required');
    if (!formData.email) newErrors.email = t('Email is required');
    if (!formData.password) newErrors.password = t('Password is required');
    if (formData.password.length < 6) newErrors.password = t('Password must be at least 6 characters');
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = t('Passwords do not match');
    if (!formData.phone) newErrors.phone = t('Contact number is required');
    if (formData.phone.length !== 10) newErrors.phone = t('Contact number must be 10 digits');
    if (!formData.address) newErrors.address = t('Address is required');
    if (!formData.state) newErrors.state = t('State is required');
    if (!formData.district) newErrors.district = t('District is required');

    // Job Provider specific validations
    if (formData.role === 'jobProvider') {
      if (!formData.companyName) newErrors.companyName = t('Company name is required');
      if (!formData.companyType) newErrors.companyType = t('Company type is required');
      if (!formData.registrationNo) newErrors.registrationNo = t('Registration number is required');
      if (!formData.gstNo) newErrors.gstNo = t('GST number is required');
      if (!formData.companySector) newErrors.companySector = t('Company sector is required');
      if (!formData.companyAddress) newErrors.companyAddress = t('Company address is required');
    }

    // CSC specific validations
    if (formData.role === 'csc') {
      if (!formData.cscId) newErrors.cscId = t('CSC ID is required');
      if (!formData.cscType) newErrors.cscType = t('CSC type is required');
      if (!formData.registrationNo) newErrors.registrationNo = t('Registration number is required');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      console.log('Preparing registration data...');
      const userData = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        contactNo: formData.phone.trim(),
        address: formData.address.trim(),
        state: formData.state,
        district: formData.district,
        role: formData.role,
        ...(formData.role === 'jobProvider' && {
          companyName: formData.companyName?.trim(),
          companyType: formData.companyType,
          registrationNo: formData.registrationNo?.trim(),
          gstNo: formData.gstNo?.trim(),
          companySector: formData.companySector,
          address: formData.companyAddress.trim(),
        }),
        ...(formData.role === 'csc' && {
          cscId: formData.cscId?.trim(),
          cscType: formData.cscType,
          registrationNo: formData.registrationNo?.trim()
        })
      };

      // Remove any undefined or empty string values
      Object.keys(userData).forEach(key => {
        if (userData[key] === undefined || userData[key] === '') {
          delete userData[key];
        }
      });

      console.log('Submitting registration data:', userData);
      const result = await dispatch(register(userData)).unwrap();
      console.log('Registration successful:', result);
      setShowSuccess(true);
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.message || t('Registration failed. Please try again.'));
      setShowSuccess(false);
    } finally {
      setLoading(false);
    }
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
      <Container maxWidth="sm">
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
            {formData.role === 'jobProvider' ? t('Register as Job Provider') : t('Register as CSC Operator')}
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {showSuccess && (
            <Alert severity="success" sx={{ mb: 3 }}>
              {t('Registration successful! Redirecting to dashboard...')}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label={t('Name')}
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
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

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label={t('Email')}
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
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

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label={t('Password')}
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
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

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label={t('Confirm Password')}
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
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

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label={t('Contact Number')}
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  error={!!errors.phone}
                  helperText={errors.phone}
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
                <TextField
                  fullWidth
                  label={t('Address')}
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  error={!!errors.address}
                  helperText={errors.address}
                  required
                  multiline
                  rows={3}
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

              <Grid item xs={12} md={6}>
                <FormControl 
                  fullWidth
                  error={!!errors.state}
                >
                  <InputLabel>{t('State')}</InputLabel>
                  <Select
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    label={t('State')}
                    required
                  >
                    {STATES.map((state) => (
                      <MenuItem key={state} value={state}>
                        {state}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.state && <FormHelperText>{errors.state}</FormHelperText>}
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label={t('District')}
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
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

              {formData.role === 'jobProvider' && (
                <>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label={t('Company Name')}
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      error={!!errors.companyName}
                      helperText={errors.companyName}
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
                    <FormControl 
                      fullWidth
                      error={!!errors.companyType}
                    >
                      <InputLabel>{t('Company Type')}</InputLabel>
                      <Select
                        name="companyType"
                        value={formData.companyType}
                        onChange={handleChange}
                        label={t('Company Type')}
                        required
                      >
                        <MenuItem value="private">{t('Private Company')}</MenuItem>
                        <MenuItem value="public">{t('Public Sector')}</MenuItem>
                        <MenuItem value="ngo">{t('NGO')}</MenuItem>
                        <MenuItem value="other">{t('Other')}</MenuItem>
                      </Select>
                      {errors.companyType && <FormHelperText>{errors.companyType}</FormHelperText>}
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label={t('Registration Number')}
                      name="registrationNo"
                      value={formData.registrationNo}
                      onChange={handleChange}
                      error={!!errors.registrationNo}
                      helperText={errors.registrationNo}
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

                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label={t('GST Number')}
                      name="gstNo"
                      value={formData.gstNo}
                      onChange={handleChange}
                      error={!!errors.gstNo}
                      helperText={errors.gstNo}
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
                    <FormControl 
                      fullWidth
                      error={!!errors.companySector}
                    >
                      <InputLabel>{t('Company Sector')}</InputLabel>
                      <Select
                        name="companySector"
                        value={formData.companySector}
                        onChange={handleChange}
                        label={t('Company Sector')}
                        required
                      >
                        {COMPANY_SECTORS.map((sector) => (
                          <MenuItem key={sector} value={sector}>
                            {t(sector)}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.companySector && <FormHelperText>{errors.companySector}</FormHelperText>}
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label={t('Company Address')}
                      name="companyAddress"
                      value={formData.companyAddress}
                      onChange={handleChange}
                      error={!!errors.companyAddress}
                      helperText={errors.companyAddress}
                      required
                      multiline
                      rows={3}
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
                </>
              )}

              {formData.role === 'csc' && (
                <>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label={t('CSC ID')}
                      name="cscId"
                      value={formData.cscId}
                      onChange={handleChange}
                      error={!!errors.cscId}
                      helperText={errors.cscId}
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

                  <Grid item xs={12} md={6}>
                    <FormControl 
                      fullWidth
                      error={!!errors.cscType}
                    >
                      <InputLabel>{t('CSC Type')}</InputLabel>
                      <Select
                        name="cscType"
                        value={formData.cscType}
                        onChange={handleChange}
                        label={t('CSC Type')}
                        required
                      >
                        <MenuItem value="type1">{t('Type 1')}</MenuItem>
                        <MenuItem value="type2">{t('Type 2')}</MenuItem>
                        <MenuItem value="type3">{t('Type 3')}</MenuItem>
                      </Select>
                      {errors.cscType && <FormHelperText>{errors.cscType}</FormHelperText>}
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label={t('Registration Number')}
                      name="registrationNo"
                      value={formData.registrationNo}
                      onChange={handleChange}
                      error={!!errors.registrationNo}
                      helperText={errors.registrationNo}
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
                </>
              )}

              <Grid item xs={12}>
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
                  {loading ? <CircularProgress size={24} /> : t('Register')}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
      <Snackbar
        open={showSuccess}
        autoHideDuration={2000}
        onClose={() => setShowSuccess(false)}
        message={t('Registration successful!')}
      />
    </Box>
  );
}

export default RegisterProvider; 