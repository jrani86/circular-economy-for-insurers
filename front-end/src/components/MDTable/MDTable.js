import React, { Component } from "react";
import "./MDTable.scss";
import { MDBDataTable } from "mdbreact";



export default class MDTableComponent extends Component {

  render() {
    const rowData = [];
    const colData = [];
    let clickHeader = [];
    let clickFunction = [];
    let widthIndex = 0;
    let headers = [];

    if (this.props.headers) {
      headers = this.props.headers;
    } else {
      headers = Object.keys(this.props.data[0]);
    }
    if (this.props.click) {
      clickHeader = Object.keys(this.props.click);
      clickFunction = Object.values(this.props.click);
    }
    headers.map(header => {
      let obj = {
        label: header === "ClaimId" ? "Claim #" : header.split("_").join(" "),
        field: header,
        sort: header === "Loss_Date"
          || header === "Status" || header === "Created_Date" ? "asc" : "disabled",
        width: this.props.colWidth ? this.props.colWidth[widthIndex] : null
      };
      colData.push(obj);
      widthIndex++;
    });

    this.props.data.map(element => {
      let obj = {};
      headers.map(header => {
        if (header === "ClaimId") {
          obj[header] = (<a
            className="link"
            onClick={() => this.props.click[header](element[header])}
          >
            {element[header]}
          </a>);
        } else {
          obj[header] = element[header]
        }
      });
      rowData.push(obj);

    });


    const tableData = {
      columns: colData,
      rows: rowData
    };

    return (
      <div className={this.props.tablePadding ? this.props.tablePadding + ' Table' : "Table"}>
          <div className="tablecontainer">
            <MDBDataTable
              searching={true}
              scrollY={this.props.scrollY ? this.props.scrollY : null}
              hover
              responsive
              disableRetreatAfterSorting
              order={
                this.props.orderData
                  ? [this.props.orderData[0], this.props.orderData[1]]
                  : null
              }
              data={tableData}
              entriesOptions={[5, 10, 20, 25, 100]} entries={5} pagesAmount={4}
            />
          </div>
      </div>
    );
  }
}
