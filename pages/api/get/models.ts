import type {NextApiRequest, NextApiResponse} from "next";

type Data = {
    models: string[]
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (!req.complete) return;
    // todo
}