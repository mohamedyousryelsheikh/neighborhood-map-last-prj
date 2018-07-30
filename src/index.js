import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();


window.gm_authFailure = ()=> {

  alert('Sorry Google Maps cannot be loaded , please try again ');
}


 