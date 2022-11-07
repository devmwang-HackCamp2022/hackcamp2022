import type {NextApiRequest, NextApiResponse} from "next";

type Data = {
    status: string
    models: string[] | null
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (!req.complete) return;
    // expecting req.query to contain key-pair {"year": "number", "make": "string"}
    if (!req.query["year"]) {
        res.status(400).json({"status": "Missing year query parameter", "models": null});
        return;
    }
    if (!req.query["make"]) {
        res.status(400).json({"status": "Missing make query parameter", "models": null});
        return;
    }

    // check if the provided make is valid for the provided year using our own api
    fetch(`http://${process.env.NEXT_PUBLIC_BASE_URL}/api/get/makes?year=${req.query["year"]}`)
        .then(response => response.json())
        .then(data => {
            if (!data.makes.includes(req.query["make"])) {
                res.status(400).json({"status": "Invalid make for provided year", "models": null});
                return;
            }
        }
    );

    // fetch models from us government emissions json database api
    fetch(`https://fueleconomy.gov/ws/rest/vehicle/menu/model?year=${req.query["year"]}&make=${req.query["make"]}`, {
        headers: new Headers({'Accept': 'application/json'})
    })
        .then(response => response.json())
        .then(data => {
            res.status(200).json({"status": "Success", "models": data.menuItem.map((item: {text: string}) => item.text)})
        }
    );
}
