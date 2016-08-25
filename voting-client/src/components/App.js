import React from 'react';
import {List, Map} from 'immutable';

const pair = List.of('The Terminal', 'Forrest Gump');
const tally = Map({'Forrest Gump': 7});

export default React.createClass({
  render: function() {
    return React.cloneElement(this.props.children, {
				pair: pair,
				tally: tally
				});
  }
});
