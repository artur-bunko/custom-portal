export interface LoginProvider {
  auth(loginParams: { email: string; username: string; password: string }): Promise<boolean>;
}
