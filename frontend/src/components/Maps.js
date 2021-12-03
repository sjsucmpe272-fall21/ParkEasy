import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import "./../css/Maps.css";
import { googleAccessKey } from "./../config";

class SimpleMap extends Component {

	API_KEY = googleAccessKey;

	static defaultProps = {
		center: {
			lat: 37.334790,
			lng: -121.888140
		},
		zoom: 11
	};

	render() {
		const { markers } = this.props;
		const center = this.props.center || this.state.center;
		
		const defaultMapOptions = {
			fullscreenControl: false,
			zoomControl: false,
			// gestureHandling: "none"
		};

		const markerOptions = {}

		return (
			// Important! Always set the container height explicitly
			// <div style={{ height: '100vh', width: '100%' }}>
			<div style={{ height: '100%', width: '100%' }}>
				<GoogleMapReact
					bootstrapURLKeys={{ key: this.API_KEY }}
					center={center}
					defaultZoom={this.props.zoom || 20}
					options={defaultMapOptions}
				>
				
					{
						(markers) ? (
							markers.map((marker, index) => {
								return (
									<Marker
										key = {index}
										lat={marker.lat}
										lng={marker.lng}
										options={markerOptions}
									/>
								)
							})
						) : null
					}
				</GoogleMapReact>
			</div>
		);
	}
}

const Marker = props => {
	return <>
	  <div className="pin"></div>
	  <div className="pulse"></div>
	</>
}

export default SimpleMap;