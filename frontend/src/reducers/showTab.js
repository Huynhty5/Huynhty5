import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  showTab: "home",
};

const showTab = createSlice({
  name: "showTab",
  initialState,
  reducers: {
    saveTab(state, action) {
      state.showTab = action.payload;
    },
  },
});

export const { saveTab } = showTab.actions;

export default showTab.reducer;
