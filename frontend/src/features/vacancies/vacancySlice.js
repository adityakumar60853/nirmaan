import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  vacancies: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Get all vacancies
export const getVacancies = createAsyncThunk(
  'vacancies/getAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/api/vacancies');
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create new vacancy
export const createVacancy = createAsyncThunk(
  'vacancies/create',
  async (vacancyData, thunkAPI) => {
    try {
      const response = await axios.post('/api/vacancies', vacancyData);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Apply for vacancy
export const applyForVacancy = createAsyncThunk(
  'vacancies/apply',
  async ({ vacancyId, userId }, thunkAPI) => {
    try {
      const response = await axios.post(`/api/vacancies/${vacancyId}/apply`, { userId });
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const vacancySlice = createSlice({
  name: 'vacancy',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getVacancies.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getVacancies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.vacancies = action.payload;
      })
      .addCase(getVacancies.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createVacancy.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createVacancy.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.vacancies.push(action.payload);
      })
      .addCase(createVacancy.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(applyForVacancy.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const index = state.vacancies.findIndex(v => v._id === action.payload._id);
        if (index !== -1) {
          state.vacancies[index] = action.payload;
        }
      });
  },
});

export const { reset } = vacancySlice.actions;
export default vacancySlice.reducer; 