"use client";

import { useState, Fragment, useEffect } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

export default function ModelBox({
    nextStep,
    year,
    make,
    model,
    state,
    setState,
}: {
    nextStep: () => void;
    year: string;
    make: string;
    model: string;
    state: string;
    setState: (state: string) => void;
}) {
    const [query, setQuery] = useState("");
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(
            `https://${process.env.NEXT_PUBLIC_BASE_URL}/api/get/vehicles?year=${year}&make=${make}&model=${model}`
        )
            .then((res) => res.json())
            .then((data) => {
                setVehicles(data["vehicles"]);
                setLoading(false);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const filteredMakes =
        query === ""
            ? vehicles
            : vehicles.filter((vehicle: string) =>
                  (vehicle as any)["text"]
                      .toString()
                      .toLowerCase()
                      .replace(/\s+/g, "")
                      .includes(query.toLowerCase().replace(/\s+/g, ""))
              );

    if (loading) {
        return <div className="mt-2">Loading...</div>;
    }

    return (
        <div className="w-60">
            <Combobox value={state} onChange={setState}>
                <div className="relative mt-1">
                    <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                        <Combobox.Input
                            className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                            displayValue={(vehicle) => (vehicle as any).text}
                            onChange={(event) => setQuery(event.target.value)}
                        />
                        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronUpDownIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                            />
                        </Combobox.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        afterLeave={() => setQuery("")}
                    >
                        <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {filteredMakes.length === 0 && query !== "" ? (
                                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                    Nothing found.
                                </div>
                            ) : (
                                filteredMakes.map((vehicle: any) => (
                                    <Combobox.Option
                                        key={(vehicle as any)["value"]}
                                        className={({ active }) =>
                                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                active
                                                    ? "bg-teal-600 text-white"
                                                    : "text-gray-900"
                                            }`
                                        }
                                        value={vehicle}
                                    >
                                        {({ selected, active }) => (
                                            <>
                                                <span
                                                    className={`block truncate ${
                                                        selected
                                                            ? "font-medium"
                                                            : "font-normal"
                                                    }`}
                                                >
                                                    {(vehicle as any)["text"]}
                                                </span>
                                                {selected ? (
                                                    <span
                                                        className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                                            active
                                                                ? "text-white"
                                                                : "text-teal-600"
                                                        }`}
                                                    >
                                                        <CheckIcon
                                                            className="h-5 w-5"
                                                            aria-hidden="true"
                                                        />
                                                    </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Combobox.Option>
                                ))
                            )}
                        </Combobox.Options>
                    </Transition>
                </div>
            </Combobox>

            <button
                type="button"
                onClick={nextStep}
                className="rounded-md m-0 mt-2 bg-dark px-4 py-2 text-white hover:bg-opacity-70 focus:outline-none active:bg-opacity-40"
            >
                Next
            </button>
        </div>
    );
}
