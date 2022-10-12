import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

export const mySlice = createSlice({
  name: "mySlice",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = mySlice.actions;

export default mySlice.reducer;
