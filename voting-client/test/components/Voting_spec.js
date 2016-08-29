import React from 'react';
import ReactDOM from 'react-dom';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithTag,
  Simulate
} from 'react-addons-test-utils';
import {Voting} from '../../src/components/Voting';
import {expect} from 'chai';

describe('Voting', () => {
	
	it('renders a pair of buttons', () => {
		const component = renderIntoDocument(
			<Voting pair={["The Terminal", "Forrest Gump"]} />
		);
		
		const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

		expect(buttons.length).to.equal(2);
		expect(buttons[0].textContent).to.equal("The Terminal");
		expect(buttons[1].textContent).to.equal("Forrest Gump");
		
	});

	it('invokes callback when button is clicked', () => {
		let votedWith;
		const vote = (entry) => votedWith = entry;

		const component = renderIntoDocument(
			<Voting 
				pair={["The Terminal", "Forrest Gump"]} 
				vote={vote}	/>
		);
		const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

		Simulate.click(buttons[1]);

		expect(votedWith).to.equal("Forrest Gump");
		
	});

	it('disables buttons when voting is done', () => {
		const component = renderIntoDocument(
			<Voting 
				pair={["The Terminal", "Forrest Gump"]} 
				hasVoted="Forrest Gump"	/>
		);
		const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
		
		expect(buttons.length).to.equal(2);
		expect(buttons[0].hasAttribute('disabled')).to.equal(true);
		expect(buttons[1].hasAttribute('disabled')).to.equal(true);
		

	});

	it('adds label to the voted entry', () => {
		const component = renderIntoDocument(
			<Voting 
				pair={["The Terminal", "Forrest Gump"]} 
				hasVoted="Forrest Gump"	/>
		);
		const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
		
		expect(buttons[1].textContent).to.contain("Voted");
	});

	it('renders just the winner when there is one', () => {
		const component = renderIntoDocument(
			<Voting 
				pair={["The Terminal", "Forrest Gump"]} 
				winner="Forrest Gump"	/>
		);
		const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
		
		expect(buttons.length).to.equal(0);
		const winner = ReactDOM.findDOMNode(component.refs.winner);

		expect(winner).to.be.ok;
		expect(winner.textContent).to.contain('Forrest Gump');

	});
});
