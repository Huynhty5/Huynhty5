import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  postLiked: [],
};

export const fetchPostLiked = createAsyncThunk(
  "apiLike/fetchPostLiked",
  async (user_id, obj) => {
    const res = await axios.get(
      `http://localhost:9999/api/like/user/${user_id}`
    );
    return res.data;
  }
);

export const likePost = createAsyncThunk(
  "apiLike/likePost",
  async (obj, thunkAPI) => {
    const res = await axios.put(`http://localhost:9999/api/like/`, obj);
    thunkAPI.dispatch(fetchPostLiked(obj.userId));
    toast.success("Bạn đã thích bài viết !");
    return res.data;
  }
);

export const unlikePost = createAsyncThunk(
  "apiLike/unlikePost",
  async (obj, thunkAPI) => {
    const config = {
      method: "DELETE",
      url: `http://localhost:9999/api/like/`,
      data: obj,
    };

    try {
      const res = await axios(config);
      thunkAPI.dispatch(fetchPostLiked(obj.userId));
      toast.success("Bạn đã bỏ thích bài viết!");
      return res.data;
    } catch (error) {
      toast.error("Có lỗi xảy ra khi bỏ thích bài viết!");
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const apiLike = createSlice({
  name: "apiLike",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPostLiked.fulfilled, (state, action) => {
      state.postLiked = action.payload.detail;
    });
  },
});

export default apiLike.reducer;
