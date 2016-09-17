import React, { PropTypes } from "react";

const ImageDetail = React.createClass({
	propTypes: {
		image: PropTypes.object.isRequired,
		clearActiveImage: PropTypes.func.isRequired,
		navigatePrev: PropTypes.func.isRequired,
		navigateNext: PropTypes.func.isRequired,
	},

	render() {
		const { image } = this.props;

		return (
			<div>
				<img src={image.image} alt={image.title} />

				<h3>{image.title}</h3>
				<span>{image.year}</span>

				<button onClick={this.props.clearActiveImage}>
					close
				</button>

				<br />

				<button onClick={this.props.navigatePrev}>
					prev
				</button>
				<button onClick={this.props.navigateNext}>
					next
				</button>
			</div>
		);
	},
});

export default ImageDetail;
