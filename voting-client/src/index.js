import React from 'react';
import ReactDOM from 'react-dom';
import Voting from './components/Voting';
import {Router, Route, hashHistory} from 'react-router';
import App from './components/App';
import Results from './components/Results';

var routes = (
    <Router history={hashHistory}>
        <Route component={App}>
            <Route path='/results' component={Results}/>
            <Route path='/' component={Voting}/>
        </Route>
    </Router>
);

export default ReactDOM.render(
	routes,
	document.getElementById('app')
);
