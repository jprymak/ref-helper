import { FastCalcState } from "Reducers/fastCalcReducer";

const initialState: FastCalcState = {
  capacity: "100",
  temperature: "20",
  flow: "21.6",
  delta: "4",
  medium: "water",
  dynamicViscosity: 0,
  density: 998,
  specificHeat: 4.182,
  pipeType: "seamPipes",
};

export default initialState;
