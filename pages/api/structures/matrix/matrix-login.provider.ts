import { LoginProvider } from '../../../typings/interfaces/login.provider';
import { createClient } from 'matrix-js-sdk';

export class MatrixLoginImp implements LoginProvider {
  async auth(loginParams: {
    username: string;
    password: string;
  }): Promise<boolean> {
    const client = createClient({
      baseUrl: 'https://matrix.storeworkflows.com/',
      idBaseUrl: 'https://matrix.storeworkflows.com/',
    });

    const config = {
      identifier: {
        type: 'm.id.user',
        user: loginParams.username,
      },
      password: loginParams.password,
      initial_device_display_name: '',
    };

    const data = await client.login('m.login.password', config);

    console.log(data);

    return true;
  }
}
