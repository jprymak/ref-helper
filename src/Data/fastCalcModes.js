const fastCalcModes = [
    {
        id: 1,
        name: 'Select Pipe By Flow',
        info: ['pipe','velocity','pressureDrop'],
        inputs: ['flow','allowedPressureDrop','allowedVelocity'],
    },
    {
        id: 2,
        name: 'Select Pipe By Capacity',
        info: ['pipe','flow','velocity','pressureDrop'],
        inputs: ['capacity','delta','allowedPressureDrop','allowedVelocity']
    },
    {
        id: 3,
        name: 'Count flow',
        info: ['flow'],
        inputs: ['capacity','delta']
    }
]

export default fastCalcModes;