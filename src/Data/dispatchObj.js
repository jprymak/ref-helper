




const getDispatchObj = (e) =>{
    switch(e.target.name){
        case "capacity-input": return { type: "setCapacity", capacity: e.target.value };
        case "delta-input": return { type: "setDelta", delta: e.target.value };
        case "flow-input": return { type: "setFlow", flow: e.target.value };
        case "allowed-velocity-input": return { type: "setAllowedVelocity", allowedVelocity: e.target.value };
        case "allowed-pressure-drop-input": return { type: "setAllowedPressureDrop", allowedPressureDrop: e.target.value };
        default: return;
    }
};

export default getDispatchObj;