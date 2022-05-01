const Select = ({children, label, unit, name, onInputChange, value}) =>{

return (
<>
<label htmlFor={name}>{label}</label>
<select name={name} onChange={onInputChange} value={value}>
    {children}
</select>
<span>{unit}</span>
</>
);
};

export default Select;