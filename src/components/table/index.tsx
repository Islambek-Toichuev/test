import * as React from "react";
import styled from "styled-components";
import "./style.css";

interface styledProps {
  length: number;
}

let Headers = styled.div`
  display: grid;
  grid-template-columns: ${(p: styledProps) =>
    `${100 / p.length}% `.repeat(p.length)};
`;

let Rows = styled.div`
  .row {
    display: grid;
    grid-template-columns: ${(p: styledProps) =>
      `${100 / p.length}% `.repeat(p.length)};
  }
`;

export interface TableProps {
  tableData: any;
  rowClick?: any;
}

export default class Table extends React.Component<TableProps> {
  render() {
    let { tableData, rowClick } = this.props;
    return (
      <div className="table_wrapper">
        <Headers length={tableData && tableData[0].length}>
          {tableData &&
            tableData[0].map((item: any, index: number) => (
              <div className="cell th" key={index}>
                {item.title}
              </div>
            ))}
        </Headers>
        <Rows length={tableData && tableData[0].length}>
          {tableData &&
            tableData.map((row: any, index: number) => (
              <div
                onClick={() => rowClick && rowClick(row)}
                className={`row ${rowClick && "hover"}`}
                key={index}
              >
                {row.map((item: any, i: number) => (
                  <div className="cell tr" key={i}>
                    {item.value}
                  </div>
                ))}
              </div>
            ))}
        </Rows>
      </div>
    );
  }
}
