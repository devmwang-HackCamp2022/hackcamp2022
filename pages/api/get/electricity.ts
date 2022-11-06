import type {NextApiRequest, NextApiResponse} from "next";
type Data = {
    status: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    var APIKEY = "X0EZY0F728MDH5N29TTTD02P6SGC";
    var url = "https://beta3.api.climatiq.io/estimate"
    
    let data = {
        emission_factor: {
            "id": "electricity-energy_source_grid_mix",
            "region": "CA"
          },
        parameters: {
            "energy": 1000,
            "energy_unit": "kWh" }
          }
    
    let fetchData = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({
        'Authorization': 'Bearer ' + APIKEY
      })
    }
    
    fetch(url, fetchData)
    .then(response=>response.json())
    
    .then(data=>{ console.log(data); })
     res.status(200).json({"status": "Success"})
}
