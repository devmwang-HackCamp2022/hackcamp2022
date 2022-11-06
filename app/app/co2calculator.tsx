"use client";

import { useState } from "react";

function isNumber(n: string) {
    if (n === "") return true;

    return !isNaN(parseFloat(n)) && isFinite(n as any);
}

function convertToNumber(n: string) {
    if (n === "") return 0;

    return parseFloat(n);
}

export default function CO2Calculator({
    kgPerkWh,
    kgPerKm,
}: {
    kgPerkWh: number;
    kgPerKm: number;
}) {
    const [form, setForm] = useState({
        kWhUsed: "",
        kmDriven: "",
    });

    const [electricalEmissions, setElectricalEmissions] = useState(0);
    const [vehicleEmissions, setVehicleEmissions] = useState(0);

    return (
        <>
            <div className="py-2 text-white">
                <div className="inline-block">
                    <input
                        className="rounded-xl w-60 bg-transparent border border-accent px-2 py-1 text-white focus:bg-black/25 focus:outline-none"
                        placeholder="Enter kWh Used"
                        value={form.kWhUsed}
                        onChange={(e) => {
                            setForm({
                                ...form,
                                kWhUsed: e.target.value,
                            });

                            if (isNumber(e.target.value)) {
                                setElectricalEmissions(
                                    convertToNumber(e.target.value) * kgPerkWh
                                );
                            }
                        }}
                    ></input>
                </div>
                <div className="inline-block float-right align-middle">
                    {isNumber(form.kWhUsed) && (
                        <h1 className="text-2xl">
                            {parseFloat(electricalEmissions.toFixed(4))} kg of
                            CO
                            <sub>2</sub>
                        </h1>
                    )}
                    {!isNumber(form.kWhUsed) && (
                        <h1 className="text-2xl text-red-500">
                            Value must be a number.
                        </h1>
                    )}
                </div>
            </div>
            <div className="py-2 text-white">
                <div className="inline-block">
                    <input
                        className="rounded-xl w-60 bg-transparent border border-accent px-2 py-1 text-white focus:bg-black/25 focus:outline-none"
                        placeholder="Enter km Driven"
                        value={form.kmDriven}
                        onChange={(e) => {
                            setForm({
                                ...form,
                                kmDriven: e.target.value,
                            });

                            if (isNumber(e.target.value)) {
                                setVehicleEmissions(
                                    convertToNumber(e.target.value) * kgPerKm
                                );
                            }
                        }}
                    ></input>
                </div>
                <div className="inline-block float-right align-middle">
                    {isNumber(form.kmDriven) && (
                        <h1 className="text-2xl">
                            {parseFloat(vehicleEmissions.toFixed(4))} kg of CO
                            <sub>2</sub>
                        </h1>
                    )}
                    {!isNumber(form.kmDriven) && (
                        <h1 className="text-2xl text-red-500">
                            Value must be a number.
                        </h1>
                    )}
                </div>
            </div>
            <div className="py-2 text-white">
                <div className="inline-block">
                    <h1 className="text-xl">
                        Total CO<sub>2</sub> Emissions
                    </h1>
                </div>
                <div className="inline-block float-right align-middle">
                    {isNumber(form.kmDriven) && (
                        <h1 className="text-2xl">
                            {parseFloat(
                                (
                                    electricalEmissions + vehicleEmissions
                                ).toFixed(4)
                            )}{" "}
                            kg of CO
                            <sub>2</sub>
                        </h1>
                    )}
                    {!isNumber(form.kmDriven) && (
                        <h1 className="text-2xl text-red-500">
                            Check that entered values are valid.
                        </h1>
                    )}
                </div>
            </div>
        </>
    );
}
