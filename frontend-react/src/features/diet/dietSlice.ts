import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DietFormData {
  sexo: string;
  edad: string;
  peso: string;
  estatura: string;
  actividad: string;
}

interface DietState {
  formData: DietFormData;
  dieta: any[];
  loading: boolean;
  error: string | null;
}

const initialState: DietState = {
  formData: {
    sexo: '',
    edad: '',
    peso: '',
    estatura: '',
    actividad: '',
  },
  dieta: [],
  loading: false,
  error: null,
};

const dietSlice = createSlice({
  name: 'diet',
  initialState,
  reducers: {
    setFormData: (state, action: PayloadAction<Partial<DietFormData>>) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    setDieta: (state, action: PayloadAction<any[]>) => {
      state.dieta = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setFormData, setDieta, setLoading, setError } = dietSlice.actions;
export default dietSlice.reducer; 