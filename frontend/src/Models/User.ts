export type LoggedUserDto = {
  name: string;
  surname: string;
  email: string;
  roles: string[];
};

export type LoginDto = {
  email: string;
  password: string;
};

export type RegisterDto = {
  name: string;
  surname: string;
  email: string;
  password: string;
  repeatPassword: string;
};