import { configureStore } from "@reduxjs/toolkit";
import componentsSlice from "./slices/componentsSlice";
import counterSlice from "./slices/counterSlice";

export default configureStore({
  reducer: {
    counter: counterSlice,
    componentsrender: componentsSlice,
  },
});
