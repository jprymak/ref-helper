
import * as propyleneGlycol from "../../../Data/propyleneGlycol";
import * as ethyleneGlycol from "../../../Data/ethyleneGlycol";
import {water} from "../../../Data/water";

const media = {...propyleneGlycol, ...ethyleneGlycol, water};


const Select = ({options, label, unit, name, onInputChange, value}) =>{

return (
<>
<label htmlFor={name}>{label}</label>
<select name={name} onChange={onInputChange} value={value}>
    {options?.map((option, index)=><option key={index} value={option} label={media[option].name}></option>)}
</select>
<span>{unit}</span>
</>
);
};

export default Select;