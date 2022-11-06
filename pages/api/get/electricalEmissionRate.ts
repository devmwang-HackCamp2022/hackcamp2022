import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
    status: string;
    kgCO2PerKWh: number | null;
};

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (!req.complete) return;
    // expecting req.query to contain key-pair {"region": "string"}
    if (!req.query["region"]) {
        res.status(400).json({
            status: "Missing region query parameter",
            kgCO2PerKWh: null,
        });
        return;
    }

    const url = "https://beta3.api.climatiq.io/estimate";

    let req_data = {
        emission_factor: {
            id: "electricity-energy_source_grid_mix",
            region: req.query["region"],
        },
        parameters: {
            energy: 1,
            energy_unit: "kWh",
        },
    };

    let fetchData = {
        method: "POST",
        body: JSON.stringify(req_data),
        headers: new Headers({
            Authorization: "Bearer " + process.env.CLIMATIQ_API_KEY,
        }),
    };

    fetch(url, fetchData)
        .then((response) => response.json())
        .then((data) => {
            res.status(200).json({
                status: "Success",
                kgCO2PerKWh: data.co2e,
            });
        });
}
