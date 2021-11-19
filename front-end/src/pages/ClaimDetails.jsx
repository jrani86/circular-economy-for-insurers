import React, {
    useEffect,
    useState
} from 'react';
import {
    Box, Table, Grid,
    Button
} from '@material-ui/core';
import { Card, CardContent, CircularProgress } from '@material-ui/core';
import axios from 'axios';
import _ from 'lodash';
import { useLoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import vehicleDamage from '../assets/images/damage_vehicle.jpg';


function ClaimDetails(props) {

    const { location, history } = props;
    const [claimDetailsData, setClaimDetailsData] = useState([]);
    const [markers, setMarkers] = useState([]);
    const [inProgress, setInProgress] = useState(true);
    const [activeMarkerId, setActiveMarkerId] = useState(undefined);
	const [lossLocation, setLossLocation] = useState(undefined);

    const handleClick = () => {

        history.push({
            pathname: "/repairFacility",
            state: {
                claimID: claimDetailsData.ClaimNumber,
                lossLocation: claimDetailsData.LossLocation.displayName
            }
        });

    };
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyDNKPmO2UKtZ8KklnS7ewEBgQpqmnE0PT0" // Add your API key
    });


    const handleOnLoad = (map) => {
        const bounds = new window.google.maps.LatLngBounds();
        markers.forEach(({ position }) => bounds.extend(position));
        map.fitBounds(bounds);
    };


    useEffect(
        () => {
            if (_.has(location, 'state.claimID')) {
                const { claimID } = location.state;
                let claimDetails = [];
                axios.get('assets/data/claimDetails.json').then(response => {
                    claimDetails = response.data;
                    let claim = _.filter(
                        claimDetails, function (claimObj) {
                            return (claimObj.ClaimNumber == claimID)
                        }
                    );
                    if (claim.length > 0) {
                        const addressParam = encodeURIComponent(claim[0].LossLocation.displayName);
                        axios.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + addressParam + '&key=AIzaSyDNKPmO2UKtZ8KklnS7ewEBgQpqmnE0PT0').then(response => {
                            let location = response.data.results[0].geometry.location;
                            let vehicleLocationList = [];
                            vehicleLocationList.push({
                                "id": claim[0].ClaimNumber,
                                "name": claim[0].LossLocation,
                                "position": {
                                    lat: location.lat,
                                    lng: location.lng
                                }
                            });
							setLossLocation(claim[0].LossLocation.displayName);
                            setClaimDetailsData(claim[0]);
                            setMarkers(vehicleLocationList[0]);
                            setInProgress(false);
                        });


                    }
                });

            }
        },
        [setInProgress]
    );

    const getVehicleImage = (image) => {
        if (image) {
            const imagePath = require(`../assets/images/${image}`);
            return <img src={imagePath} />
        }
        return undefined;
    }
    const progressLoad = () => {
        return (
            <CircularProgress style={{ margin: '45px' }} />
        )
    }

    return (
        claimDetailsData.ClaimNumber === undefined && isLoaded && !inProgress && lossLocation) ? (
        progressLoad()
    ) : (<div className="mp-wrapper">
        <div className="container claim-main">
            <div>
                <Grid container rowSpacing={5} columnSpacing={{ xs: 1, sm: 1, md: 1 }} className="grid-container">
                    <Grid item xs={3}>
                        <div className="claims-title claim-detail-box" >
                            {`Claim: ${claimDetailsData.ClaimNumber}`}
                        </div>
                    </Grid>
                    <Grid item xs={3}>
                        <div className="claims-title claim-detail-box" >
                            {`Policy #: ${claimDetailsData.PolicyNumber}`}
                        </div>
                    </Grid>
                    <Grid item xs={3}>
                        <div className="claims-title claim-detail-box" >
                            {`Effective From: ${claimDetailsData.EffectiveDate}`}
                        </div>
                    </Grid>
                    <Grid item xs={3}>
                        <div className="claims-title claim-detail-box" >
                            {`Insured: ${claimDetailsData.Insured}`}
                        </div>
                    </Grid>

                </Grid>
            </div>
            <Grid container rowSpacing={5} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
                <Grid item xs={6}>
                    <div class="detail-panel-main">
                        <Card className="centeralign">
                            <CardContent>
                                <Box className="claim-detail-panel" sx={{ flexGrow: 1 }}>
                                    <div>Vehicle<p>{claimDetailsData.Vehicle}</p></div>
                                    <div>Insured<p>{claimDetailsData.Insured}</p></div>
                                    <div>Policy Number<p>{claimDetailsData.PolicyNumber}</p></div>
                                    <div>Policy State<p>{claimDetailsData.PolicyState}</p></div>
                                </Box>
                            </CardContent>
                        </Card>
                        <Grid container rowSpacing={5} columnSpacing={{ xs: 1, sm: 1, md: 1 }} className="vehicle-grid">
                            <Grid item xs={7} className="vehicle-damage-grid">
                                <p>Damage Parts</p>
                                <div className="flex-div">
                                    <div className="vehicle-damage-card">
                                        <Box className="confirmation-panel" sx={{ flexGrow: 1 }}>
                                            <input type="checkbox" id="allRound" name="allRound" value="allRound" />
                                            <label for="allRound"> Allround</label><br />
                                            <input type="checkbox" id="mechanical" name="mechanical" value="mechanical" />
                                            <label for="mechanical"> Mechanical</label><br />
                                            <input type="checkbox" id="underbody" name="underbody" value="underbody" />
                                            <label for="underbody"> Underbody</label><br />
                                            <input type="checkbox" id="interior" name="interior" value="interior" checked="true" />
                                            <label for="interior"> Interior</label><br />
                                            <input type="checkbox" id="glass" name="glass" value="glass" checked="true" />
                                            <label for="glass"> Glass</label><br />
                                            <input type="checkbox" id="noDamage" name="noDamage" value="noDamage" />
                                            <label for="noDamage"> No Damage</label><br />
                                        </Box>
                                    </div>
                                    <div className="vehicle-damage-img">
                                        <div className="vehicle-front">
                                            <input type="checkbox" id="A" name="A" value="A" /><br />
                                            <input type="checkbox" id="B" name="B" value="B" checked="true" /><br />
                                            <input type="checkbox" id="C" name="C" value="C" />
                                        </div>
                                        <div>
                                            <input type="checkbox" id="E" name="E" value="E" /><br />
                                            <img src={vehicleDamage} width="150px" /><br />
                                            <input type="checkbox" id="D" name="D" value="D" />
                                        </div>
                                        <div className="vehicle-back">
                                            <input type="checkbox" id="F" name="F" value="F" /><br />
                                            <input type="checkbox" id="G" name="G" value="G" /><br />
                                            <input type="checkbox" id="H" name="H" value="H" />
                                        </div>
                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={5} className="vehicle-border">
                                <div>
                                    <div className="vehicle-damage-grid">
                                        <p>Direction of Impact</p>
                                        <div className="vehicle-damage-img">
                                            <div className="vehicle-front">
                                                <input type="checkbox" id="A" name="A" value="A" /><br />
                                                <input type="checkbox" id="B" name="B" value="B" checked="true" /><br />
                                                <input type="checkbox" id="C" name="C" value="C" />
                                            </div>
                                            <div>
                                                <input type="checkbox" id="E" name="E" value="E" /><br />
                                                <img src={vehicleDamage} width="130px" /><br />
                                                <input type="checkbox" id="D" name="D" value="D" />
                                            </div>
                                            <div className="vehicle-back">
                                                <input type="checkbox" id="F" name="F" value="F" /><br />
                                                <input type="checkbox" id="G" name="G" value="G" /><br />
                                                <input type="checkbox" id="H" name="H" value="H" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={12} className="vehicle-border-top">
                                <div>
                                    <div className="vehicle-damage-grid vehicle-status">
                                        <div className="vehicle-status-title">Vehicle Status</div>
                                        <div className="vehicle-status-div">
                                            <div>
                                                <input type="checkbox" id="mobile" name="mobile" value="mobile" />
                                                <label for="mobile">Mobile</label>
                                                <input type="checkbox" id="repair" name="repair" value="repair" />
                                                <label for="repair">Repaired</label>
                                                <input type="checkbox" id="roadworthy" name="roadworthy" value="roadworthy" />
                                                <label for="roadworthy">Roadworthy</label>
                                                <input type="checkbox" id="theft" name="theft" value="theft" />
                                                <label for="theft">Theft Damage</label>
                                                <input type="checkbox" id="fire" name="fire" value="fire" />
                                                <label for="fire">Fire Damage</label>
                                                <input type="checkbox" id="dismantled" name="dismantled" value="dismantled" />
                                                <label for="fire">Dismantled</label>
                                                <input type="checkbox" id="partlyRepaired" name="partlyRepaired" value="partlyRepaired" checked="true" />
                                                <label for="partlyRepaired">Partly Repaired</label>
                                                <input type="checkbox" id="unroadworthy" name="unroadworthy" value="unroadworthy" />
                                                <label for="unroadworthy">Unroadworthy</label>
                                                <input type="checkbox" id="vandalised" name="vandalised" value="vandalised" />
                                                <label for="vandalised">Vandalised</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="vehicle-damage-grid vehicle-status">
                                        <div className="vehicle-status-title">Severity</div>
                                        <div className="vehicle-status-div">
                                            <div>
                                                <input type="checkbox" id="light" name="light" value="light" />
                                                <label for="light">Light</label>
                                                <input type="checkbox" id="medium" name="medium" value="medium" checked="true" />
                                                <label for="medium">Medium</label>
                                                <input type="checkbox" id="heavy" name="heavy" value="heavy" />
                                                <label for="heavy">Heavy</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
                <Grid item xs={3}>
                    <Card className="centeralign repair-main detail-panel-main detail-panel-right" >
                        <CardContent>
                            <div>
                                <div className="image-container">
                                    {getVehicleImage(claimDetailsData.Image)}
                                </div>
                                <div>
                                    <div className="repair-details">
                                        <span>Repair Details</span>
                                        <Box className="repair-details-box" sx={{ flexGrow: 1 }}>
                                            <div>Damage Areas: <p>Interior, Glass</p></div>
                                            <div>Direction of Impact: <p>Front</p></div>
                                            <div>Vehicle Status: <p>Partly repaired</p></div>
                                        </Box>
                                    </div>
                                </div>

                            </div>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={3} className="detail-panel-main repair-main">
                    <Card>
                        <CardContent>
                            {isLoaded ?
                                (<div className="map-container">
                                    <div className="map-div">
									<p><b>Vehicle Location </b></p>
                                        <p>{lossLocation}</p>
                                        <Button className="map-button" onClick={handleClick}
                                            variant="contained" color="success">
                                            Overlay Repair Shops
                                        </Button>
                                        <GoogleMap
                                            onLoad={handleOnLoad}
                                            mapContainerStyle={{ width: "100%", height: "340px" }}
                                            center={new window.google.maps.LatLng(markers.position)}
                                            zoom={40}
                                        >
                                            <Marker
                                                key={markers.id}
                                                position={markers.position}
                                            >
                                               
                                            </Marker>

                                        </GoogleMap>
                                    </div>
                                </div>) : <div></div>
                            }
                        </CardContent>
                    </Card>

                </Grid>
            </Grid>
        </div>
    </div>
    )
}

export default ClaimDetails;