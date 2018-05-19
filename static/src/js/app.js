
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class App extends Component {
	render (){
		return (
			<div>测试...</div>
		)
	}
}

ReactDOM.render(
	<App />, 
	document.getElementById('app'),
	() => {
		console.log('挂载完成');
	}
);

