// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getUqSession } from 'uq-app';

type Data = {
    user: string;
    token: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    let uqSession = await getUqSession();
    let { body } = req;
    let { username, password } = body;
    let ret = await uqSession.net.userApi.login({ user: username, pwd: password, guest: undefined });
    res.status(200).json(ret)
}
