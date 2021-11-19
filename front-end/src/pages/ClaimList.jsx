import React, {
    useState,
    useEffect, useCallback
} from 'react';
import { useHistory } from 'react-router';
import { Card, CardContent, CircularProgress, Grid } from '@material-ui/core';
import MDTableComponent from '../components/MDTable/MDTable';
import axios from 'axios';
import './ClaimPage.scss'

function ClaimList(props) {
    const [tableData, setTableData] = useState([]);
    const history = useHistory();

    const progressLoad = () => {
        return (
            <CircularProgress style={{ margin: '45px' }} />
        )
    }

    const handleClick = (e) => {
        history.push({
            pathname: "/claimdetails",
            state: {
                claimID: e
            }
        });

    };

    const tableUpdate = () => {
        return (tableData && tableData.length <= 0) ? (
            progressLoad()
        ) : (
            <div>
                <div>
                    <Grid container rowSpacing={5} columnSpacing={{ xs: 1, sm: 1, md: 1 }} className="grid-container claimlist-grid">
                        <Grid item xs={3}>
                            <img src={require('../assets/images/hourglass.png')} />
                            <div className="claims-title claim-title-box " >
                                # Claims Pending
                                <br />
                                <div className="title-value">7</div>
                            </div>
                        </Grid>
                        <Grid item xs={2}>
                        <img src={require('../assets/images/time.png')} />
                            <div className="claims-title claim-title-box " >
                                Avg. Cycle Time
                                <br />
                                <div className="title-value">20</div>
                            </div>
                        </Grid>
                        <Grid item xs={2}>
                        <img src={require('../assets/images/documents.png')} />
                            <div className="claims-title claim-title-box " >
                                Claim Ratio
                                <br />
                                <p>YTD</p><br />
                                <div className="title-value">85</div>
                            </div>
                        </Grid>
                        <Grid item xs={2}>
                        <img src={require('../assets/images/money.png')} />
                            <div className="claims-title claim-title-box " >
                                Expense Ratio
                                <br />
                                <p>YTD</p><br />
                                <div className="title-value">0.60</div>
                            </div>
                        </Grid>
                        <Grid item xs={3}>
                        <img src={require('../assets/images/documents.png')} />
                            <div className="claims-title claim-title-box " >
                                Sustainability Score
                                <br />
                                <div className="title-value">18</div>
                            </div>
                        </Grid>
                    </Grid>
                </div>
                <div className="claim-detail">
                    <label className="mp-value-mdtb table-header">List of Claims </label>
                    <MDTableComponent
                        id="claimTable"
                        small
                        searching={true}
                        sortable={true}
                        data={tableData}
                        entriesOptions={[5, 10, 20, 25, 100]} entries={5} pagesAmount={4}
                        click={{
                            ClaimId: handleClick
                        }
                        }
                    />
                </div>
            </div>);
    };

    useEffect(() => {
        axios.get('assets/data/claims.json').then(response => {
            setTableData(response.data)
        });

    }, []);


    return (
        <div className="mp-wrapper">
            <div className="container claim-main">
                <Card className="centeralign">
                    <CardContent>
                        {tableUpdate()}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default ClaimList;