import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { fetchAllPost, fetchAllPostEachUser } from "./apiPost";

const initialState = {
  commentsEachPost: [],
};

export const addComment = createAsyncThunk(
  "apiComment/addComment",
  async (obj, thunkAPI) => {
    const res = await axios.put(`http://localhost:9999/api/comment/`, obj);
    thunkAPI.dispatch(fetchAllPost());
    if (obj.userIdOther) {
      thunkAPI.dispatch(fetchAllPostEachUser(obj.userIdOther));
    }
    toast.success("Bạn đã bình luận bài viết !");
    return res.data;
  }
);

export const deleteComment = createAsyncThunk(
  "apiComment/deleteComment",
  async (obj, thunkAPI) => {
    const res = await axios.delete(
      `http://localhost:9999/api/comment/${obj.id}`
    );
    thunkAPI.dispatch(fetchAllPost());
    if (obj.userIdOther) {
      thunkAPI.dispatch(fetchAllPostEachUser(obj.userIdOther));
    }
    toast.success("Bạn đã xóa bình luận !");
    return res.data;
  }
);

export const updateComment = createAsyncThunk(
  "apiComment/updateComment",
  async (obj, thunkAPI) => {
    const res = await axios.patch(
      `http://localhost:9999/api/comment/${obj.id}`,
      obj
    );
    thunkAPI.dispatch(fetchAllPost());
    if (obj.userIdOther) {
      thunkAPI.dispatch(fetchAllPostEachUser(obj.userIdOther));
    }
    toast.success("Bạn đã sửa bình luận !");
    return res.data;
  }
);

const apiComment = createSlice({
  name: "apiComment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default apiComment.reducer;
