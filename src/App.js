import React, { Component } from 'react';
import './App.css';
import FilterList from './FilterList'
//import { GoogleApiWrapper } from 'google-maps-react' ;
//import MapContainer from './MapContainer'
class App extends Component {
  render() {
    return (
      <div className="App">
        <FilterList />
      </div>
    );
  }
}

export default App;
