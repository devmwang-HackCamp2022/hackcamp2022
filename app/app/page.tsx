import CO2Calculator from "@app/app/co2calculator";

async function getKilogramPerKilowattHour(region: String) {
    const res = await fetch(
        `http://${process.env.BASE_URL}/api/get/electricalEmissionRate?region=${region}`
    );

    const data = await res.json();

    return data["kgCO2PerKWh"];
}

async function getKilogramPerKilometer(vehicleId: String) {
    const res = await fetch(
        `http://${process.env.BASE_URL}/api/get/vehicleEmissionRate?vehicleId=${vehicleId}`
    );

    const data = await res.json();

    return data["kgCO2PerKm"];
}

export default async function App() {
    const kilogramPerKilowattHour = await getKilogramPerKilowattHour("CA-BC");
    const kilogramPerKilometer = await getKilogramPerKilometer("37221");

    return (
        <main className="py-10">
            <div className="container px-6 mx-auto">
                <div className="rounded-lg mb-8 bg-gray">
                    <div className="px-6 py-2">
                        <h1 className="py-2 text-white text-3xl">
                            CO<sub>2</sub> Emissions Overview
                        </h1>
                        <div className="py-2">
                            <hr className="border-accent"></hr>
                        </div>
                        <div className="py-2 text-white">
                            <h1 className="text-2xl inline-block">
                                Electrical CO<sub>2</sub> Emission Rate
                            </h1>
                            <h1 className="text-xl inline-block float-right">
                                {`${kilogramPerKilowattHour}`} kg CO<sub>2</sub>{" "}
                                per kWh
                            </h1>
                        </div>
                        <div className="py-2 text-white">
                            <h1 className="text-2xl inline-block">
                                Vehicle CO<sub>2</sub> Emission Rate
                            </h1>
                            <h1 className="text-xl inline-block float-right">
                                {`${kilogramPerKilometer}`} kg CO<sub>2</sub>{" "}
                                per km
                            </h1>
                        </div>
                    </div>
                </div>

                <div className="rounded-lg bg-gray">
                    <div className="px-6 py-2">
                        <h1 className="py-2 text-white text-3xl">
                            CO<sub>2</sub> Emissions Calculator
                        </h1>
                        <div className="py-2">
                            <hr className="border-accent"></hr>
                        </div>
                        <CO2Calculator
                            kgPerkWh={kilogramPerKilowattHour}
                            kgPerKm={kilogramPerKilometer}
                        />
                    </div>
                </div>
            </div>
        </main>
    );
}
