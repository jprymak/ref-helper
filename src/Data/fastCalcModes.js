const fastCalcModes = [
    {
        id: 1,
        name: 'Select By Flow',
        info: ['pipe','velocity','pressureDrop'],
        inputs: ['flow','allowedPressureDrop','allowedVelocity'],
    },
    {
        id: 2,
        name: 'Select By Capacity',
        info: ['pipe','flow','velocity','pressureDrop'],
        inputs: ['capacity','delta','allowedPressureDrop','allowedVelocity']
    }
]

export default fastCalcModes;