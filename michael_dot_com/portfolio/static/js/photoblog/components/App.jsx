import React, { PropTypes } from "react";
import { connect } from "react-redux";
import { setActiveImage } from "../reducer";
import ImageLink from "./ImageLink";

const App = React.createClass({
	propTypes: {
		images: PropTypes.array.isRequired,
		activeImage: PropTypes.number,
		onSetActiveImage: PropTypes.func.isRequired,
	},

	render() {
		const images = this.props.images.sort((a, b) => {
			return a.id < b.id;
		});

		return (
			<div>
				<span>{this.props.activeImage}</span>
				{images.map((image, i) =>
					<ImageLink
						key={i}
						image={image}
						setActiveImage={this.props.onSetActiveImage} />
				)}
			</div>
		);
	},
});

function mapStateToProps(state) {
	console.log(state);
	return {
		images: state.images,
		activeImage: state.activeImage,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		onSetActiveImage(id) {
			dispatch(setActiveImage(id));
		},
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);
