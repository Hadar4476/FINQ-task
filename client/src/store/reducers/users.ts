import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { IUsersState } from "../../types/users";
import { fetchRandomUsers } from "../../services/users";

const initialState: IUsersState = {
  users: [],
  isLoading: false,
  error: "",
};

export const getRandomUsers = createAsyncThunk("users/fetch", async () => {
  return await fetchRandomUsers();
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRandomUsers.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(getRandomUsers.fulfilled, (state, action) => {
        const mappedUsers = action.payload.results.map((result) => {
          const { name, gender, dob, phone, email, location, picture } = result;
          const { title, first, last } = name;
          const { date, age } = dob;
          const { street, city, state, country } = location;
          const { thumbnail, large } = picture;

          const fullname = `${title} ${first} ${last}`;
          const yearOfBirth = new Date(date).getFullYear();

          return {
            fullname,
            gender,
            age,
            yearOfBirth,
            phoneNumber: phone,
            email,
            address: {
              street,
              city,
              state,
              country,
            },
            picture: {
              thumbnail,
              large,
            },
          };
        });

        state.users = mappedUsers;
        state.isLoading = false;
      })
      .addCase(getRandomUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default usersSlice.reducer;
