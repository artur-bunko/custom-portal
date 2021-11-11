import type { NextApiRequest, NextApiResponse } from 'next'
import {RegistrationStrategyImp} from "./structures/registration.strategy";
import {MatrixRegistrationProviderImp} from "./structures/matrix/matrix-registration.provider";
import {EdxRegistrationProviderImp} from "./structures/edx/edx-registration.provider";

type Data = Record<string, string>

const registrationStrategy = new RegistrationStrategyImp([new EdxRegistrationProviderImp(), new MatrixRegistrationProviderImp()]);

export default async function handler(
		req: NextApiRequest,
		res: NextApiResponse<Data>
) {
	const response = await registrationStrategy.register(req.body);

	res.setHeader('Set-Cookie', response.cookies)

	res.status(200).json(response.localstorage)
}
