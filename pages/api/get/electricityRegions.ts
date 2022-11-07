import type {NextApiRequest, NextApiResponse} from "next";

type Data = {
    status: string
    validRegions: Partial<{[key: string]: string}>[]
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (!req.complete) return;

    fetch(`https://beta3.api.climatiq.io/emission-factors/regions`, {
        headers: new Headers({'Authorization': 'Bearer ' + process.env.CLIMATIQ_API_KEY})
    })
        .then(response => response.json())
        .then(data => {
            // map to name:id pairs
            res.status(200).json({"status": "Success", "validRegions": data.results})
        }
    );
}