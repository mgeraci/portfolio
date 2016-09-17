import React, { PropTypes } from "react";
import { connect } from "react-redux";
import { setActiveImage, clearActiveImage } from "../reducer";
import ImageLink from "./ImageLink";
import ImageDetail from "./ImageDetail";

const App = React.createClass({
	propTypes: {
		order: PropTypes.array.isRequired,
		images: PropTypes.object.isRequired,
		activeImage: PropTypes.number,
		onSetActiveImage: PropTypes.func.isRequired,
		onClearActiveImage: PropTypes.func.isRequired,
	},

	render() {
		return (
			<div>
				{this.props.order.map(id =>
					<ImageLink
						key={id}
						image={this.props.images[id]}
						setActiveImage={this.props.onSetActiveImage}
						clearActiveImage={this.props.onClearActiveImage}
					/>
				)}

				{this.props.activeImage &&
					<ImageDetail
						image={this.props.images[this.props.activeImage]}
						clearActiveImage={this.props.onClearActiveImage}
					/>
				}
			</div>
		);
	},
});

function mapStateToProps(state) {
	return {
		images: state.images,
		order: state.order,
		activeImage: state.activeImage,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		onSetActiveImage(id) {
			dispatch(setActiveImage(id));
		},
		onClearActiveImage() {
			dispatch(clearActiveImage());
		},
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);
