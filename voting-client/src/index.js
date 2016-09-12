import React from 'react';
import ReactDOM from 'react-dom';
import {VotingContainer} from './components/Voting';
import {Router, Route, hashHistory} from 'react-router';
import App from './components/App';
import {ResultsContainer} from './components/Results';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducer';
import {setState} from './action_creators';
import io from 'socket.io-client';
import remoteActionMiddleware from './remote_action_middleware';

//apply logger middleware
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import createLogger from 'redux-logger';

const logger = createLogger();

const socket = io();
socket.on('state', state => 
	store.dispatch(setState(state))
);

/*socket.on('server event', function (data) {
    console.log(data);
    socket.emit('client event', { socket: 'io' });
});*/

const createStoreWithMiddleware = applyMiddleware(
  remoteActionMiddleware(socket), thunk, promise, logger
)(createStore);
const store = createStoreWithMiddleware(reducer);


const routes = 
        <Route component={App}>
            <Route path='/results' component={ResultsContainer}/>
            <Route path='/' component={VotingContainer}/>
        </Route>;

ReactDOM.render(
	<Provider store={store}>
    	<Router history={hashHistory}>{routes}</Router>
	</Provider>,
	document.getElementById('app')
);
