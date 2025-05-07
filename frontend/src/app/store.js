import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import courseReducer from '../features/courses/courseSlice';
import vacancyReducer from '../features/vacancies/vacancySlice';
import cscReducer from '../features/csc/cscSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    courses: courseReducer,
    vacancies: vacancyReducer,
    csc: cscReducer,
  },
}); 