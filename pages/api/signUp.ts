import type { NextApiRequest, NextApiResponse } from 'next'
import {RegistrationStrategyImp} from "./structures/registration.strategy";
import {MatrixRegistrationProviderImp} from "./structures/matrix/matrix-registration.provider";
import {EdxRegistrationProviderImp} from "./structures/edx/edx-registration.provider";

type Data = Record<string, string>

const isEmptyObject = (object: Record<string, string>) => {
	return Object.keys(object).length === 0;
}

const registrationStrategy = new RegistrationStrategyImp([new EdxRegistrationProviderImp(), new MatrixRegistrationProviderImp()]);

export default async function handler(
		req: NextApiRequest,
		res: NextApiResponse<Data>
) {
	const response = await registrationStrategy.register(req.body);

	if (isEmptyObject(response.localstorage) || response.cookies === '') {
		res.status(500).json({
			message: "User exists or you need to provide a valid information"
		})
	}

	res.setHeader('Set-Cookie', response.cookies)

	res.status(200).json(response.localstorage)
}
