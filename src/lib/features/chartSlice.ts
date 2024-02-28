// chartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ChartState {
  data: number[];
}

// Check local storage for saved data
const storedData = typeof window !== 'undefined' ? localStorage.getItem('chartData') : null;
const initialState: ChartState = {
  data: storedData ? JSON.parse(storedData) : [1, 1, 1, 1, 1, 1, 1],
};

export const chartSlice = createSlice({
  name: 'chart',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<number[]>) => {
      state.data = action.payload;
      // Save data to local storage
      if (typeof window !== 'undefined') {
        localStorage.setItem('chartData', JSON.stringify(action.payload));
      }
    },
    resetData: (state) => {
      state.data = [1, 1, 1, 1, 1, 1, 1];
      // Reset local storage to initial data
      if (typeof window !== 'undefined') {
        localStorage.setItem('chartData', JSON.stringify(state.data));
      }
    },
  },
});

export const { setData, resetData } = chartSlice.actions;

export default chartSlice.reducer;
