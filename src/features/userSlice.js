import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const userTestObj = JSON.parse(localStorage.getItem("usertest"));
const isLoggedIn = userTestObj ? true : false;
const initialState = {
  isLoggedIn: isLoggedIn,
  user: userTestObj,
  status: "idle",
  error: null,
};

export const login = createAsyncThunk("/login", async (credential) => {
  const data = credential;
  //   console.log(data);
  localStorage.setItem("usertest", JSON.stringify(data));
  return data;
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    statusReset(state, action) {
      state.status = "idle";
    },
    logout(state, action) {
      localStorage.removeItem("usertest");
      state.isLoggedIn = false;
      state.user = null;
    },
  },
  extraReducers: {
    [login.pending]: (state, action) => {
      state.status = "loading";
    },
    [login.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    [login.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export const { statusReset, logout } = userSlice.actions;
export default userSlice.reducer;
