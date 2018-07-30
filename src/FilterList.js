import React, { Component } from "react";
import List from "./List";
//import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import MapContainer from "./MapContainer";
import axios from "axios";

class FilterList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initLocations: [
        {
          id:0,
          title: "DownTown Mall",
          name: "DownTown Mall",
          position: {
            lat: 30.0174,
            lng: 31.4124
          },
          isActive:false
        },
        {
          id:1,
          title: "Portoss cairo Mall marker on map",
          name: "Porto cairo Mall",
          position: {
            lat: 30.0645,
            lng: 31.4245
          },
          isActive:false
        },
        {
          id:2,
          title: "dukes",
          name: "Dukes",
          position: {
            lat: 30.025158,
            lng: 31.484697
          },
          isActive:false
        },
        {
          id:3,
          title: "Cairo Festival City",
          name: "Cairo Festival City",
          position: {
            lat: 30.0320,
            lng: 31.4085
          },
          isActive:false
        },
        {
          id:4,
          title: "Point 90 Mall",
          name: "Point 90 Mall",
          position: {
            lat: 30.0203,
            lng: 31.4950
          },
          isActive:false
        }
      ],
      locations: null,
      fsClientID: "TP5JE1BRP3IZEBMQF4WO0JH4D0X3BJ4MDVYNIN3CBTYBTTK3",
      fsClientSecret: "BXS50OPRP3RZW4GJCIOIBKAKRXQTAIFC12KNCA532QB1LQTB",
      fsBaseURL: "https://api.foursquare.com/v2/venues/search?ll="
    };
  }
  componentWillMount() {
   
    var that = this;
    this.state.initLocations.map(loc =>
      axios
        .get(
          `${this.state.fsBaseURL}${loc.position.lat},${loc.position
            .lng}&client_id=${this.state.fsClientID}&client_secret=${this.state
            .fsClientSecret}&v=20180721&query=${loc.name}&limit=1`
        )
        .then(res => {
          //persons = res.data;
          //console.log(res.data);
          loc.info = res.data.response;
          //this.setState({ persons });
          that.setState({
            locations: this.state.initLocations
          });
        })
        .catch(function(error) {
          alert("cannot load data", error);
        })
    );
  }

  filterLocations(event) {
    let updatedList = this.state.initLocations;
    updatedList = updatedList.filter(
      item =>
        item.name.toLowerCase().search(event.target.value.toLowerCase()) !== -1
    );
    this.setState({ locations: updatedList });
  }
  getLocation(element) {
    //debugger;
    //alert(e.target.innerText);
    let updatedList = this.state.initLocations;
    updatedList = updatedList.filter(
      item =>
        item.name.toLocaleLowerCase() ===
        element.target.innerText.toLocaleLowerCase()
    );
    this.setState({ locations: updatedList });
  }
  reset(e) {
    //debugger
    //e.preventDefault();
    this.setState({
      locations: this.state.initLocations
    });
    this.refs.search.value = "";
  }
  handleActiveMarker (idx){
    this.setState({
      locations: this.state.locations.map((item) => {
        if (idx !== item.id) {
          return { ...item, isActive: false };}
        
          return { ...item, isActive: true };
      })
    });
   
  };  
  

  render() {
    return (
      <div className="">
        <div className="search-filter-wrapper" style={{ float: "left" }}>
          <input
            type="text"
            placeholder="Search"
            ref="search"
            onChange={this.filterLocations.bind(this)}
          />
          <button onClick={this.reset.bind(this)}>Reset </button>
          {this.state.locations && 
            <List
              handleActiveMarker={this.handleActiveMarker.bind(this)}
              items={this.state.locations}
            />
          }
        </div>
        <div style={{ float: "left" }}>
          {this.state.locations && (
            <MapContainer handleReset={this.reset.bind(this)}  markersList={this.state.locations} handleActiveMarker = {this.handleActiveMarker.bind(this)} />
          )}
        </div>
      </div>
    );
  }
}

export default FilterList;
