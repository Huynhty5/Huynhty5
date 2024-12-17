import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const storedUser = JSON.parse(localStorage.getItem("userBlog"));

const initialState = {
  users: [],
  user: storedUser || null, // Set user from localStorage if available
  error: null,
};

// Thunk to fetch all users
export const fetchAllUser = createAsyncThunk(
  "apiUser/fetchAllUser",
  async () => {
    const res = await axios.get("http://localhost:9999/api/user");
    return res.data;
  }
);

export const loginUser = createAsyncThunk(
  "apiUser/loginUser",
  async (obj, { rejectWithValue }) => {
    try {
      const res = await axios.post("http://localhost:9999/api/user", obj);
      const userData = res.data.detail;
      if (userData == null || userData.password == false) {
        toast.error("Username hoặc mật khẩu không đúng !");
        return;
      }
      toast.success("Đăng nhập thành công !");
      localStorage.setItem("userBlog", JSON.stringify(userData)); // Save to localStorage
      return userData;
    } catch (error) {
      return rejectWithValue(error.response.data); // Return error if login fails
    }
  }
);

export const signupUser = createAsyncThunk(
  "apiUser/signupUser",
  async (obj, { rejectWithValue }) => {
    try {
      const res = await axios.put("http://localhost:9999/api/user", obj);
      toast.success("Đăng ký thành công !");
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateUser = createAsyncThunk(
  "apiUser/updateUser",
  async (obj, thunkAPI) => {
    try {
      const res = await axios.patch("http://localhost:9999/api/user", obj);
      toast.success("Cập nhật thành công !");
      localStorage.setItem("userBlog", JSON.stringify(obj)); // Save to localStorage
      thunkAPI.dispatch(fetchAllUser());
      return obj;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "apiUser/deleteUser",
  async (id, thunkAPI) => {
    try {
      const res = await axios.delete(`http://localhost:9999/api/user/${id}`);
      toast.success("Xóa thành công !");
      thunkAPI.dispatch(fetchAllUser());
    } catch (error) {
      console.log(error);
    }
  }
);

const apiUser = createSlice({
  name: "apiUser",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem("userBlog"); // Remove user data from localStorage
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUser.fulfilled, (state, action) => {
        state.users = action.payload.detail;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null; // Clear any previous error
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload; // Store error if login fails
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const { logoutUser } = apiUser.actions;

export default apiUser.reducer;
