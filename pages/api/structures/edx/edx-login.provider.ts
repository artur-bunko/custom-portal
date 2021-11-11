import axios from 'axios';
import FormData from 'form-data';
import * as cookie from 'cookie';
import LoginProvider from '../../../../typings/interfaces/login.provider';

export class EdxLoginImpl implements LoginProvider {
  async auth(loginParams: {
    email: string;
    password: string;
  }): Promise<boolean> {
    try {
      const formData = new FormData();
      formData.append('email', loginParams.email);
      formData.append('password', loginParams.password);

      const cookiesObject = await EdxLoginImpl.getCookiesToken();
      const cookie = `csrftoken=${cookiesObject.csrftoken}; experiments_is_enterprise=${cookiesObject.experiments_is_enterprise}; sessionid=${cookiesObject.sessionid}`;

      const response = await axios.post(
        'https://learning.storeworkflows.com/api/user/v1/account/login_session/',
        formData,
        {
          headers: {
            ...formData.getHeaders(),
            'x-csrftoken': cookiesObject.csrftoken,
            Referer: 'https://learning.storeworkflows.com/login?next=%2F',
            cookie,
          },
        },
      );

      return true;
    } catch (e) {
      //console.log(e);

      return true
    }
  }

  private static async getCookiesToken(): Promise<Record<string, string>> {
    const response = await axios.get(
      'https://learning.storeworkflows.com/login',
    );

    return response.headers && cookie.parse(
      response.headers['set-cookie']?.join().replace(/Secure,/g, '') ?? '',
    );
  }
}
