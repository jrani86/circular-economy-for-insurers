import React, {
  useContext,
  useEffect,
  useState,
  useCallback
} from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { useLoadScript } from "@react-google-maps/api";
import Map from '../components/Map/Map';
import axios from 'axios';
import StarRatings from 'react-star-ratings';
import { Dialog, DialogTitle, DialogContentText, DialogActions, Button, Grid, Card, CardContent, CardMedia } from '@material-ui/core';





const emails = ['username@gmail.com', 'user02@gmail.com'];

function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle className="modal-header">Repair Facility Confirmation</DialogTitle>

      <DialogContentText className="modal-text">
        Do you want to add {selectedValue.address} as Repair Facility?
      </DialogContentText>
      <DialogActions className="modal-button">
        <Button autoFocus onClick={() => handleListItemClick('ok')} color="primary">
          OK
        </Button>
        <Button autoFocus onClick={() => handleListItemClick('cancel')} color="primary">
          Cancel
        </Button>
      </DialogActions>

    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};


function RepairFacility(props) {

  const [customerlocation, setCustomerlocation] = useState({});
  const [formattedaddress, setFormattedaddress] = useState(undefined);
  const [inProgress, setInProgress] = useState(true);;
  const [markers, setMarkers] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(emails[1]);
  const { location, history } = props;
  const [claimId, setClaimId] = useState(undefined);
  const [activeMarkerId, setActiveMarkerId] = useState(undefined);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    let marker = markers[activeMarkerId];
    if (value == "ok") {
      history.push({
        pathname: "/confirmation",
        state: {
          claimID: claimId,
          repairFacility: selectedValue,
          marker: marker
        }
      });

    }

  };


  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDNKPmO2UKtZ8KklnS7ewEBgQpqmnE0PT0" // Add your API key
  });


  useEffect(
    () => {
      if (inProgress) {
        if (_.has(location, 'state.lossLocation')) {
          const { lossLocation, claimID } = location.state;
          const addressParam = encodeURIComponent(lossLocation);
          setSelectedValue({});
          setClaimId(claimID)
          axios.get('http://com-ey-esg-microservice.workshop-team-five-bb0dafd08526894d1a8ae848e8bd8099-0000.eu-gb.containers.appdomain.cloud/geomap/' + addressParam).then(response => {
            setCustomerlocation(response.data.results[0].geometry.location);
            setFormattedaddress(response.data.results[0].formatted_address)
            let location = response.data.results[0].geometry.location;
            let param = encodeURIComponent(location.lng + "," + location.lat);
            const icon = { url: require("../assets/images/placeholder.png"), scaledSize: { width: 50, height: 50 } };
            const icon1 = { url: require("../assets/images/car-repair.png"), scaledSize: { width: 50, height: 50 } };
            axios.get('http://com-ey-esg-microservice.workshop-team-five-bb0dafd08526894d1a8ae848e8bd8099-0000.eu-gb.containers.appdomain.cloud/geomaplocation/' + param)
              .then(response => {
                var shops = response.data.candidates;
                if (!!shops && shops.length > 0) {
                  let shopList = [];
                  let iconUrl = {};
                  shops.map((shop, index) => {
                    iconUrl = icon;
                    if (index % 2 == 1) {
                      iconUrl = icon1;
                    }
                    shopList.push({
                      "id": index,
                      "name": shop.address,
                      "placeName": shop.attributes.PlaceName,
                      "placeAddress": shop.attributes.Place_Addr,
                      "position": {
                        lat: shop.location.y,
                        lng: shop.location.x
                      },
                      "shop": shop,
                      "icon": iconUrl,
                      "distance": (index * 4) + 10,
                      "sustainability": (index % 2)

                    });
                  });
                  setMarkers(shopList);
                  setInProgress(false)

                }
              });
          })
        }

      }
    },
    [setMarkers, setInProgress, setClaimId]
  );

  const handleOnClick = useCallback((shop, id) => {
    setSelectedValue(shop)
    setActiveMarkerId(id);
    setOpen(true);
  }, [selectedValue, setSelectedValue, setActiveMarkerId, activeMarkerId])


  const shopImages = ['repair_shop.jpg',
    'repair_shop_2.jpg',
    'repair_shop_3.jpg',
    'repair_shop_4.jpg',
    'repair_shop_5.jpg'];


  const getRepairImage = (image) => {
    if (image) {
      const imagePath = require(`../assets/images/${image}`);
      return <img src={imagePath} />
    }
    return undefined;
  }



  return (isLoaded && !inProgress) ? (
    <div className="mp-wrapper">
      <div className="">
        <Grid container>
          <Grid item xs={3}>
            <div className="leftAlign repair-header"><label className="mp-value-mdtb">Auto repair shop</label></div>
            <div className="shop-list-container">
              {markers.map(({ id, name, position, placeName, placeAddress, shop, icon }) => (
                <div className="shop-list">
                  <Grid container>
                    <Grid item xs={4} className="shop-img">
                      {getRepairImage(shopImages[id])}
                    </Grid>

                    <Grid item xs={8} className="shop-info-grid">
                      <div className={`leftAlign shop-info ${(activeMarkerId != undefined && activeMarkerId == id) ? 'selected-shop' : 'notselected'}`}>
                        <label>{name} </label>
                        <p>{placeAddress}</p>

                        {(id % 2 == 0) ?
                          (<StarRatings
                            rating={(id % 1.5) + 3.5}
                            starRatedColor="green"
                            numberOfStars={5}
                            name='rating'
                            starDimension="15px"
                            starSpacing="5px"
                          />
                          ) : null

                        }
                      </div></Grid>

                  </Grid>


                </div>
              ))}
            </div>
          </Grid>
          <Grid item xs={8}>

            <Map markers={markers} onClickMarker={setActiveMarkerId} onSelect={handleOnClick} />
          </Grid>

        </Grid>

      </div>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </div>
  ) : null
}

export default RepairFacility;


