import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StepState } from '@/redux/types';

const initialState: StepState = {
  steps: [],
  button: false,
};

const stepsSlice = createSlice({
  name: 'steps',
  initialState,
  reducers: {
    addStep: () => {
      
    },
    removeStep: () => {
      
    },
    updateStep: () => {
      
    }
  },
});

export const {
  addStep,
  removeStep,
  updateStep,
} = stepsSlice.actions;

export default stepsSlice.reducer;