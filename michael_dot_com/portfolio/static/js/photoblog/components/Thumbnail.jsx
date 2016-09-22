/* global Image */

import React, { PropTypes } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

const Thumbnail = React.createClass({
	propTypes: {
		image: PropTypes.object.isRequired,
		setActiveImage: PropTypes.func.isRequired,
		hasActiveImage: PropTypes.bool,
	},

	getInitialState() {
		return { loaded: false };
	},

	// trigger the initial load
	componentDidMount() {
		if (!this.props.hasActiveImage) {
			this._loadImage();
		}
	},

	// if we close an active image modal, load
	componentDidUpdate(prevProps) {
		if (prevProps.hasActiveImage !== this.props.hasActiveImage) {
			this._loadImage();
		}
	},

	_loadImage() {
		if (this.state.loaded) {
			return;
		}

		const i = new Image();
		i.src = this.props.image.thumbnail;

		i.onload = () => {
			this.setState({ loaded: true });
		};
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
				<ReactCSSTransitionGroup
						transitionName="main-image"
						transitionAppear
						transitionEnterTimeout={500}
						transitionAppearTimeout={500}
						transitionLeaveTimeout={500}>
					{this.state.loaded &&
						<img
							className="page-photography-thumbnail-image"
							key={this.props.image.thumbnail}
							src={this.props.image.thumbnail}
							alt={this.props.image.title}
						/>
					}
				</ReactCSSTransitionGroup>
			</a>
		);
	},
});

export default Thumbnail;
