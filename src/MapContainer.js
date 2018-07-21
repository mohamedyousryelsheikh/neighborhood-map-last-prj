import React, { Component } from "react";

import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

class MapContainer extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
  };
  componentDidMount(){
      this.setState({
          markersList : this.props.markersList
      })
  }

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  };

  onMapClicked = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };
  render() {
    return (
      <div className="map-container">
        <Map
          google={this.props.google}
          zoom={12}
          initialCenter={{
            lat: 30.072313,
            lng: 31.439353
          }}
          onClick={this.onMapClicked}
        >
          {
              this.props.markersList &&
              
            this.props.markersList.map(item => (
              <Marker
                title={item.title}
                name={item.name}
                onClick={(props, marker, e) =>
                  this.onMarkerClick(props, marker, e)}
                position={item.position}
                info={item.info}
              />
            ))
          }

          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
          >
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
              <p>
                {this.state.selectedPlace.info ? (
                  <div>
                    <div>
                      address:{" "}
                      {this.state.selectedPlace.info.venues[0].location.address}
                    </div>
                    <div>
                      city :{
                        this.state.selectedPlace.info.venues[0].location.city
                      }
                    </div>
                    <div>
                      area :{
                        this.state.selectedPlace.info.venues[0].location
                          .crossStreet
                      }
                    </div>
                  </div>
                ) : (
                  "No data available"
                )}
              </p>
            </div>
          </InfoWindow>
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyB-IAagXb8LdbyEzf_hyN97D69B3TkcXLE"
})(MapContainer);
