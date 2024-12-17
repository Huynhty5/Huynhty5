import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  posts: [],
  postsEachUser: [],
};

export const fetchAllPost = createAsyncThunk(
  "apiPost/fetchAllPost",
  async (obj) => {
    const res = await axios.get("http://localhost:9999/api/post");
    return res.data.detail.posts;
  }
);

export const fetchAllPostEachUser = createAsyncThunk(
  "apiPost/fetchAllPostEachUser",
  async (id) => {
    const res = await axios.get(
      `http://localhost:9999/api/post/search/user/${id}`
    );
    return res.data.detail.post;
  }
);

export const addPost = createAsyncThunk(
  "apiPost/addPost",
  async (obj, thunkAPI) => {
    const res = await axios.put(`http://localhost:9999/api/post/`, obj);
    thunkAPI.dispatch(
      fetchAllPostEachUser(thunkAPI.getState().apiUser.user.id)
    );
    thunkAPI.dispatch(
      addCategoryPost({
        postId: res.data.detail.insertId,
        categoryList: obj.categories,
      })
    );
    return res.data;
  }
);

export const deletePost = createAsyncThunk(
  "apiPost/deletePost",
  async (id, thunkAPI) => {
    const res = await axios.delete(`http://localhost:9999/api/post/${id}`);
    thunkAPI.dispatch(fetchAllPost());
    thunkAPI.dispatch(
      fetchAllPostEachUser(thunkAPI.getState().apiUser.user.id)
    );
    toast.success("Xóa bài thành công !");
    return res.data;
  }
);

export const addCategoryPost = createAsyncThunk(
  "apiPost/addCategoryPost",
  async (obj, thunkAPI) => {
    const res = await axios.patch(
      `http://localhost:9999/api/category/categories`,
      obj
    );
    thunkAPI.dispatch(fetchAllPost());
    toast.success("Đăng bài thành công !");
    return res.data;
  }
);

export const updatePost = createAsyncThunk(
  "apiPost/updatePost",
  async (obj, thunkAPI) => {
    const res = await axios.patch(
      `http://localhost:9999/api/post/${obj.id}`,
      obj
    );
    thunkAPI.dispatch(fetchAllPost());
    thunkAPI.dispatch(
      fetchAllPostEachUser(thunkAPI.getState().apiUser.user.id)
    );
    toast.success("Sửa bài thành công !");
    return res.data;
  }
);

const apiPost = createSlice({
  name: "apiPost",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addPost.fulfilled, (state, action) => {
        console.log(action.payload);
      })
      .addCase(fetchAllPost.fulfilled, (state, action) => {
        state.posts = action.payload;
      })
      .addCase(fetchAllPostEachUser.fulfilled, (state, action) => {
        state.postsEachUser = action.payload;
      });
  },
});

export default apiPost.reducer;
