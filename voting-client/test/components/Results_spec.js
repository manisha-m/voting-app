
import React from 'react';
import ReactDOM from 'react-dom';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithClass,
  findRenderedDOMComponentWithClass,
  Simulate
} from 'react-addons-test-utils';
import Results from '../../src/components/Results';
import {expect} from 'chai';
import {List, Map} from 'immutable';


describe('Results', () => {

	it('renders results with vote counts or zero', () => {
		const pair = List.of("The Terminal", "Forrest Gump");
		const tally = Map({'Forrest Gump': 5});

		const component = renderIntoDocument(
			<Results 
				pair={pair}
				tally={tally}/>
		);

		const entries = scryRenderedDOMComponentsWithClass(component, 'entry');
	    const [terminal, forrest] = entries.map(e => e.textContent);
	
		expect(entries.length).to.equal(2);
		expect(terminal).to.contain("The Terminal");
		expect(terminal).to.contain(0);
		expect(forrest).to.contain("Forrest Gump");
		expect(forrest).to.contain(5);
	});

	it('invokes next callback when next is clicked', () => {
		let nextInvoked = false;
		const next = () => nextInvoked = true;

		const pair = List.of("The Terminal", "Forrest Gump");
		const tally = Map({'Forrest Gump': 5});

		const component = renderIntoDocument(
			<Results 
				pair={pair}
				tally={tally}
				next={next}/>
		);

		const nextButton = findRenderedDOMComponentWithClass(component, 'next');

		Simulate.click(nextButton);

		expect(nextInvoked).to.equal(true);

	});
});
