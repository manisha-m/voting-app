import React from 'react';

export default React.createClass({
	render: function () {
		console.log("In Voting component");
		return <div className='voting'>
				{this.props.pair.map(entry => 
					<button key={entry}> 
						<h1>{entry}</h1>
					</button>
					)}
			    </div>;
	}
});
