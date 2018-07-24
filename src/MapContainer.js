import React, { Component } from "react";

import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.markers = [];
  }
  state = {
    showingInfoWindow: false,
    infoWindows : [],
    activeMarker: {},
    selectedPlace: {},
    activeIcon:'https://mt.google.com/vt/icon?color=ff004C13&name=icons/spotlight/spotlight-waypoint-blue.png'
  };
  componentDidMount(){
      this.setState({
          markersList : this.props.markersList
      })
  }

  onMarkerClick = (props, marker, e) => {
    //debugger;
    //props.isActive = true;
    //console.log('Za marker');
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
      
    });

    this.props.handleActiveMarker(props.id);
    
  };

  triggerClick(id){
   console.log(this.markers[id]);
  // this.onMarkerClick(this.markers[id].props,this.markers[id])
  /* this.setState({
      selectedPlace: this.markers[id].props,
      activeMarker: this.markers[id],
      showingInfoWindow: true,
      
    });*/
  //this.props.google.maps.event.trigger(this.markers[id], 'click' );
  }

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
              
            this.props.markersList.map((item,index) => (
              <Marker
                ref={marker => this.markers[item.id] = marker }
                title={item.title}
                name={item.name}
                id = {item.id}
                isActive = {item.isActive}
                onClick={(props, marker) =>
                  this.onMarkerClick(props, marker)}
                position={item.position}
                info={item.info}
                index={index}
                icon = {
                  {
                    url:`${item.isActive?this.state.activeIcon:'https://mt.googleapis.com/vt/icon/name=icons/spotlight/spotlight-poi.png&scale=1'}`
                  }
                }
              />
              
              
            ))
          }

          { this.props.markersList.map((item,index) =>{item.isActive && this.triggerClick(item.id)} )
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
