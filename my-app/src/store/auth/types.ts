export type AuthType = string | null;

export interface Auth {
  accessToken: AuthType;
  token: AuthType;
  user: any;
  loggedIn: boolean;
}
