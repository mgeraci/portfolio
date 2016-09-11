import React, { PropTypes } from "react";
import { connect } from "react-redux";

const App = React.createClass({
	propTypes: {
		images: PropTypes.array.isRequired,
	},

	render() {
		return (
			<div>
				{this.props.images.map((image, i) =>
					<img
						key={i}
						src={image.thumbnail}
						alt={`A thumbnail of ${image.title}`}
					/>
				)}
			</div>
		);
	},
});

function mapStateToProps(state) {
	return {
		images: state.images,
	};
}

export default connect(
	mapStateToProps,
	null
)(App);
