import { RegistrationProvider } from '../../../typings/interfaces/registration.provider';
import { UserDTO } from '../../../typings/types/userDTO';
import {createClient, MatrixClient} from 'matrix-js-sdk';
import axios from "axios";

export class MatrixRegistrationProviderImp implements RegistrationProvider {
  private client: MatrixClient;
  constructor() {
    this.client = createClient({
      baseUrl: 'https://matrix.storeworkflows.com/',
      idBaseUrl: 'https://matrix.storeworkflows.com/',
    });
  }

  async register(user: UserDTO): Promise<Record<string, Record<string, string>>> {
    try {
      const registerParams: any = {
        username: user.username,
        password: user.password,
        auth: {},
        inhibitLogin: false,
        initial_device_display_name: "https://riot.storeworkflows.com/ через Chrome на Mac OS"
      };

      registerParams.auth = await MatrixRegistrationProviderImp.getAuthTypeAndToken(this.client, registerParams);

      const response = await this.client.registerRequest(registerParams, undefined, (c) =>
          console.log(c),
      );

      return {
        localstorage: {
          mx_user_id: response.user_id,
          mx_access_token: response.access_token,
          mx_hs_url: `https://${response.home_server}`,
          mx_device_id: response.device_id
        }
      };
    } catch (e) {
      return {};
    }
  }

  private static async getAuthTypeAndToken(client: MatrixClient, registerParams: Record<string, any>) {
    try {
      await client.registerRequest(registerParams, undefined, (c) =>
          console.log(c),
      );
    } catch (e: any) {
      return {
        session: e.data.session,
        type: e.data.flows[0].stages[0]
      }
    }
  }
}
