import {List, Map, fromJS} from 'immutable';
import reducer from '../src/reducer';
import {expect} from 'chai';


describe('reducer', () => {
	
	it('handles SET_STATE', () => {
		const state = Map();
		const action = {
			type: 'SET_STATE',
			state: Map({
					vote: Map({
						pair: List.of('Cast Away', 'Forrest Gump'),
						tally: Map({ 'Forrest Gump': 5})
					})
				})
		};
	
		const newState = reducer(state, action);

		expect(newState).to.equal(fromJS({
			vote: {
				pair: ['Cast Away', 'Forrest Gump'],
				tally: {'Forrest Gump': 5}
			}
		}));
	
	});

	it('handles SET_STATE with plain JS payload', () => {
		const state = Map();
		const action = {
			type: 'SET_STATE',
			state: {
					vote: {
						pair: ['Cast Away', 'Forrest Gump'],
						tally: { 'Forrest Gump': 5}
					}
				}
		};
	
		const newState = reducer(state, action);

		expect(newState).to.equal(fromJS({
			vote: {
				pair: ['Cast Away', 'Forrest Gump'],
				tally: {'Forrest Gump': 5}
			}
		}));
	
	});

	it('handles SET_STATE without initial state', () => {

		const action = {
			type: 'SET_STATE',
			state: {
					vote: {
						pair: ['Cast Away', 'Forrest Gump'],
						tally: { 'Forrest Gump': 5}
					}
				}
		};
	
		const newState = reducer(undefined, action);

		expect(newState).to.equal(fromJS({
			vote: {
				pair: ['Cast Away', 'Forrest Gump'],
				tally: {'Forrest Gump': 5}
			}
		}));
	});

	it('handles VOTE by setting hasVoted', () => {
	
		const state = fromJS({
					vote: {
						pair: ['Cast Away', 'Forrest Gump'],
						tally: { 'Forrest Gump': 5}
					}

		});
		const action = {
			type: 'VOTE',
			entry: 'Forrest Gump'
		};

		const newState = reducer(state, action);

		expect(newState).to.equal(fromJS({
			vote: {
				pair: ['Cast Away', 'Forrest Gump'],
				tally: {'Forrest Gump': 5}
			},
			hasVoted: 'Forrest Gump'

		}));
	
	});

	it('does not set hasVoted for VOTE on invalid entry', () => {
		const state = fromJS({
					vote: {
						pair: ['Cast Away', 'Forrest Gump'],
						tally: { 'Forrest Gump': 5}
					}

		});
		const action = {
			type: 'VOTE',
			entry: 'Bridge Of Spies'
		};
		
		const newState = reducer(state, action);

		expect(newState).to.equal(fromJS({
			vote: {
				pair: ['Cast Away', 'Forrest Gump'],
				tally: {'Forrest Gump': 5}
			}

		}));
	
	});

	it('resets hasVoted when SET_ENTRIES selects a new pair', () => {
		const state = fromJS({
					vote: {
						pair: ['Cast Away', 'Forrest Gump'],
						tally: { 'Forrest Gump': 5}
					},
					hasVoted: 'Forrest Gump'

		});
		const action = {
			type: 'SET_STATE',
			state: {
					vote: {
						pair: ['Bridge of Spies', 'Philadelphia'],
					}
				}
		};

		const newState = reducer(state, action);

		expect(newState).to.equal(fromJS({
			vote: {
				pair: ['Bridge of Spies', 'Philadelphia'],
			}

		}));

	});

});
