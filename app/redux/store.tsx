import { configureStore } from '@reduxjs/toolkit';
import authPopupReducer from './slices/loginmodal/loginmodal';
import authReducer from './slices/authSkice.tsx/authSlice'; 
import reservationReducer from './slices/reserve/resBook'
export const store = configureStore({
  reducer: {
    authPopup: authPopupReducer,
    auth: authReducer, 
    reservation: reservationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
