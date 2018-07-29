import "../sass/main.min.css";

import React from 'react';
import ReactDOM from 'react-dom';
import App from "./views/router";


ReactDOM.render(
	<App />, 
	document.getElementById('app'),
	() => {
		console.log('挂载完成');
	}
);