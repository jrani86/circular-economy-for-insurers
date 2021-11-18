import React from "react";
import { Card, CardActions, Button } from '@material-ui/core';
import StarRatings from 'react-star-ratings';
import { CardContent } from "@material-ui/core";


function InfoContent(props) {

    const { id, name, onSelect, placeAddress, distance, shop } = props;

    const shopImages = ['repair_shop.jpg',
    'repair_shop_2.jpg',
    'repair_shop_3.jpg',
    'repair_shop_4.jpg',
    'repair_shop_5.jpg'];
  
  
    const getRepairImage = (image) => {
      if (image) {
          const imagePath = require(`../../assets/images/${image}`);
          return <img src={imagePath} />
      }
      return undefined;
  }
        const phoneNumber = ['513-123-34567','513-123-34567','513-123-34567','513-123-34567','513-123-34567'];

    const handleOnClick = () => {
        onSelect(shop,id);

    }

    return (

        <div>
            <Card className="leftAlign Info-card">
                {getRepairImage(shopImages[id])}
                <CardContent className="info-content">
                <i class="fa fa-phone" aria-hidden="true"></i> {phoneNumber[id]}

                
                </CardContent>
                <CardActions>
                    <Button size="small">Direction</Button>
                    <Button size="small">Nearby</Button>
                </CardActions>
            </Card>
            <div className="leftAlign info-content">
                <label>{name} </label>  <i class="fa fa-check-circle" aria-hidden="true"></i><br></br>
                {placeAddress} <br></br>
                {id+0.5} miles<br></br>
                <div className="flex-div rating-div">
                {(id % 2 == 0) ? `Sustainability rating:` : null} 
                <p>
                    {(id % 2 == 0) ?
                        (<StarRatings
                            rating={(id%1.5)+3.5}
                            starRatedColor="green"
                            numberOfStars={5}
                            name='rating'
                            starDimension="12px"
                            starSpacing="1px"
                        />) : null
                    }
                </p>
                </div>
                <div className="flex-div rating-div">
                {(id % 2 == 0) ? `Green Spares Availability :` : null}
                
                <p>
                    {(id % 2 == 0) ?
                        (<StarRatings
                            rating={(id%1.5)+3}
                            starRatedColor="green"
                            numberOfStars={5}
                            name='rating'
                            starDimension="12px"
                            starSpacing="1px"
                        />) : null
                    }
                </p>
                </div><br></br>
               
            </div>
            {
                (onSelect)?(<div className="info-content">
                <Button size="small" onClick={handleOnClick}>Select</Button>
                    
                </div>):null
            }
            
        </div>
    );
}

export default InfoContent;
