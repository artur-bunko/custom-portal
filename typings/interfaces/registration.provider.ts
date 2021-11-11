import UserDTO from '../types/userDTO';

interface RegistrationProvider {
  register(user: UserDTO): Promise<{
    localstorage?: Record<string, string>,
    cookies?: string
  }>;
}

export default RegistrationProvider;
