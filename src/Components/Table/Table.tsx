import "./Table.scss";

interface ITableRow{
   pipe: string;
   velocity: number;
   unitPressureDrop: number;
}

interface ITableProps{
    tableData: ITableRow[];
    selected: string;
}

export default function Table({tableData, selected}:ITableProps):JSX.Element{
return(<table className="table">
<thead><tr>
  <td>Diameter [DN]</td>
  <td>Velocity [m/s]</td>
  <td>Pressure drop [Pa/m]</td>
  </tr></thead>

<tbody>
{tableData &&
  tableData.map((el, index) => {
    
    return (
      <tr key={index} className={el.pipe===selected ? "table__row--selected" : ""}>
        <td>{el.pipe}</td>
        <td>{el.velocity}</td>
        <td>{el.unitPressureDrop.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</td>
      </tr>
    );
  })}
</tbody>
</table>);
}