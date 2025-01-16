import moment from "moment";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL =
  "https://66ab8757636a4840d7cb10b6.mockapi.io/interview_Scheduler";

export const fetchBookings = createAsyncThunk(
  "bookings/fetchBookings",
  async () => {
    try {
      const response = await fetch(API_URL);
      const dataResponse = await response.json();

      return dataResponse;
    } catch (error) {
      return error;
    }
  }
);

export const addBooking = createAsyncThunk(
  "bookings/addBooking",
  async (newBooking) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBooking),
      });
      return response;
    } catch (error) {
      return alert("same Booking error");
    }
  }
);

export const updateBooking = createAsyncThunk(
  "bookings/updateBooking",
  async ({ id, data }) => {
    console.log(data);
    const response = await fetch(
      `https://66ab8757636a4840d7cb10b6.mockapi.io/interview_Scheduler/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    try {
      const result = await response.json();
      return result;
    } catch (error) {
      return (error);
    }
  }
);

export const deleteBooking = createAsyncThunk(
  "bookings/deleteBooking",
  async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      return;
    } catch (error) {
      return alert("Delete same Error");
    }
  }
);

const bookingsSlice = createSlice({
  name: "bookings",
  initialState: {
    items: [],
    status: "",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookings.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addBooking.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateBooking.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(deleteBooking.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      });
  },
});

export default bookingsSlice.reducer;
