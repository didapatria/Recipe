import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { Step, StepState } from '@/redux/types';

const initialState: StepState = {
  steps: [],
  description: '',
  buttonStep: {},
  inputStep: {},
};

const stepsSlice = createSlice({
  name: 'steps',
  initialState,
  reducers: {
    addStep: (state, action: PayloadAction<Step>) => {
      const id = nanoid()
      state.steps.push({
        ...action.payload,
        id,
      });
    },
    descriptionStep: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
    showButtonStep: () => {
      
    },
    showInputStep: () => {
      
    },
    updateStep: () => {
      
    },
    removeStep: () => {
      
    },
  },
});

export const {
  addStep,
  descriptionStep,
  showButtonStep,
  showInputStep,
  updateStep,
  removeStep,
} = stepsSlice.actions;

export default stepsSlice.reducer;