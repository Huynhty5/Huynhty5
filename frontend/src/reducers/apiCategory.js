import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchAllPost } from "./apiPost";

const initialState = {
  categories: [],
};

// Lấy tất cả danh mục
export const fetchAllCategory = createAsyncThunk(
  "apiCategory/fetchAllCategory",
  async () => {
    const res = await axios.get("http://localhost:9999/api/category");
    return res.data;
  }
);

// Thêm danh mục
export const createCategory = createAsyncThunk(
  "apiCategory/createCategory",
  async (category, ThunkAPI) => {
    const res = await axios.post(
      "http://localhost:9999/api/category",
      category
    );
    ThunkAPI.dispatch(fetchAllCategory());
    return res.data;
  }
);

// Sửa danh mục
export const updateCategory = createAsyncThunk(
  "apiCategory/updateCategory",
  async ({ id, title, description }, ThunkAPI) => {
    const res = await axios.put(`http://localhost:9999/api/category/${id}`, {
      title,
      description,
    });
    ThunkAPI.dispatch(fetchAllCategory());
    return res.data;
  }
);

// Xóa danh mục
export const deleteCategory = createAsyncThunk(
  "apiCategory/deleteCategory",
  async (id, ThunkAPI) => {
    const res = await axios.delete(`http://localhost:9999/api/category/${id}`);
    ThunkAPI.dispatch(fetchAllCategory());
    return res.data;
  }
);

// Cập nhật danh mục liên quan đến bài viết
export const updateCategoryPost = createAsyncThunk(
  "apiCategory/updateCategoryPost",
  async (obj, ThunkAPI) => {
    const res = await axios.patch(
      "http://localhost:9999/api/category/categories",
      obj
    );
    ThunkAPI.dispatch(fetchAllPost());
    return res.data;
  }
);

const apiCategory = createSlice({
  name: "apiCategory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCategory.fulfilled, (state, action) => {
        state.categories = action.payload.detail;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        console.log("Category created successfully");
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        console.log("Category updated successfully");
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        console.log("Category deleted successfully");
      });
  },
});

export default apiCategory.reducer;
