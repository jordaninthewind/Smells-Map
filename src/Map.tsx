import React from 'react';
import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken = `${process.env.REACT_APP_MAPBOX_TOKEN}`;

interface StateProps {
    lat: number,
    lng: number,
    zoom: number,
}

export default class MapComponent extends React.PureComponent {
    mapContainer: any;
    state: StateProps;

    constructor(props: any) {
        super(props);
        this.state = {
            lng: props.lng,
            lat: props.lat,
            zoom: 10
        };

        this.mapContainer = React.createRef();
    }

    static defaultProps = {
        lng: -122.416389,
        lat: 37.7775,
        zoom: 10
    }

    componentDidMount() {
        const { lng, lat, zoom } = this.state;

        const map = new mapboxgl.Map({
            container: this.mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: zoom
        });

        map.on('move', () => {
            this.setState({
                lng: map.getCenter().lng.toFixed(4),
                lat: map.getCenter().lat.toFixed(4),
                zoom: map.getZoom().toFixed(2)
            });
        });
    }
    render() {
        const { lng, lat, zoom } = this.state;
        return (
            <div>
                <div className="sidebar">
                    Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
                </div>
                <div ref={this.mapContainer} className="map-container" />
            </div>
        );
    }
}
