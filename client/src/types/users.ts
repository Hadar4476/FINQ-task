export interface IUser {
  _id?: string;
  uuid: string;
  fullname: string;
  gender: string;
  age: number;
  yearOfBirth: number;
  phoneNumber: string;
  email: string;
  address: {
    street: {
      number: number;
      name: string;
    };
    city: string;
    state: string;
    country: string;
  };
  picture: {
    thumbnail: string;
    large: string;
  };
  isSaved: boolean;
}

export interface IUsersState {
  users: IUser[];
  isLoading: boolean;
  error: string;
}
