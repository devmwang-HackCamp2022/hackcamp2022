import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
    status: string;
    makes: string[] | null;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (!req.complete) return;
    // Expecting req.query to contain key-pair {"year": "number"}
    if (!req.query["year"]) {
        res.status(400).json({
            status: "Missing year query parameter",
            makes: null,
        });
        return;
    }

    return new Promise<void>((resolve, reject) => {
        // fetch makes from us government emissions json database api
        fetch(
            `https://fueleconomy.gov/ws/rest/vehicle/menu/make?year=${req.query["year"]}`,
            {
                headers: new Headers({ Accept: "application/json" }),
            }
        )
            .then((response) => response.json())
            .then((data) => {
                res.status(200).json({
                    status: "Success",
                    makes: data.menuItem.map(
                        (item: { text: string }) => item.text
                    ),
                });
                resolve();
            });
    });
}

export const config = {
    runtime: "experimental-edge",
};
