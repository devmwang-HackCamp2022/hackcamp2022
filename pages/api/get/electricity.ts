import type {NextApiRequest, NextApiResponse} from "next";

type Data = {
    status: string
    kgCO2PerKWh: number | null
}

const Region = "CA";
const Energy = 1;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const url = "https://beta3.api.climatiq.io/estimate"
    
    let data = {
        emission_factor: {
            "id": "electricity-energy_source_grid_mix",
            "region": Region
          },
        parameters: {
            "energy": Energy,
            "energy_unit": "kWh" }
          }
    
    let fetchData = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({
        'Authorization': 'Bearer ' + process.env.CLIMATIQ_API_KEY
      })
    }
    
    fetch(url, fetchData)
    .then(response=>response.json())
    .then(data1 => {
      console.log("Region: "+data1.emission_factor.region); 
      console.log("CO2 kg/kWh "+ data1.co2e);
      res.status(200).json({"status": "Success", "kgCO2PerKWh": data1.co2ea})})
    
}
