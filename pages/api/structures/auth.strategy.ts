import { LoginProvider } from '../../typings/interfaces/login.provider';

export interface AuthStrategy {
  login(loginParams: { email: string; password: string }): Promise<void>;
}

export class AuthStrategyImpl implements AuthStrategy {
  constructor(private readonly loginProviders: LoginProvider[]) {}

  async login(loginParams: { email: string; password: string }) {
    const providersAsync = this.loginProviders.map((loginProvider) =>
      loginProvider.auth(loginParams),
    );

    await Promise.all(providersAsync);
  }
}
