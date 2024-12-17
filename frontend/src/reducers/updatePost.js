import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  updatePost: {},
};

const updatePost = createSlice({
  name: "updatePost",
  initialState,
  reducers: {
    setUpdatePost(state, action) {
      state.updatePost = action.payload;
    },
  },
});

export const { setUpdatePost } = updatePost.actions;

export default updatePost.reducer;
