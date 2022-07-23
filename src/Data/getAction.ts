
import React from "react";

import { FastCalcAction } from "Components/Reducers/fastCalcReducer";



const getAction = (e:React.ChangeEvent<HTMLInputElement>|React.ChangeEvent<HTMLSelectElement>, mode: string) : FastCalcAction=>{

    switch(e.target.name){
        case "capacity-input": return { type: "setCapacity", payload: e.target.value };
        case "delta-input": return { type: "setDelta", payload: e.target.value };
        case "flow-input": return { type: "setFlow", payload: e.target.value };
        case "allowed-velocity-input": return { type: "setAllowedVelocity", payload: +e.target.value };
        case "allowed-pressure-drop-input": return { type: "setAllowedPressureDrop", payload: +e.target.value };
        case "medium-select": return { type: "setMedium", payload: e.target.value, mode };
        case "temperature-select": return { type: "setTemperature", payload: e.target.value, mode};
        default: return {type: "initialCalc"};
    }
};

export default getAction;