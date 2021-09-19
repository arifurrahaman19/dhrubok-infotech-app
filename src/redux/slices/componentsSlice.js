import { createSlice } from "@reduxjs/toolkit";

export const componentsSlice = createSlice({
  name: "componentsRender",
  initialState: {
    isActive: false,
  },

  reducers: {
    setIsActive: (state, action) => {
      state.isActive = action.payload;
    },
  },
});

export const { setIsActive } = componentsSlice.actions;
export default componentsSlice.reducer;
