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

    /***********Data for Policy Summary***************/
    static getPolicySummaryDisplayObject(dataobj) {
        if (!!dataobj && dataobj.length > 0) {
            let policySummaryData = [];
            dataobj.filter(dataobj => dataobj.subtype !== "Cancellation").map(data => {
                policySummaryData.push({
                    "Policy_Number": data.policyNumber !== undefined ? data.policyNumber : "--",
                    "Effective_Date": data.effectiveDate !== undefined ? data.effectiveDate : "--",
                    "Status": data.displayStatus !== undefined ? data.displayStatus === "Bound" ? "Active" : data.displayStatus : "--",
                    "Product": data.product !== undefined ? data.product === 'Personal Auto' ? <i class="fas fa-car esg-ic-icon" /> :
                        data.product === 'Umbrella' ? <i class="fas fa-umbrella esg-ic-icon" /> :
                            data.product === 'Homeowners' ? <i class="fas fa-home esg-ic-icon" ></i> : data.product : "--",
                    "Primary_Insured": data.primaryInsuredName !== undefined ? data.primaryInsuredName : "--",
                    "Premium": data.premium.totalPremium.amount !== undefined ? "$" + data.premium.totalPremium.amount : "--",
                    "Change_Policy": "ChangePolicy",
                    "Cancel": "Cancel",
                    "Billing": "Billing",
                    "Document": "Document"
                });
                return true;
            });
            return policySummaryData;
        }
        return [];
    }

    /***********Data for Submission Summary***************/
    static getSubmissionSummaryDisplayObject(dataobj) {
        if (!!dataobj && dataobj.length > 0) {
            let submissionSummaryData = [];
            dataobj.filter(dataobj => dataobj.displayType === "Submission").map(data => {
                submissionSummaryData.push({
                    "Quote_Number": data.jobNumber !== undefined ? data.jobNumber : "--",
                    "Created_Date": data.createTime !== undefined ? data.createTime : "--",
                    "Status": data.displayStatus !== undefined ? data.displayStatus : "--",
                    "Product": data.product !== undefined ? data.product === 'Personal Auto' ? <i class="fas fa-car esg-ic-icon" /> :
                        data.product === 'Umbrella' ? <i class="fas fa-umbrella esg-ic-icon" /> :
                            data.product === 'Homeowners' ? <i class="fas fa-home esg-ic-icon" ></i> : data.product : "--",
                    "Primary_Insured": data.primaryInsuredName !== undefined ? data.primaryInsuredName : "--",
                    "Premium": data.product === 'Homeowners' ? "$864.00" : data.premium.totalPremium !== undefined && data.premium.totalPremium !== null ? "$" + data.premium.totalPremium.amount.split("-").join("") : "--",
                    "Edit_Quote": "ChangePolicy",
                    "Withdraw": "Withdraw",
                    "Document": data.premium.totalPremium !== undefined && data.premium.totalPremium !== null ? "Document" : "--"
                });
                return true;
            });
            return submissionSummaryData;
        }
        return [];
    }

    /***********Data for Endoresement Summary***************/
    static getEndoresementSummaryDisplayObject(dataobj) {
        if (!!dataobj && dataobj.length > 0) {
            let endoresementSummaryData = [];
            dataobj.filter(dataobj => dataobj.displayType === "Policy Change").map(data => {
                endoresementSummaryData.push({
                    "Quote_Number": data.jobNumber !== undefined ? data.jobNumber : "--",
                    "Created_Date": data.createTime !== undefined ? data.createTime : "--",
                    "Status": data.displayStatus !== undefined ? data.displayStatus : "--",
                    "Product": data.product !== undefined ? data.product === 'Personal Auto' ? <i class="fas fa-car esg-ic-icon" /> :
                        data.product === 'Umbrella' ? <i class="fas fa-umbrella esg-ic-icon" /> :
                            data.product === 'Homeowners' ? <i class="fas fa-home esg-ic-icon" ></i> : data.product : "--",
                    "Primary_Insured": data.primaryInsuredName !== undefined ? data.primaryInsuredName : "--",
                    "Premium": data.displayStatus !== "Draft" && data.premium.totalPremium !== undefined && data.premium.totalPremium !== null ? "$" + data.premium.totalPremium.amount : "--",
                    "Edit_Quote": "ChangePolicy",
                    "Withdraw": "Withdraw",
                });
                return true;
            });
            return endoresementSummaryData;
        }
        return [];
    }

    /***********Data for Billing Summary***************/
    static getBillingInquiryDetails(dataobj) {
        // console.log(dataobj)
        if (!!dataobj && dataobj.length > 0) {
            let billingData = [];
            dataobj.map(data => {
                billingData.push({
                    "Invoice_Status": data.Status,
                    "Issue_Date": data.BilledDate,
                    "Due_Date": data.DueDate,
                    "Amount_Billed": data.Amount,
                    "Amount_Due": data.AmountDue,
                    "Quick_Pay": "QuickPay"
                });
                return true;
            });
            // console.log(billingData)
            return billingData;
        }

        return [];

    }

    /***********Data for Activity Summary***************/
    static getActivityList(dataobj, status) {
        // console.log(dataobj)
        if (!!dataobj && dataobj.length > 0) {
            let activitydata = [];
            dataobj.map(activity => {
                if (activity.status === status) {
                    activitydata.push({
                        "Subject": activity.subject,
                        "Assign To": activity.assignedTO,
                        "Due Date": activity.dueDate,
                        "ESC Date": activity.escalationDate === null ? '--/--/----' : activity.escalationDate,
                        "Priority": activity.priority,
                        "Description": activity.description,
                        "Notes": "Notes",
                        "Edit": activity.status === "open" ? "EditActivity" : '',
                        "Complete": activity.status === "open" ? "Complete" : '',
                        "PublicId": activity.publicId
                    });
                }
                return true;
            });
            // console.log(activitydata)
            return activitydata;
        }

        return [];

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

    /***********Data for DashBoard Ticket Summary***************/
    static getDashBoardTicketDetails(dataobj) {
        // console.log(dataobj)
        if (!!dataobj && dataobj.length > 0) {
            let dashBoard = [];
            dataobj.map(dash => {
                if (dash.category === "software") {
                    dashBoard.push({
                        "Ticket_Number": dash.number,
                        "Category": dash.category,
                        "Status": dash.state === "7" ? "Closed" : dash.state === "2" ? "In Progress" : dash.state === "3" ? "On Hold" : "New",
                        "Urgency": dash.urgency === "1" ? "High" : dash.urgency === "2" ? "Medium" : dash.urgency === "3" ? "Low" : "",
                        "Description": dash.short_description
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
