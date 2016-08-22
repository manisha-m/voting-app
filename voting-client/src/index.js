import React from 'react';
import ReactDOM from 'react-dom';
import Voting from './components/Voting';

const pair = ['The Terminal', 'Forrest Gump'];

export default ReactDOM.render(
	<Voting pair={pair} />,
	document.getElementById('app')
);
