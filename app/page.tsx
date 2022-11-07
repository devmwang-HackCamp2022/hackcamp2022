import MainView from "@srcapp/main_view";

async function getKilogramPerKilowattHour(region: String) {
    const res = await fetch(
        `http://${process.env.NEXT_PUBLIC_BASE_URL}/api/get/electricalEmissionRate?region=${region}`
    );

    const data = await res.json();

    return data["kgCO2PerKWh"];
}

async function getKilogramPerKilometer(vehicleId: String) {
    const res = await fetch(
        `http://${process.env.NEXT_PUBLIC_BASE_URL}/api/get/vehicleEmissionRate?vehicleId=${vehicleId}`
    );

    const data = await res.json();

    return data["kgCO2PerKm"];
}

export default async function App() {
    const kilogramPerKilowattHour = await getKilogramPerKilowattHour("CA-BC");
    const kilogramPerKilometer = await getKilogramPerKilometer("37221");

    return (
        <MainView
            kgPerkWh={kilogramPerKilowattHour}
            kgPerKm={kilogramPerKilometer}
        />
    );
}
