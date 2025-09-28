import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

const url = process.env.NEXT_PUBLIC_TELEE_BACKEND_URL as string;

interface Reservation {
  _id?: string;
  email: string;
  placeId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  token: string;
}

interface ReservationState {
  reservations: Reservation[];
  loading: boolean;
  error: string | null;
}

const initialState: ReservationState = {
  reservations: [],
  loading: false,
  error: null,
};

// ✅ Fetch reservations
export const fetchReservations = createAsyncThunk(
  'reservation/fetchReservations',
  async (email: string, thunkAPI) => {
    try {
      const res = await fetch(`/api/reservation?email=${email}`);
      if (!res.ok) throw new Error('Failed to fetch reservations');
      const data = await res.json();
      return data.reservations;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// ✅ Create reservation
export const createReservation = createAsyncThunk(
  'reservation/createReservation',
  async (
    {
      email,
      placeId,
      checkIn,
      checkOut,
      guests,
      token
    }: Omit<Reservation, '_id'>,
    { rejectWithValue }
  ) => {
    try {
      const res = await fetch(`${url}/api/reserve`
        , {
        
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
             Authorization: `Bearer ${token}`
         },
        body: JSON.stringify({ email, placeId, checkIn, checkOut, guests }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        return rejectWithValue(errorData.message || 'Reservation failed');
      }

      const data = await res.json();
      return data.reservation;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Something went wrong');
    }
  }
);

// ✅ Slice
const reservationSlice = createSlice({
  name: 'reservation',
  initialState,
  reducers: {
    clearReservations: (state) => {
      state.reservations = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch reservations
    builder.addCase(fetchReservations.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchReservations.fulfilled, (state, action: PayloadAction<Reservation[]>) => {
      state.reservations = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchReservations.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Create reservation
    builder.addCase(createReservation.fulfilled, (state, action: PayloadAction<Reservation>) => {
      state.reservations.push(action.payload);
    });
    builder.addCase(createReservation.rejected, (state, action) => {
      state.error = action.payload as string;
    });
  },
});

export const { clearReservations } = reservationSlice.actions;
export default reservationSlice.reducer;