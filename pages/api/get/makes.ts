import type {NextApiRequest, NextApiResponse} from "next";

type Data = {
    status: string
    makes: string[] | null
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (!req.complete) return;
    // Expecting req.query to contain key-pair {"year": "number"}
    if (!req.query["year"]) {
        res.status(400).json({"status": "Missing year query parameter", "makes": null});
        return;
    }

    // fetch makes from us government emissions json database api
    fetch(`https://fueleconomy.gov/ws/rest/vehicle/menu/make?year=${req.query["year"]}`, {
        headers: new Headers({'Accept': 'application/json'})
    })
        .then(response => response.json())
        .then(data => {
            res.status(200).json({"status": "Success", "makes": data.menuItem.map((item: {text: string}) => item.text)})
        }
    );
}
