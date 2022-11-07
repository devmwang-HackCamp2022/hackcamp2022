"use client";

import { useState } from "react";

import YearBox from "./year_box";
import MakeBox from "./make_box";
import ModelBox from "./model_box";
import VehicleBox from "./vehicle_box";

export default function Settings() {
    const [step, setStep] = useState(0);

    const [selectedYear, setSelectedYear] = useState("");
    const [selectedMake, setSelectedMake] = useState("");
    const [selectedModel, setSelectedModel] = useState("");
    const [selectedVehicle, setSelectedVehicle] = useState("");

    const nextStep = () => {
        setStep((step) => step + 1);
    };

    const componentList = [
        <div key="yearSelection">
            <p className="text-sm text-gray-500 pb-2">
                {"Enter your car's model year."}
            </p>
            <YearBox
                nextStep={nextStep}
                state={selectedYear}
                setState={setSelectedYear}
            />
        </div>,
        <div key="makeSelection">
            <p className="text-sm text-gray-500">{"Enter your car's make."}</p>
            <MakeBox
                nextStep={nextStep}
                year={selectedYear}
                state={selectedMake}
                setState={setSelectedMake}
            />
        </div>,
        <div key="modelSelection">
            <p className="text-sm text-gray-500">
                {"Enter your car's models."}
            </p>
            <ModelBox
                nextStep={nextStep}
                year={selectedYear}
                make={selectedMake}
                state={selectedModel}
                setState={setSelectedModel}
            />
        </div>,
        <div key="vehicleSelection">
            <p className="text-sm text-gray-500">
                {"Select your specific vehicle from the dropdown."}
            </p>
            <VehicleBox
                nextStep={nextStep}
                year={selectedYear}
                make={selectedMake}
                model={selectedModel}
                state={selectedVehicle}
                setState={setSelectedVehicle}
            />
        </div>,
        <div key="finished">
            <p className="text-sm text-gray-500">
                {"Setup complete! You can change your settings at any time."}
            </p>
        </div>,
    ];

    return <div className="relative">{componentList[step]}</div>;
}
