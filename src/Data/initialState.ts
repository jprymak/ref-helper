import { FastCalcState } from "Utils/fastCalcReducer";

const initialState:FastCalcState = {
  capacity: 100,
  temperature: "20",
  flow: 21.6,
  velocity: null,
  pressureDrop: null,
  allowedPressureDrop: 300,
  allowedVelocity: 2,
  pipe: null,
  delta: 4,
  medium: "water",
  dynamicViscosity: 0,
  density: 0,
  specificHeat: 0
};

export default initialState;