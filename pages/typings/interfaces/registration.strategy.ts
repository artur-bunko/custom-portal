import { UserDTO } from '../types/userDTO';

export interface RegistrationStrategy {
  register(user: UserDTO): Promise<{
    localstorage: Record<string, string>,
    cookies: string
  }>;
}
