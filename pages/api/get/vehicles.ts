import type {NextApiRequest, NextApiResponse} from "next";

type Data = {
    status: string
    vehicles: Partial<{[key: string]: number}>[] | null
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (!req.complete) return;
    // expecting req.query to contain key-pair {"year": "number", "make": "string"}
    if (!req.query["year"]) {
        res.status(400).json({"status": "Missing year query parameter", "vehicles": null});
        return;
    }
    if (!req.query["make"]) {
        res.status(400).json({"status": "Missing make query parameter", "vehicles": null});
        return;
    }
    if (!req.query["model"]) {
        res.status(400).json({"status": "Missing model query parameter", "vehicles": null});
        return;
    }

    // check if the provided make is valid for the provided year using our own api
    fetch(`http://${process.env.NEXT_PUBLIC_BASE_URL}/api/get/makes?year=${req.query["year"]}`)
        .then(response => response.json())
        .then(data => {
                if (!data.makes.includes(req.query["make"])) {
                    res.status(400).json({"status": "Invalid make for provided year", "vehicles": null});
                    return;
                }
            }
        );

    // check if the provided model is valid for the provided year and make using our own api
    fetch(`http://${process.env.NEXT_PUBLIC_BASE_URL}/api/get/models?year=${req.query["year"]}&make=${req.query["make"]}`)
        .then(response => response.json())
        .then(data => {
                if (!data.models.includes(req.query["model"])) {
                    res.status(400).json({"status": "Invalid model for provided year and make", "vehicles": null});
                    return;
                }
            }
        );


    // fetch models from us government emissions json database api
    fetch(`https://fueleconomy.gov/ws/rest/vehicle/menu/options?year=${req.query["year"]}&make=${req.query["make"]}&model=${req.query["model"]}`, {
        headers: new Headers({'Accept': 'application/json'})
    })
        .then(response => response.json())
        .then(data => {
            if (data.menuItem instanceof Array) {
                res.status(200).json({"status": "Success", "vehicles": data.menuItem});
                return;
            } else {
                res.status(200).json({"status": "Success", "vehicles": [data.menuItem]});
            }
        }
    );
}
