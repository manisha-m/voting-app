import React from 'react';
import Vote from './Vote';
import Winner from './Winner';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
	mixins: [PureRenderMixin],
	render: function () {
		return <div className='voting'>
				{this.props.winner ? 
					<Winner ref='winner' winner={this.props.winner} /> :
					<Vote {...this.props} />
				}
			    </div>;
	}
});
