export interface IUser {
  _id?: string;
  email: string;
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  roleId: string;
  phone?: number;
  age?: number;
}

export interface IRole {
  _id?: string;
  name: string;
}
