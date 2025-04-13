import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WorkSchedule {
  startTime: string;
  endTime: string;
  days: string[];
}

interface DietaryState {
  mealTimes: string[];
  shoppingFrequency: string;
  cookingFrequency: string;
  exerciseDuration: string;
  exerciseFrequency: string;
  workSchedules: WorkSchedule[];
}

const initialState: DietaryState = {
  mealTimes: [],
  shoppingFrequency: '',
  cookingFrequency: '',
  exerciseDuration: '',
  exerciseFrequency: '',
  workSchedules: [],
};

const dietarySlice = createSlice({
  name: 'dietary',
  initialState,
  reducers: {
    addMealTime: (state, action: PayloadAction<string>) => {
      state.mealTimes.push(action.payload);
    },
    removeMealTime: (state, action: PayloadAction<string>) => {
      state.mealTimes = state.mealTimes.filter(time => time !== action.payload);
    },
    setShoppingFrequency: (state, action: PayloadAction<string>) => {
      state.shoppingFrequency = action.payload;
    },
    setCookingFrequency: (state, action: PayloadAction<string>) => {
      state.cookingFrequency = action.payload;
    },
    setExerciseDuration: (state, action: PayloadAction<string>) => {
      state.exerciseDuration = action.payload;
    },
    setExerciseFrequency: (state, action: PayloadAction<string>) => {
      state.exerciseFrequency = action.payload;
    },
    addWorkSchedule: (state, action: PayloadAction<WorkSchedule>) => {
      state.workSchedules.push(action.payload);
    },
    removeWorkSchedule: (state, action: PayloadAction<number>) => {
      state.workSchedules.splice(action.payload, 1);
    },
    updateWorkScheduleDays: (state, action: PayloadAction<{ index: number; days: string[] }>) => {
      state.workSchedules[action.payload.index].days = action.payload.days;
    },
    resetDietaryInfo: (state) => {
      state.mealTimes = [];
      state.shoppingFrequency = '';
      state.cookingFrequency = '';
      state.exerciseDuration = '';
      state.exerciseFrequency = '';
      state.workSchedules = [];
    },
  },
});

export const { 
  addMealTime, 
  removeMealTime, 
  setShoppingFrequency, 
  setCookingFrequency,
  setExerciseDuration,
  setExerciseFrequency,
  addWorkSchedule,
  removeWorkSchedule,
  updateWorkScheduleDays,
  resetDietaryInfo 
} = dietarySlice.actions;

export default dietarySlice.reducer; 