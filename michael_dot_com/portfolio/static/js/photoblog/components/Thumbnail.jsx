import React, { PropTypes } from "react";

const Thumbnail = React.createClass({
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
					className="page-photography-thumbnail"
					href={`/photography/blog/${this.props.image.id}`}
					onClick={this._handleClick}>
				<img
					className="page-photography-thumbnail-image"
					src={this.props.image.thumbnail}
					alt={`A thumbnail of ${this.props.image.title}`}
				/>
			</a>
		);
	},
});

export default Thumbnail;
