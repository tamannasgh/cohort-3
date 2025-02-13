import {createSlice} from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: 0,
  reducers: {
    incCount(state, action) {
      return state += 1;
    },
    decCount(state, action) {
      return state -= 1;
    },
    makeCount(state, action) {
      return state = Number(action.payload);

    }
  }
});

export const {incCount, decCount, makeCount} = counterSlice.actions;
export default counterSlice.reducer;


