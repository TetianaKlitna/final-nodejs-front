export interface User {
  name: string;
  email: string;
  password: string;
}

export interface TaskDTO extends User {
  userId: string;
  isActivated: boolean;
}
