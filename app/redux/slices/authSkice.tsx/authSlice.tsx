import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

let token: string | null = null;
let user: User | null = null;

if (typeof window !== 'undefined') {
  token = localStorage.getItem('token');
  const storedUser = localStorage.getItem('user');
  user = storedUser ? JSON.parse(storedUser) : null;
}

const url = process.env.NEXT_PUBLIC_TELEE_BACKEND_URL as string;

// Types
interface User {
  _id: string;
  fullname: string;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  successMessage: string | null;
}

interface RegisterPayload {
  fullname: string;
  email: string;
  password: string;
}

interface LoginPayload {
  email: string;
  password: string;
}

interface EmailPayload {
  email: string;
}

interface ApiResponse<T> {
  success: boolean;
  token?: string;
  data?: T;
  message?: string;
}

interface OtpResponse {
  success: boolean;
  message: string;

}

interface SendOtpPayload {
  email: string;
}

interface VerifyOtpPayload {
  email: string;
  otp: string;

}

interface OtpState {
  loading: boolean;
  error: string | null;
  successMessage: string | null;
}

// Helpers
const storeCredentials = (token: string, user: User) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }
};

// Thunks
export const registerUser = createAsyncThunk<
  ApiResponse<User>,
  RegisterPayload,
  { rejectValue: string }
>('auth/register', async ({ fullname, email, password }, { rejectWithValue }) => {
  try {
    const response = await axios.post<ApiResponse<User>>(`${url}/api/register`, {
      fullname,
      email,
      password,
    });

    if (response.data.success && response.data.token && response.data.data) {
      storeCredentials(response.data.token, response.data.data);
      return response.data;
    } else {
      return rejectWithValue(response.data.message || 'Registration failed');
    }
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || error.message || 'Registration failed');
  }
});

export const loginUser = createAsyncThunk<
  ApiResponse<User>, // or fix this type
  LoginPayload,
  { rejectValue: string }
>('auth/login', async (body, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${url}/api/login`, body, {
      headers: { 'Content-Type': 'application/json' },
    });

    const { success, token, user, message } = response.data;

    if (success && token && user) {
      storeCredentials(token, user);

      return {
        success,
        token,
        data: user, 
        message,
      };
    } else {
      return rejectWithValue(message || 'Login failed');
    }
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || error.message || 'Login failed');
  }
});


export const emailCheck = createAsyncThunk<
  ApiResponse<User>,
  EmailPayload,
  { rejectValue: string }
>('auth/emailCheck', async (body, { rejectWithValue }) => {
  try {
    const response = await axios.post<ApiResponse<User>>(`${url}/api/email-check`, body, {
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.data.success) {
      return response.data;
    } else {
      return rejectWithValue(response.data.message || 'Email check failed');
    }
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || error.message || 'Email check failed');
  }
});

export const sendOtp = createAsyncThunk<
  OtpResponse,
  SendOtpPayload,
  { rejectValue: string }
>('otp/sendOtp', async ({ email }, { rejectWithValue }) => {
  try {
    const response = await axios.post<OtpResponse>(`${url}/api/send-otp`, { email }, {
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.data.success) {
      return response.data;
    } else {
      return rejectWithValue(response.data.message || 'Sending OTP failed');
    }
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || error.message || 'Sending OTP failed');
  }
});

export const verifyOtp = createAsyncThunk<
  OtpResponse,
  VerifyOtpPayload,
  { rejectValue: string }
>('otp/verifyOtp', async ({ email, otp }, { rejectWithValue }) => {
  try {
    const response = await axios.post<OtpResponse>(`${url}/api/verify-otp`, { email, otp }, {
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.data.success) {
      return response.data;
    } else {
      return rejectWithValue(response.data.message || 'OTP verification failed');
    }
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || error.message || 'OTP verification failed');
  }
});


// Initial State
const initialState: AuthState = {
  user,
  token,
  isAuthenticated: !!token,
  loading: false,
  successMessage: null,
  error: null,
};

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    },
    setToken(state, action: PayloadAction<string | null>) {
      state.token = action.payload;
      state.isAuthenticated = !!action.payload;
      if (typeof window !== 'undefined') {
        if (action.payload) {
          localStorage.setItem('token', action.payload);
        } else {
          localStorage.removeItem('token');
        }
      }
    },
     clearMessages(state) {
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: builder => {
    // login
    builder.addCase(loginUser.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.token = action.payload.token || null;
      state.user = action.payload.data || null;
      state.isAuthenticated = !!action.payload.token;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Login failed';
    });

    // register
    builder.addCase(registerUser.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.token = action.payload.token || null;
      state.user = action.payload.data || null;
      state.isAuthenticated = !!action.payload.token;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Registration failed';
    });

    // email check
    builder.addCase(emailCheck.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(emailCheck.fulfilled, (state, action) => {
    state.loading = false;
    state.user = action.payload.data || null;
    state.isAuthenticated = !!action.payload.data;
    });

    builder.addCase(emailCheck.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Email check failed';
    });

     // send OTP
    builder.addCase(sendOtp.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.successMessage = null;
    });
    builder.addCase(sendOtp.fulfilled, (state, action) => {
      state.loading = false;
      state.successMessage = action.payload.message;
    });
    builder.addCase(sendOtp.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Sending OTP failed';
    });

    // verify OTP
    builder.addCase(verifyOtp.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.successMessage = null;
    });
    builder.addCase(verifyOtp.fulfilled, (state, action) => {
      state.loading = false;
      state.successMessage = action.payload.message;
    });
    builder.addCase(verifyOtp.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || 'OTP verification failed';
    });
  },
});

export const { logout, setToken, clearMessages } = authSlice.actions;
export default authSlice.reducer;