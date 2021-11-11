import UserDTO from '../types/userDTO';

interface RegistrationStrategy {
  register(user: UserDTO): Promise<{
    localstorage: Record<string, string>,
    cookies: string
  }>;
}

export default RegistrationStrategy;
