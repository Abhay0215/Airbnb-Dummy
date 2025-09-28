import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthPopupState {
  isOpen: boolean;
  isLogin: boolean;
  isLog: boolean;
  isOpenEmailPassword: boolean;
  isOpenRegister:boolean;
}

const initialState: AuthPopupState = {
  isOpen: false,
  isLogin: true,
  isLog: false,
  isOpenEmailPassword: false,
  isOpenRegister:false,
};


const authPopupSlice = createSlice({
  name: 'authPopup',
  initialState,
  reducers: {
    openPopup: (state, action: PayloadAction<boolean>) => {
      state.isOpen = true;
      state.isLogin = action.payload;
    },
    closePopup: (state) => {
      state.isOpen = false;
    },
    openPopupEmailPassword: (state) => {
      state.isOpenEmailPassword = true;
    },
    closePopupEmailPassword: (state) => {
      state.isOpenEmailPassword = false;
    },
    openPopupRegister: (state) => {
      state.isOpenRegister = true;
    },
    closePopupRegister: (state) => {
      state.isOpenRegister = false;
    },
    toggleLoginMode: (state, action: PayloadAction<boolean>) => {
      state.isLogin = action.payload;
    },
    openProfile: (state, action: PayloadAction<boolean>) => {
      state.isLog = true;
      state.isLogin = action.payload;
    },
    closeProfile: (state) => {
      state.isLog = false;
    },
  },
});

export const { openPopup, closePopup, toggleLoginMode,openProfile ,
              closeProfile, closePopupEmailPassword,
              openPopupEmailPassword, closePopupRegister, openPopupRegister
            } = authPopupSlice.actions;

export default authPopupSlice.reducer;
