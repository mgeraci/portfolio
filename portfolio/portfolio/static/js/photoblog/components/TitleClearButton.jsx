import React, { PropTypes } from "react";

const TitleClearButton = React.createClass({
	propTypes: {
		clearFilterTag: PropTypes.func.isRequired,
	},

	render() {
		return (
			<button
					className="page-photography-meta-title-clear"
					onClick={this.props.clearFilterTag}>
				remove filter
			</button>
		);
	},
});

export default TitleClearButton;
