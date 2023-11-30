import { FastCalcState } from "Reducers/fastCalcReducer";

const initialState: FastCalcState = {
  capacity: 100,
  temperature: 20,
  delta: 4,
  flow: 0,
  medium: "water",
  dynamicViscosity: 0,
  density: 998,
  specificHeat: 4.182,
  pipeType: "seamPipes",
  errors: {}
};

export default initialState;
