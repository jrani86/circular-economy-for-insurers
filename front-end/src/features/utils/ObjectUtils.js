import React from "react";
export default class {

    static doTextUppertoLower(stringObj) {
        if (stringObj) {
            return stringObj.toLowerCase().replace(/^./, stringObj[0].toUpperCase());
        } else {
            return stringObj;
        }
    }

    static removeUnderScore(parObj) {
        if (parObj) {
            return parObj.replace(/_+/gm, " ");
        } else {
            return parObj;
        }
    }

    /***********Data for DashBoard Summary***************/
    static getDashBoardList(dataobj) {
        // console.log(dataobj)
        if (!!dataobj && dataobj.length > 0) {
            let dashBoard = [];
            dataobj.map(dash => {
                dashBoard.push({
                    "ID": dash.Id,
                    "CREATIONDATE": dash.Creationdate,
                    "DUEDATE": dash.Duedate,
                    "PRIORITY": dash.Priority,
                    "SUBJECT": dash.Subject,
                    "ACCOUNTHOLDER": dash.Accountholder,
                    "PRODUCT": dash.Product === "CA" ? <i class="fas fa-car esg-ic-icon"></i> : dash.Product === "Home"
                        ? <i class="fas fa-home esg-ic-icon"></i> : dash.Product === "Umbrella" ? <i class="fas fa-umbrella esg-ic-icon"></i> : "",
                    "TYPE": dash.Type,
                    "STATE": dash.State,
                    "VIEW": dash.View === "View" ? <a href="#">View</a> : ""
                });
                return true;
            });
            console.log(dashBoard)
            return dashBoard;
        }

        return [];

    }

    /***********Data for DashBoard Initial Summary***************/
    static getDashBoardInitialList(dataobj) {
        // console.log(dataobj)
        if (!!dataobj && dataobj.length > 0) {
            let dashBoard = [];
            dataobj.map(dash => {
                if (dash.Type === "Openquote") {
                    dashBoard.push({
                        "ID": dash.Id,
                        "CREATIONDATE": dash.Creationdate,
                        "DUEDATE": dash.Duedate,
                        "PRIORITY": dash.Priority,
                        "SUBJECT": dash.Subject,
                        "ACCOUNTHOLDER": dash.Accountholder,
                        "PRODUCT": dash.Product === "CA" ? <i class="fas fa-car esg-ic-icon"></i> : dash.Product === "Home"
                            ? <i class="fas fa-home esg-ic-icon"></i> : dash.Product === "Umbrella" ? <i class="fas fa-umbrella esg-ic-icon"></i> : "",
                        "TYPE": dash.Type,
                        "STATE": dash.State,
                        "VIEW": dash.View === "View" ? <a href="#">View</a> : ""
                    });
                }
                return true;
            });
            console.log(dashBoard)
            return dashBoard;
        }

        return [];

    }

}
