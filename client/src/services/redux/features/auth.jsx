import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { SIGN_IN, SIGN_OUT, AUTH } from "../../axios";

const initialState = {
  session: {
    user: null,
    token: null,
  },
  isLoading: false,
  message: null,
};

const SignIn = createAsyncThunk("Auth/SignIn", async (formData) => {
  try {
    return await SIGN_IN(formData).then((res) => res);
  } catch (error) {
    return error;
  }
});

const SignOut = createAsyncThunk("Auth/SignOut", async (id) => {
  try {
    return await SIGN_OUT(id).then((res) => res);
  } catch (error) {
    return error;
  }
});

const Auth = createAsyncThunk("Auth/UserControl", async () => {
  try {
    if (JSON.parse(localStorage.getItem("session")) && JSON.parse(localStorage.getItem("session")).token) {
      return await AUTH({
        token: JSON.parse(localStorage.getItem("session")).token,
      }).then((res) => res);
    }
    return { data: { token: null } };
  } catch (error) {
    return error;
  }
});

const AuthSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {},
  extraReducers: {
    [SignIn.pending]: (state) => {
      state.session.user = null;
      state.session.token = null;
      state.message = null;
      state.isLoading = true;
    },
    [SignIn.fulfilled]: (state, action) => {
      state.isLoading = false;
      if (action.payload.data.message) {
        state.message = action.payload.data.message;
      } else if (action.payload.data.error) {
        state.message = action.payload.data.error;
      } else {
        localStorage.setItem("session", JSON.stringify(action.payload.data));
        state.session = action.payload.data;
      }
    },
    [SignIn.rejected]: (state, action) => {
      state.isLoading = false;
      state.message = action.payload.error;
    },

    [Auth.fulfilled]: (state, action) => {
      if (action.payload.data.token) {
        state.session.user = action.payload.data.user;
        state.session.token = action.payload.data.token;
      }else{
        state.session.user = null;
        state.session.token = null;
        localStorage.getItem("session") && localStorage.removeItem("session");
      }
    },
    [Auth.rejected]: (state, action) => {
      state.message = action.payload.error;
    },

    [SignOut.fulfilled]: (state, action) => {
      if (action.payload.data.message) {
        state.session.user = null;
        state.session.token = null;
        state.message = null;
        state.isLoading = false;
        localStorage.removeItem("session");
      }
    },
    [SignOut.rejected]: (state, action) => {
      state.isLoading = false;
      state.message = action.payload.error;
    },
  },
});

export { SignIn, SignOut, Auth };

export default AuthSlice.reducer;
