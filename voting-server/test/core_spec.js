import {expect} from 'chai';
import {List, Map} from 'immutable';

import {setEntries, next, vote} from '../src/core';

describe('application logic', () => {

	describe('setEntries', () => {
		
		it('add entries to state', () => {
			const entries = ['The Terminal', 'Forrest Gump', 'Catch Me If You Can', 'Cast Away'];
			let state = Map();

			let nextState = setEntries(state, entries);
			
			expect(nextState).to.equal(Map({
											entries: List.of('The Terminal', 'Forrest Gump', 'Catch Me If You Can', 'Cast Away')

											}));
		});
	});

	describe('next', () => {
		
		it('set the next voting pair', () => {
			const state = Map({
							entries: List.of('The Terminal', 'Forrest Gump', 'Catch Me If You Can', 'Cast Away')
							});

			const  nextState = next(state);
			
			expect(nextState).to.equal(Map({
										vote: Map({
												pair: List.of('The Terminal', 'Forrest Gump')
											}),
										entries: List.of('Catch Me If You Can', 'Cast Away')
										}));
		});

		it('add winner of vote back to entries and set next voting pair', () => {
			const state = Map({
							vote: Map({
								pair: List.of('The Terminal', 'Forrest Gump'),
								tally: Map({
										'The Terminal': 2,
										'Forrest Gump': 3
										})
								}),
							entries: List.of('Catch Me If You Can', 'Cast Away')

							});	
			const nextState = next(state);

			expect(nextState).to.equal(Map({
										vote: Map({
												pair: List.of('Catch Me If You Can', 'Cast Away')
											}),
										entries: List.of('Forrest Gump')

										}));	
		});

		it('add both from tied vote to entries and set next voting pair', () => {
			const state = Map({
							vote: Map({
								pair: List.of('The Terminal', 'Forrest Gump'),
								tally: Map({
										'The Terminal': 3,
										'Forrest Gump': 3
										})
								}),
							entries: List.of('Catch Me If You Can', 'Cast Away')

							});	
			const nextState = next(state);

			expect(nextState).to.equal(Map({
										vote: Map({
												pair: List.of('Catch Me If You Can', 'Cast Away')
											}),
										entries: List.of('The Terminal', 'Forrest Gump')

										}));	

		});

		it('set winner when only one entry remains', () => {
			const state = Map({
							vote: Map({
								pair: List.of('The Terminal', 'Forrest Gump'),
								tally: Map({
										'The Terminal': 2,
										'Forrest Gump': 5
										})
								}),
							entries: List()

							}); 		

			const nextState = next(state);

			expect(nextState).to.equal(Map({
										winner: 'Forrest Gump'
										}));
		});
	});

	describe('vote', () => {
		
		it('vote when no tally set',  () => {
	
			const state = Map({
							vote: Map({
									pair: List.of('The Terminal', 'Forrest Gump')
									}),
							entries: List.of('Catch Me If You Can', 'Cast Away')
							});
			const nextState = vote(state, 'Forrest Gump');

			expect(nextState).to.equal(Map({
										vote: Map({
												pair: List.of('The Terminal', 'Forrest Gump'),
												tally: Map({
														'Forrest Gump': 1
														})
												}),
										entries: List.of('Catch Me If You Can', 'Cast Away')
										}));
		});

		it('add to already created tally for an entry', () => {

			const state = Map({
							vote: Map({
									pair: List.of('The Terminal', 'Forrest Gump'),
									tally: Map({
											'The Terminal': 2,
											'Forrest Gump': 3
											})
									}),
							entries: List.of('Catch Me If You Can', 'Cast Away')
							});
			const nextState = vote(state, 'Forrest Gump');

			expect(nextState).to.equal(Map({
										vote: Map({
												pair: List.of('The Terminal', 'Forrest Gump'),
												tally: Map({
														'The Terminal': 2,
														'Forrest Gump': 4
														})
												}),
										entries: List.of('Catch Me If You Can', 'Cast Away')
										}));
		
		});
	});
})
