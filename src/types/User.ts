export interface User {
  name: string;
  email: string;
  password: string;
}

export interface UserDTO extends User {
  userId: string;
  isActivated: boolean;
}
