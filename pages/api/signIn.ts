import type { NextApiRequest, NextApiResponse } from 'next'
import {AuthStrategyImpl} from "./structures/auth.strategy";
import {EdxLoginImpl} from "./structures/edx/edx-login.provider";
import {MatrixLoginImp} from "./structures/matrix/matrix-login.provider";

type Data = {
	name: string
}

const authStrategy = new AuthStrategyImpl([new EdxLoginImpl(), new MatrixLoginImp()]);

export default async function handler(
		req: NextApiRequest,
		res: NextApiResponse<Data>
) {
	await authStrategy.login(req.body);

	res.status(200).json({ name: 'SignIn' })
}
