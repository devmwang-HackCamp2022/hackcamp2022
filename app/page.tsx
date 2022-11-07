"use client";

import { useState, useEffect, Fragment } from "react";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
import { Dialog, Transition } from "@headlessui/react";
import { Cog8ToothIcon } from "@heroicons/react/24/outline";

import Settings from "@app/settings";
import Router from "next/router";

function isNumber(n: string) {
    if (n === "") return true;

    return !isNaN(parseFloat(n)) && isFinite(n as any);
}

function convertToNumber(n: string) {
    if (n === "") return 0;

    return parseFloat(n);
}

export default function App() {
    const [kgPerKWh, setKgPerKWh] = useState(0);
    const [kgPerKm, setKgPerKm] = useState(0);
    const [loadingElectricalEmissions, setLoadingElectricalEmissions] =
        useState(true);
    const [loadingVehicleEmissions, setLoadingVehicleEmissions] =
        useState(true);

    const [triggerReload, setTriggerReload] = useState(false);

    const [cookies, setCookie] = useCookies();

    useEffect(() => {
        setTriggerReload(false);

        fetch(
            `https://${process.env.NEXT_PUBLIC_BASE_URL}/api/get/electricalEmissionRate?region=${cookies.location}`
        )
            .then((res) => res.json())
            .then((data) => {
                setKgPerKWh(data["kgCO2PerKWh"]);
                setLoadingElectricalEmissions(false);
            });

        fetch(
            `https://${process.env.NEXT_PUBLIC_BASE_URL}/api/get/vehicleEmissionRate?vehicleId=${cookies.vehicleId}`
        )
            .then((res) => res.json())
            .then((data) => {
                setKgPerKm(data["kgCO2PerKm"]);
                setLoadingVehicleEmissions(false);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [triggerReload]);

    const [showSettings, setShowSettings] = useState(false);

    const [form, setForm] = useState({
        kWhUsed: "",
        kmDriven: "",
    });

    const [electricalEmissions, setElectricalEmissions] = useState(0);
    const [vehicleEmissions, setVehicleEmissions] = useState(0);

    const openModal = () => setShowSettings(true);
    const saveAndCloseModal = () => {
        setShowSettings(false);

        setTriggerReload(true);
    };

    return (
        <>
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
                                    {`${kgPerKWh}`} kg CO<sub>2</sub> per kWh
                                </h1>
                            </div>
                            <div className="py-2 text-white">
                                <h1 className="text-2xl inline-block">
                                    Vehicle CO<sub>2</sub> Emission Rate
                                </h1>
                                <h1 className="text-xl inline-block float-right">
                                    {`${kgPerKm}`} kg CO<sub>2</sub> per km
                                </h1>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-lg bg-gray">
                        <div className="px-6 py-2">
                            <div className="align-middle">
                                <h1 className="py-2 inline-block text-white text-3xl">
                                    CO<sub>2</sub> Emissions Calculator
                                </h1>
                                <button
                                    type="button"
                                    onClick={openModal}
                                    className="rounded-md relative float-right m-0 top-2 bg-dark px-4 py-2 text-white hover:bg-opacity-70 focus:outline-none active:bg-opacity-40"
                                >
                                    <Cog8ToothIcon className="block h-6 w-6" />
                                </button>
                            </div>

                            <div className="py-2">
                                <hr className="border-accent"></hr>
                            </div>

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
                                                    convertToNumber(
                                                        e.target.value
                                                    ) * kgPerKWh
                                                );
                                            }
                                        }}
                                    ></input>
                                </div>
                                <div className="inline-block float-right align-middle">
                                    {isNumber(form.kWhUsed) && (
                                        <h1 className="text-2xl">
                                            {parseFloat(
                                                electricalEmissions.toFixed(4)
                                            )}{" "}
                                            kg of CO
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
                                                    convertToNumber(
                                                        e.target.value
                                                    ) * kgPerKm
                                                );
                                            }
                                        }}
                                    ></input>
                                </div>
                                <div className="inline-block float-right align-middle">
                                    {isNumber(form.kmDriven) && (
                                        <h1 className="text-2xl">
                                            {parseFloat(
                                                vehicleEmissions.toFixed(4)
                                            )}{" "}
                                            kg of CO
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
                                                    electricalEmissions +
                                                    vehicleEmissions
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
                        </div>
                    </div>
                </div>
            </main>

            <Transition appear show={showSettings} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed z-10"
                    onClose={saveAndCloseModal}
                >
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-1/2 h-[40vh] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-2xl transition-all">
                                    <Dialog.Title
                                        as="h1"
                                        className="text-xl font-medium leading-6 text-gray-900"
                                    >
                                        CO<sub>2</sub> Emission Calculator
                                        Settings
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <Settings
                                            saveAndCloseModal={
                                                saveAndCloseModal
                                            }
                                        />
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}
