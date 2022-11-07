import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
    status: string;
    kgCO2PerKWh: number | null;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (!req.complete) return;
    // expecting req.query to contain key-pair {"region": "string"}
    if (!req.query["region"]) {
        res.status(400).json({status: "Missing region query parameter", kgCO2PerKWh: null});
        return;
    }

    // check if the provided region is valid using our own api
    fetch(`http://localhost:3000/api/get/electricityRegions`)
        .then(response => response.json())
        .then(data => {
            //@ts-ignore
            const locationCodes = data.validRegions.map(i => String(i.id));
            if (!locationCodes.includes(req.query["region"])) {
                res.status(400).json({status: "Invalid region", kgCO2PerKWh: null});
            } else {

                const url = "https://beta3.api.climatiq.io/estimate";

                const reqData = {
                    emission_factor: {
                        id: "electricity-energy_source_grid_mix",
                        region: req.query["region"],
                    },
                    parameters: {
                        energy: 1,
                        energy_unit: "kWh",
                    },
                };

                const fetchData = {
                    method: "POST",
                    body: JSON.stringify(reqData),
                    headers: new Headers({
                        Authorization: "Bearer " + process.env.CLIMATIQ_API_KEY,
                    }),
                };

                fetch(url, fetchData)
                    .then(response => response.json())
                    .then(data => {
                        if (data.isEmpty) {
                            res.status(400).json({status: "Invalid region", kgCO2PerKWh: null});
                            return;
                        }
                        if (data.error) {
                            res.status(500).json({status: "No data for region", kgCO2PerKWh: null});
                            return;
                        }
                        res.status(200).json({status: "Success", kgCO2PerKWh: data.co2e});
                    });
            }
        }
    );
}
