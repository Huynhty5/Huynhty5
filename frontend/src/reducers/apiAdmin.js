import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const storedUserAmin = JSON.parse(localStorage.getItem("adminBlog"));

const initialState = {
  admin: storedUserAmin || null, // Set admin from localStorage if available
};

export const loginAdmin = createAsyncThunk(
  "apiAdmin/loginAdmin",
  async (obj, { rejectWithValue }) => {
    try {
      const res = await axios.post("http://localhost:9999/api/admin", obj);
      const adminData = res.data.detail;
      if (adminData == null || adminData.password == false) {
        toast.error("Username hoặc mật khẩu không đúng !");
        return;
      }
      toast.success("Đăng nhập thành công !");
      localStorage.setItem("adminBlog", JSON.stringify(adminData)); // Save to localStorage
      return adminData;
    } catch (error) {
      return rejectWithValue(error.response.data); // Return error if login fails
    }
  }
);

export const updateAdmin = createAsyncThunk(
  "apiAdmin/updateAdmin",
  async (obj, { rejectWithValue }) => {
    try {
      const res = await axios.patch("http://localhost:9999/api/admin", obj);
      console.log(res.data);
      localStorage.setItem("adminBlog", JSON.stringify(obj)); // Save to localStorage
      toast.success("cập nhật thành công !");
      return obj;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const apiAdmin = createSlice({
  name: "apiAdmin",
  initialState,
  reducers: {
    logoutAdmin: (state) => {
      state.admin = null;
      localStorage.removeItem("adminBlog"); // Remove admin data from localStorage
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.admin = action.payload;
        state.error = null; // Clear any previous error
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.error = action.payload; // Store error if login fails
      })

      .addCase(updateAdmin.fulfilled, (state, action) => {
        state.admin = action.payload;
      });
  },
});

export const { logoutAdmin } = apiAdmin.actions;

export default apiAdmin.reducer;
