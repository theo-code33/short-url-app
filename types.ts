export type UserConnect = {
  email: string;
  password: string;
};

export type UserCreate = {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  passwordConfirm: string;
};

export type User = {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
  urls: Url[];
  apiKeys: ApiKey[];
};

export type UserUpdate = {
  email: string;
  firstname: string;
  lastname: string;
};

export type Url = {
  id: number;
  baseUrl: string;
  slug: string;
  user: User;
  clicks: number;
  lastCreated?: boolean;
};

export type ApiKey = {
  id: number;
  apiKey: string;
  user: User;
};

export type UserCtx = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
};

export type Token = {
  email: string;
  exp: number;
  iat: number;
};
