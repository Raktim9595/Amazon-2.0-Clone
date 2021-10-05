import { createSlice } from "@reduxjs/toolkit";
const initialState = { 
  value: 400,
}

export const countSlice = createSlice({
  name: "count",
  initialState,
  reducers: {
    increaseCount: (state, _) => {
      state.value = state.value + 1;
    }
  }
});

export const {increaseCount} = countSlice.actions;
export const selectCountValue = (state) => state.count.value;
export default countSlice.reducer;