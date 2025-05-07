import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  cscData: null,
  volunteers: [],
  programs: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Get CSC data
export const getCSCData = createAsyncThunk(
  'csc/getData',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/api/csc');
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Register as volunteer
export const registerVolunteer = createAsyncThunk(
  'csc/registerVolunteer',
  async (volunteerData, thunkAPI) => {
    try {
      const response = await axios.post('/api/csc/volunteers', volunteerData);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create CSC program
export const createProgram = createAsyncThunk(
  'csc/createProgram',
  async (programData, thunkAPI) => {
    try {
      const response = await axios.post('/api/csc/programs', programData);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const cscSlice = createSlice({
  name: 'csc',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCSCData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCSCData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cscData = action.payload;
        state.volunteers = action.payload.volunteers;
        state.programs = action.payload.programs;
      })
      .addCase(getCSCData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(registerVolunteer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.volunteers.push(action.payload);
      })
      .addCase(createProgram.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.programs.push(action.payload);
      });
  },
});

export const { reset } = cscSlice.actions;
export default cscSlice.reducer; 