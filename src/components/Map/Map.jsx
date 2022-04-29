import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab/Rating';

import useStyles from './style';

import mapStyles from './mapStyles';

// import { LocationOnOutlined } from '@material-ui/icons';

const Map = ({ setCoordinates, setBounds, coordinates, places, setChildClicked, weatherData }) => {
    
    const classes = useStyles();
    const isDesktop = useMediaQuery('(min-width:600px)');
    

    return (
        <div className={classes.mapContainer}>
            <GoogleMapReact
                bootstrapURLKeys={{key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={14}
                margin={[50, 50, 50, 50]}
                options={{ disableDefeaultUI: true, zoomControl: true, styles: mapStyles }}
                onChange={(e) => {
                    console.log(e);
                    setCoordinates({ lat: e.center.lat, lng: e.center.lng });
                    setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
                }}
                onChildClick={(child) => setChildClicked(child)}
                >

                {/* this codeblock shows cards on the map */}
                { places?.map((place, i) => (
                    <div
                    className={classes.markerContainer}
                        lat={Number(place.latitude)}
                        lng={Number(place.longitude)}
                        key={i}
                    >
                        {
                            !isDesktop ? (
                                <LocationOnOutlinedIcon color="primary" fontSize="large" />
                            ) : (
                                <Paper elevation={3} className={classes.paper}>
                                    <Typography className={classes.typoography} variant="subtitle2" gutterBottom >
                                            {place.name}
                                    </Typography>
                                    <img 
                                        className={classes.pointer}
                                        src={place.photo ? place.photo.images.large.url : 'https://live.staticflickr.com/65535/49443645382_36a114393b_b.jpg'}
                                        alt={place.name}
                                    />
                                    <Rating size="small" value={Number(place.rating)} readOnly />
                                </Paper>
                            )
                        }
                    </div>
                ))}

                {/* this codeblock shows the Open Weather API icons */}
                { weatherData?.list?.map((data, i) => (
                    <div key={i} lat={data.coord.lat} lng={data.coord.lon}>
                        <img height="100" src={`https://openweathermap.org/img/w/${data.weather[0].icon}.png`}/>
                    </div>
                ))}

            </GoogleMapReact>
        </div>
    )
}

export default Map;