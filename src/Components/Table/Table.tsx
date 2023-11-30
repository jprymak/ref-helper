import React from "react";

import "./Table.scss";
import { useTranslation } from "react-i18next";

interface ITableRow {
  pipe: string;
  velocity: number;
  unitPressureDrop: number;
  opinion: string;
}

interface ITableProps {
  tableData: ITableRow[];
}

export default function Table({ tableData }: ITableProps): JSX.Element {
  const { t } = useTranslation();

  return (
    <table className="table">
      <thead>
        <tr>
          <td>{t("diameter")} [DN]</td>
          <td>{t("velocity")} [m/s]</td>
          <td>{t("pressureDrop")} [Pa/m]</td>
        </tr>
      </thead>

      <tbody>
        {tableData &&
          tableData.map((selection, index) => {
            return (
              <tr
                key={index}
                className={` ${
                  selection.opinion === "warning" ? "table__row--warning" : ""
                }
                ${
                  selection.opinion === "recommended"
                    ? "table__row--recommended"
                    : ""
                }
                ${
                  selection.opinion === "discouraged"
                    ? "table__row--discouraged"
                    : ""
                }`}
              >
                <td>{selection.pipe}</td>
                <td>{selection.velocity}</td>
                <td>
                  {selection.unitPressureDrop
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
}
