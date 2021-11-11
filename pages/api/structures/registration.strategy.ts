import UserDTO from '../../../typings/types/userDTO';
import RegistrationProvider from '../../../typings/interfaces/registration.provider';
import RegistrationStrategy from '../../../typings/interfaces/registration.strategy';

export class RegistrationStrategyImp implements RegistrationStrategy {
  constructor(private readonly registrationProviders: RegistrationProvider[]) {}

  async register(user: UserDTO): Promise<{
    localstorage: Record<string, string>,
    cookies: string
  }> {
    let application = {
      localstorage: {},
      cookies: ''
    }

    for (let provider of this.registrationProviders) {
      const response = await provider.register(user);
      application = {...application, ...response};
    }

    return application;
  }
}
