import React from 'react';
import ReactDOM from 'react-dom';
import DataVisualizer from './components/DataVisualizer.jsx';


window.onload = () => {
	ReactDOM.render(<DataVisualizer />, document.getElementById('container'));
};