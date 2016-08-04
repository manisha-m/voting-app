import {expect} from 'chai';
import {List, Map} from 'immutable';

import {setEntries} from '../src/core';

describe('application logic', () => {

	describe('setEntries', () => {
		
		it('add entries to state', () => {
			const entries = ['Shawshank Redemption', 'Forrest Gump', 'Catch Me If You Can', 'Cast Away'];
			let state = Map();

			let nextState = setEntries(state, entries);
			
			expect(nextState).to.equal(Map({
											entries: List.of('Shawshank Redemption', 'Forrest Gump', 'Catch Me If You Can', 'Cast Away')

											}));
		});
	});
})
