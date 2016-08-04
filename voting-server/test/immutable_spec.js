import {expect} from 'chai';
import {List} from 'immutable';

describe('immutability', () => {

	describe('A List', () => {
		
		function addMovie(currentState, movie) {
			return currentState.push(movie);
		}	    

		it('isImmutable', () => {
			let state = List.of('Shawshank Redemption', 'Forrest Gump');
			let newState = addMovie(state, 'Catch Me If You Can');

			expect(newState).to.equal(List.of('Shawshank Redemption', 'Forrest Gump', 'Catch Me If You Can'));
			expect(state).to.equal(List.of('Shawshank Redemption', 'Forrest Gump'));
		});
	});
})
