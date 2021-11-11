import { UserDTO } from '../types/userDTO';

export interface RegistrationProvider {
  register(user: UserDTO): Promise<{
    localstorage?: Record<string, string>,
    cookies?: string
  }>;
}
