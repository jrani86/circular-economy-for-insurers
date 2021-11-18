import React, {
    useContext,
    useEffect,
    useState
} from 'react';
import {
    Box, Grid
} from '@material-ui/core';
import './ClaimPage.scss'
import bulb from '../assets/images/bulb.png';
import metrics from '../assets/images/metrics.png';
import axios from 'axios';
import _ from 'lodash';
import Map from '../components/Map/Map';

import { Card, CardContent, CircularProgress } from '@material-ui/core';

function ConfirmationPage(props) {

    const { location, history } = props;
    const [selectedValue, setSelectedValue] = useState({});
    const [claimId, setClaimId] = useState(undefined);
    const [inProgress, setInProgress] = useState(true);
    const [image, setImage] = useState(undefined);
    const [address, setAddress] = useState([]);
    const [activeMarkerId, setActiveMarkerId] = useState(undefined);
    const progressLoad = () => {
        return (
            <CircularProgress style={{ margin: '45px' }} />
        )
    }

    const getVehicleImage = (vehicleImg) => {
        if (vehicleImg) {
            const imagePath = require(`../assets/images/${vehicleImg}`);
            return <img src={imagePath} className="confirmation-image" />
        }
        return undefined;
    }

    useEffect(() => {
        const { claimID, repairFacility, marker } = location.state;
        if (_.has(location, 'state.claimID')) {
            let claimDetails = [];
            axios.get('assets/data/claimDetails.json').then(response => {
                claimDetails = response.data;
                let claim = _.filter(
                    claimDetails, function (claimObj) {
                        return (claimObj.ClaimNumber == claimID)
                    }
                );
                if (claim.length > 0) {
                    setImage(claim[0].Image);
                    setClaimId(claimID);
                    setSelectedValue(repairFacility);

                    console.log(repairFacility);
                    console.log(marker);
                    let markerList = [];
                    markerList.push(marker);
                    setAddress(markerList);
                    setInProgress(false)
                }
            });
        }
    }, [setSelectedValue, setAddress, setClaimId]);


    return (!inProgress) ? (
        <div className="mp-wrapper">
            <div className="container">

                <Grid container rowSpacing={5} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
                    <Grid item xs={4}>
                        <Card className="leftAlign">
                            <CardContent>
                                <div>
                                    {getVehicleImage(image)}
                                </div>
                                <div className="ride-sharing">
                                    <div className="box-title verb-heading">Ride Sharing</div>
                                    <div className="flex-div">
                                        <img src={bulb} />
                                        <p>You can opt to share a ride with our policy holders near your location. We facilitate that for our commitment towards sustainability. Please click here to find out like minded policy holders.</p>
                                    </div>
                                </div>
                                <div className="ride-sharing ">
                                    <div className="box-title verb-heading">Insurance Sharing</div>
                                    <div className="flex-div">
                                        <img src={bulb} />
                                        <p>We work towards <span className="insurance-sharing">"Responsible Production and Green Consumption"</span> by promoting insurance sharing across policy holders. To know more about it, please contact our customer care.
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={3}>
                        <Card className="confirmation-card">
                            <CardContent>
                                <div className="box-title vendor-details">
                                    <p>You have chosen</p>
                                    <p>{selectedValue.attributes.PlaceName}</p>
                                    <p>Your Sustainability Savings could be:</p>
                                </div>
                                <Box className="confirmation-panel" sx={{ flexGrow: 1 }}>
                                    <div>CO2 Emission: 10 </div>
                                    <div>Energy Consumption:  185kWh</div>
                                    <div>Product Recycling Rate:  68%</div>
                                    <div>Supply Chain Miles: 14 miles</div>
                                    <div>Waste Footprint:  120lbs</div>
                                    <div>Waste Reduction Rate: 27.8%</div>
                                    <div>Waste Recycling Rate: 55%</div>
                                </Box>
                                <img src={metrics} width="100%" height="100%" />
                                <div className="box-title vendor-details">Spare Parts</div>
                                <table className="confirmation-table">
                                    <tr>
                                        <th>#</th>
                                        <th>Part Description</th>
                                        <th>Reused</th>
                                        <th>Planet Saving</th>
                                    </tr>
                                    <tr className="dark-green-row">
                                        <td>1</td>
                                        <td>Part 1</td>
                                        <td>Yes</td>
                                        <td />
                                    </tr>
                                    <tr className="light-green-row">
                                        <td>2</td>
                                        <td>Part 2</td>
                                        <td>Yes</td>
                                        <td />
                                    </tr>
                                    <tr className="dark-green-row">
                                        <td>3</td>
                                        <td>Part 3</td>
                                        <td>Not available</td>
                                        <td />
                                    </tr>
                                    <tr className="light-green-row">
                                        <td>4</td>
                                        <td>Part 4</td>
                                        <td>Yes</td>
                                        <td />
                                    </tr>
                                    <tr className="dark-green-row">
                                        <td colspan="4">Total Savings</td></tr>
                                </table>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={5}>
                        <Card className="consumption-card">
                            <CardContent>
                                <div className="box-title vendor-details">Cumulative Savings</div>
                                <Box className="consumption-panel" sx={{ flexGrow: 1 }}>
                                    <div>Carbon Footprint:  20</div>
                                    <div>Energy Consumption:  2785 kWh</div>
                                    <div>Product Recycling Rate:  58%</div>
                                    <div>Supply Chain Miles: 20 miles</div>
                                    <div>Waste Footprint:  8990 lbs</div>
                                    <div>Waste Reduction Rate:  18%</div>
                                    <div>Waste Recycling Rate: 48%</div>
                                </Box>
                            </CardContent>
                        </Card>
                        <div className="map-padding">
                            <Card className="map-padding">
                                <Map markers={address} onClickMarker={setActiveMarkerId} />
                            </Card>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div >
    ) : null
}

export default ConfirmationPage;