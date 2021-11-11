import UserDTO from '../../../../typings/types/userDTO';
import RegistrationProvider from '../../../../typings/interfaces/registration.provider';
import axios from 'axios';
import * as cookie from 'cookie';
import FormData from 'form-data';

export class EdxRegistrationProviderImp implements RegistrationProvider {
  async register(user: UserDTO): Promise<{
    localhost?: Record<string, string>,
    cookies?: string
  }> {
    try {
      const cookies = await EdxRegistrationProviderImp.getCookiesToken();
      const cookieStr = `csrftoken=${cookies.csrftoken}; experiments_is_enterprise=${cookies.experiments_is_enterprise}; sessionid=${cookies.sessionid}`;

      const formData = new FormData();
      formData.append('name', user.fullName);
      formData.append('password', user.password)
      formData.append('email', user.email);
      formData.append('username', user.username);
      formData.append('terms_of_service', 'true');

      const response = await axios.post(
          'https://learning.storeworkflows.com/api/user/v2/account/registration/',
          formData,
          {
            headers: {
              ...formData.getHeaders(),
              'x-csrftoken': cookies.csrftoken,
              Referer: 'https://learning.storeworkflows.com/registration?next=%2F',
              cookie: cookieStr,
            },
          },
      );

      return {
        cookies: response.headers['set-cookie']?.join() || ""
      };
    } catch (e: any) {
      console.log(e.response.data);
      return {
        cookies: ''
      }
    }
  }

  static async getCookiesToken(): Promise<Record<string, string>> {
    const response = await axios.get(
      'https://learning.storeworkflows.com/login',
    );

    return cookie.parse(
      response.headers['set-cookie']?.join().replace(/Secure,/g, '') ?? '',
    );
  }
}
