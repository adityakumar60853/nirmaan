import React, { useState, useEffect } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  TablePagination,
  CircularProgress,
  Alert,
  Typography
} from '@mui/material';
import { useLanguage } from '../context/LanguageContext';

// Dummy data for testing - replace with API call
const DUMMY_APPLICANTS = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    contactNumber: '+91 9876543210',
    location: 'Mumbai, Maharashtra',
    skills: ['React', 'Node.js', 'MongoDB'],
    experience: '3 years'
  },
  // Add more dummy data as needed
];

const Applicants = () => {
  const { t } = useLanguage();
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    // Simulating API call with dummy data
    const fetchApplicants = async () => {
      try {
        // Replace with actual API call
        setApplicants(DUMMY_APPLICANTS);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchApplicants();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredApplicants = applicants.filter((applicant) => {
    const searchString = searchTerm.toLowerCase();
    return (
      applicant.name.toLowerCase().includes(searchString) ||
      applicant.email.toLowerCase().includes(searchString) ||
      applicant.location.toLowerCase().includes(searchString) ||
      applicant.skills.some(skill => skill.toLowerCase().includes(searchString)) ||
      applicant.experience.toLowerCase().includes(searchString)
    );
  });

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box m={2}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', p: 2 }}>
      <Typography variant="h4" gutterBottom>
        {t('Applicants')}
      </Typography>
      
      <TextField
        fullWidth
        label={t('Search applicants')}
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchChange}
        sx={{ mb: 2 }}
      />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="applicants table">
          <TableHead>
            <TableRow>
              <TableCell>{t('Name')}</TableCell>
              <TableCell>{t('Email')}</TableCell>
              <TableCell>{t('Contact Number')}</TableCell>
              <TableCell>{t('Location')}</TableCell>
              <TableCell>{t('Skills')}</TableCell>
              <TableCell>{t('Experience')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredApplicants
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((applicant) => (
                <TableRow key={applicant.id}>
                  <TableCell>{applicant.name}</TableCell>
                  <TableCell>{applicant.email}</TableCell>
                  <TableCell>{applicant.contactNumber}</TableCell>
                  <TableCell>{applicant.location}</TableCell>
                  <TableCell>{applicant.skills.join(', ')}</TableCell>
                  <TableCell>{applicant.experience}</TableCell>
                </TableRow>
              ))}
            {filteredApplicants.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  {t('No applicants found')}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredApplicants.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default Applicants; 