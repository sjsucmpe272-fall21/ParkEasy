/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { GoogleMap, Marker } from '@react-google-maps/api';
import { useState, useEffect } from 'react';
import Geocode from "react-geocode";
import Autocomplete from 'react-google-autocomplete';
import { Hidden } from '@mui/material';
import { googleAccessKey } from '../../config';


const containerStyle = {
    width: '325px',
    height: '325px'
};

const webcontainerStyle = {
    width: '500px',
    height: '500px'
};


Geocode.setApiKey(googleAccessKey);
Geocode.enableDebug();


export default function LocationSearchModal(props) {

    const [address, setAddress] = useState('');
    const [location, setLocation] = useState({});
    const [marker, setMarker] = useState({});

    const getCity = (addressArray) => {
        let city = '';
        for (let i = 0; i < addressArray.length; i++) {
            if (addressArray[i].types[0] && 'administrative_area_level_2' === addressArray[i].types[0]) {
                city = addressArray[i].long_name;
                return city;
            }
        }
    };

    const getArea = (addressArray) => {
        let area = '';
        for (let i = 0; i < addressArray.length; i++) {
            if (addressArray[i].types[0]) {
                for (let j = 0; j < addressArray[i].types.length; j++) {
                    if ('sublocality_level_1' === addressArray[i].types[j] || 'locality' === addressArray[i].types[j]) {
                        area = addressArray[i].long_name;
                        return area;
                    }
                }
            }
        }
    };

    const getState = (addressArray) => {
        let state = '';
        for (let i = 0; i < addressArray.length; i++) {
            for (let i = 0; i < addressArray.length; i++) {
                if (addressArray[i].types[0] && 'administrative_area_level_1' === addressArray[i].types[0]) {
                    state = addressArray[i].long_name;
                    return state;
                }
            }
        }
    };

    const getZipcode = (addressArray) => {
        let zipcode = '';
        for (let i = 0; i < addressArray.length; i++) {
            for (let i = 0; i < addressArray.length; i++) {
                if (addressArray[i].types[0] && 'postal_code' === addressArray[i].types[0]) {
                    zipcode = addressArray[i].long_name;
                    return zipcode;
                }
            }
        }
    };

    const getCountry = (addressArray) => {
        let country = '';
        for (let i = 0; i < addressArray.length; i++) {
            for (let i = 0; i < addressArray.length; i++) {
                if (addressArray[i].types[0] && 'country' === addressArray[i].types[0]) {
                    country = addressArray[i].long_name;
                    return country;
                }
            }
        }
    };


    useEffect(async () => {
        if (props.latitude && props.longitude ) {
            setLocation({
                lat: props.latitude,
                lng: props.longitude,
            });

            setMarker({
                lat: props.latitude,
                lng: props.longitude,
            });

            Geocode.fromLatLng(props.latitude, props.longitude).then(
                response => {
                    const address = response.results[0].formatted_address;
                    setAddress(address);
                },
                error => {
                    console.error(error);
                }
            );
        }else{
            return;
        }

    }, [props.latitude,props.longitude]);

    useEffect(async () => {
       const action = sessionStorage.getItem('action');
       if(action === 'edit' || action === 'view') return;
       if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                setLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });

                setMarker({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });

                Geocode.fromLatLng(position.coords.latitude, position.coords.longitude).then(
                    response => {
                        console.log(response)
                        const address = response.results[0].formatted_address,
                            addressArray = response.results[0].address_components,
                            city = getCity(addressArray),
                            area = getArea(addressArray),
                            state = getState(addressArray),
                            zipcode = getZipcode(addressArray);
                        setAddress(address);
                        console.log('city', city, area, state);
                        console.log('zipcode', zipcode);
                    },
                    error => {
                        console.error(error);
                    }
                );

            });
        } else {
            alert("Geolocation not supported");
        }
    }, []);

    const onMarkerDragEnd = (event) => {

        let newLat = event.latLng.lat(),
            newLng = event.latLng.lng();

        Geocode.fromLatLng(newLat, newLng).then(
            response => {
                const address = response.results[0].formatted_address,
                    addressArray = response.results[0].address_components,
                    city = getCity(addressArray),
                    area = getArea(addressArray),
                    state = getState(addressArray),
                    country = getCountry(addressArray),
                    addressLine1 = address.split(",")[0],
                    zipcode = getZipcode(addressArray);
                setAddress(address);
                console.log(city, state, area);
                props.onMarkerChanged({
                    addressLine1: addressLine1, city: area, state: state, zipcode: zipcode, country: country,
                    latitude: newLat,
                    longitude: newLng,
                })
                setLocation({
                    lat: newLat,
                    lng: newLng,
                });

                setMarker({
                    lat: newLat,
                    lng: newLng,
                });

            },
            error => {
                console.error(error);
            }
        );
    };

    const onPlaceSelected = (place) => {

        console.log('plc', place);
        const address = place.formatted_address,
            addressArray = place.address_components,
            city = getCity(addressArray),
            area = getArea(addressArray),
            state = getState(addressArray),
            zipcode = getZipcode(addressArray),
            country = getCountry(addressArray),
            addressLine1 = address.split(",")[0],
            latValue = place.geometry.location.lat(),
            lngValue = place.geometry.location.lng();
        setAddress(address);
        console.log(city, state, area);
        console.log("address", address);
        props.onPlaceSelected({
            addressLine1: addressLine1, city: area, state: state, zipcode: zipcode, country: country,
            latitude: latValue,
            longitude: lngValue,
        })
        setLocation({
            lat: latValue,
            lng: lngValue,
        });

        setMarker({
            lat: latValue,
            lng: lngValue,
        });

    };

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                <Hidden mdDown>
                    <GoogleMap
                        mapContainerStyle={webcontainerStyle}
                        center={location}
                        zoom={10}
                    >
                        <Marker
                            draggable={true}
                            onDragEnd={(event) => { onMarkerDragEnd(event) }}
                            position={{ lat: marker.lat, lng: marker.lng }}
                        />
                    </GoogleMap>
                    <Autocomplete
                        inputAutocompleteValue={address}
                        style={{ width: '500px' }}
                        containerStyle={containerStyle}
                        onPlaceSelected={(place) => onPlaceSelected(place)}
                        options={{
                            types: ["geocode", "establishment"],
                        }}
                    />
                </Hidden>
                <Hidden mdUp>
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={location}
                        zoom={10}
                    >
                        <Marker
                            draggable={true}
                            onDragEnd={(event) => { onMarkerDragEnd(event) }}
                            position={{ lat: marker.lat, lng: marker.lng }}
                        />
                    </GoogleMap>
                    <Autocomplete
                        style={{ width: '325px' }}
                        defaultValue={address}
                        containerStyle={containerStyle}
                        onPlaceSelected={(place) => onPlaceSelected(place)}
                        options={{
                            types: ["geocode", "establishment"],
                        }}
                    />
                </Hidden>
            </div>
        </>

    )
}