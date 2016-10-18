import React, { PropTypes } from "react";
import { connect } from "react-redux";

import {
	clearFilterTag,
} from "../reducer";

const Title = React.createClass({
	propTypes: {
		filteredTerm: PropTypes.string,
		onClearFilterTag: PropTypes.func.isRequired,
	},

	render() {
		return (
			<h2 className="page-photography-meta-title">
				{this.props.filteredTerm &&
					<span>
						Images tagged
						&nbsp;
						<em>{this.props.filteredTerm}</em>

						<button
								className="page-photography-meta-title-clear"
								onClick={this.props.onClearFilterTag}>
							remove filter
						</button>
					</span>
				}

				{!this.props.filteredTerm &&
					<span>Photoblog</span>
				}
			</h2>
		);
	},
});

function mapStateToProps(state) {
	return {
		filteredTerm: state.filteredTerm,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		onClearFilterTag(tag) {
			dispatch(clearFilterTag(tag));
		},
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Title);
