import {expect} from 'chai';
import {List, Map} from 'immutable';

import makeStore from '../src/store';

describe('store', () => {

	it('is a redux store initialized with right reducer', () => {
		const store = makeStore();
		expect(store.getState()).to.equal(Map());

		const action = {type: 'SET_ENTRIES', entries: ['Catch Me If You Can', 'Cast Away']};
		store.dispatch(action);

		const nextState = store.getState();


		expect(nextState).to.equal(Map({
									entries: List.of('Catch Me If You Can', 'Cast Away')
									}));
	});
});
