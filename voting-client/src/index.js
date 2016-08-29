import React from 'react';
import ReactDOM from 'react-dom';
import {VotingContainer} from './components/Voting';
import {Router, Route, hashHistory} from 'react-router';
import App from './components/App';
import {ResultsContainer} from './components/Results';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducer';

const store = createStore(reducer);
store.dispatch({
	type: 'SET_STATE',
	state: {
		vote: {
			pair: ['Catch Me If You Can', 'Forrest Gump'],
			tally: {'Forrest Gump': 5}
		}
	}
});

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
