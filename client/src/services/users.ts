import axios from "axios";

import apiClient from "../api-client";

import { IUser } from "../types/users";

const route = "/users";

export const fetchRandomUsers = async () => {
  const response = await axios.get("https://randomuser.me/api/?results=10");

  return response.data.results;
};

export const fetchHistory = async () => {
  const response = await apiClient.get<IUser[]>(route);

  console.log({ response });

  return response.data;
};

export const saveUser = async (userData: IUser) => {
  const response = await apiClient.post<IUser>(route, userData);

  return response.data;
};

export const updateUser = async (userData: IUser): Promise<IUser> => {
  const response = await apiClient.put<IUser>(`${route}/${userData._id}`, {
    fullname: userData.fullname,
  });

  return response.data;
};

export const deleteUser = async (
  userId: IUser["_id"]
): Promise<IUser["_id"]> => {
  const response = await apiClient.delete<IUser["_id"]>(`${route}/${userId}`);

  return response.data;
};
