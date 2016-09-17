import React, { PropTypes } from "react";

const ImageLink = React.createClass({
	propTypes: {
		image: PropTypes.object.isRequired,
		setActiveImage: PropTypes.func.isRequired,
	},

	_handleClick(e) {
		e.preventDefault();
		this.props.setActiveImage(this.props.image.id);
	},

	render() {
		return (
			<a
					href={`/photography/blog/${this.props.image.id}`}
					onClick={this._handleClick}>
				<img
					src={this.props.image.thumbnail}
					alt={`A thumbnail of ${this.props.image.title}`}
				/>
			</a>
		);
	},
});

export default ImageLink;
