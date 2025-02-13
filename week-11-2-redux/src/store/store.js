import {configureStore} from "@reduxjs/toolkit";
import conterSlice from "./slices/counterSlice";

const store = configureStore({
  reducer: {
    counter: conterSlice,
  }
});

export default store;