import type {NextApiRequest, NextApiResponse} from "next";

type Data = {
    status: string
    kgCO2PerKm: number | null
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (!req.complete) return;
    // expecting req.query to contain key-pair {"vehicleId": "number"}
    if (!req.query["vehicleId"]) {
        res.status(400).json({"status": "Missing vehicleId query parameter", "kgCO2PerKm": null});
        return;
    }

    // fetch vehicle emission rate from us government emissions json database api
    fetch(`https://fueleconomy.gov/ws/rest/vehicle/${req.query["vehicleId"]}`, {
        headers: new Headers({'Accept': 'application/json'})
    })
        .then(response => response.json())
        .then(data => {
            const gramsPerMile = Number.parseFloat(data.co2TailpipeGpm)
            const gramsPerKm = gramsPerMile * 1.609344
            const kgPerKm = gramsPerKm / 1000
            res.status(200).json({"status": "Success", "kgCO2PerKm": kgPerKm})
        }
    );
}
