import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { IUser, IUsersState } from "../../types/users";
import {
  fetchRandomUsers,
  saveUser,
  updateUser,
  deleteUser,
} from "../../services/users";

const generalErrorMessage = "Something went wrong";

const initialState: IUsersState = {
  users: [],
  isLoading: false,
  error: "",
};

export const getRandomUsers = createAsyncThunk("users/fetch", async () => {
  return await fetchRandomUsers();
});

export const saveRandomUser = createAsyncThunk(
  "users/saveRandomUser",
  async (newUser: IUser) => {
    return await saveUser(newUser);
  }
);

export const updateRandomUserOnServer = createAsyncThunk(
  "users/updateRandomUserOnServer",
  async (user: IUser) => {
    return await updateUser(user);
  }
);

export const deleteRandomUserOnServer = createAsyncThunk(
  "users/deleteRandomUserOnServer",
  async (userId: IUser["_id"]) => {
    return await deleteUser(userId);
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    updateRandomUser: (state, action: PayloadAction<IUser>) => {
      const updatedUser = action.payload;
      const index = state.users.findIndex(
        (user) => user.uuid === updatedUser.uuid
      );

      if (index >= 0) {
        state.users[index] = updatedUser;
      }
    },
    deleteRandomUser: (state, action: PayloadAction<IUser["uuid"]>) => {
      const userId = action.payload;

      state.users = state.users.filter((user) => user._id !== userId);
    },
  },
  extraReducers: (builder) => {
    builder
      // FETCH RANDOM USERS
      .addCase(getRandomUsers.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(getRandomUsers.fulfilled, (state, action) => {
        const mappedUsers: IUser[] = action.payload.map((result) => {
          const { login, name, gender, dob, phone, email, location, picture } =
            result;
          const { uuid } = login;
          const { title, first, last } = name;
          const { date, age } = dob;
          const { street, city, state, country } = location;
          const { thumbnail, large } = picture;

          const fullname = `${title} ${first} ${last}`;
          const yearOfBirth = new Date(date).getFullYear();

          return {
            uuid,
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
        state.error = action.error.message || generalErrorMessage;
      })
      // ADD NEW USER
      .addCase(saveRandomUser.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(saveRandomUser.fulfilled, (state, action) => {
        const newUser = action.payload;
        const index = state.users.findIndex(
          (user) => user.uuid === newUser.uuid
        );

        if (index >= 0) {
          state.users[index].isSaved = true;
        }

        state.isLoading = false;
      })
      .addCase(saveRandomUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || generalErrorMessage;
      })
      // UPDATE USER
      .addCase(updateRandomUserOnServer.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(updateRandomUserOnServer.fulfilled, (state, action) => {
        const updatedUser = action.payload;
        const index = state.users.findIndex(
          (user) => user._id === updatedUser._id
        );

        if (index >= 0) {
          state.users[index] = updatedUser;
        }

        state.isLoading = false;
      })
      .addCase(updateRandomUserOnServer.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || generalErrorMessage;
      })
      // DELETE USER
      .addCase(deleteRandomUserOnServer.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(deleteRandomUserOnServer.fulfilled, (state, action) => {
        const userId = action.payload;

        state.users = state.users.filter((user) => user._id !== userId);

        state.isLoading = false;
      })
      .addCase(deleteRandomUserOnServer.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || generalErrorMessage;
      });
  },
});

export const usersActions = usersSlice.actions;

export default usersSlice.reducer;
