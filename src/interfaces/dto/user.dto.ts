export interface IUserDto {
  id: string;
  username: string;
  role: string;
  createAt: string;
}

export interface IRegisterUserDto {
  roleId: string;
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export interface IResetPasswordDto {
  userId: string;
  oldPassword: string;
  password: string;
  confirmation: string;
}
