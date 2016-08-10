import {expect} from 'chai';
import {List, Map} from 'immutable';

import {reducer} from '../src/reducer';

describe('reducer', () => {

	it('handles SET_ENTRIES', () => {
		const state = Map();
		const action = {type: 'SET_ENTRIES', entries: ['Catch Me If You Can', 'Cast Away']};

		const nextState = reducer(state, action);

		expect(nextState).to.equal(Map({
									entries: List.of('Catch Me If You Can', 'Cast Away')
									}));
	});

	it('handles NEXT', () => {
		const state = Map({
						entries: List.of('Catch Me If You Can', 'Cast Away')
						});

		const action = {type: 'NEXT'};

		const nextState = reducer(state, action);

		expect(nextState).to.equal(Map({
									vote: Map({
										pair: List.of('Catch Me If You Can', 'Cast Away')
									}),
									entries: List()
									}));
	});

	it('handles VOTE', () => {
		const state = Map({
						vote: Map({
								pair: List.of('Catch Me If You Can', 'Cast Away')
						}),
						entries: List()
						});

		const action = {type: 'VOTE', entry: 'Cast Away'};

		const nextState = reducer(state, action);

		expect(nextState).to.equal(Map({
									vote: Map({
										pair: List.of('Catch Me If You Can', 'Cast Away'),
										tally: Map({
												 'Cast Away': 1 
												})
									}),
									entries: List()
									}));
	});
});
