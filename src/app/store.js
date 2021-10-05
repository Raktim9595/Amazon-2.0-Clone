import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "../slices/basketSlice";
import countReducer from "../slices/countSlice";

export const store = configureStore({
  reducer: {
    basket: basketReducer,
    count: countReducer
  },
});
