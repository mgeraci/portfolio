/* global Image */

import React, { PropTypes } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

import "./Thumbnail.sass";

const Thumbnail = React.createClass({
	propTypes: {
		image: PropTypes.object.isRequired,
		setActiveImage: PropTypes.func.isRequired,
		hasActiveImage: PropTypes.bool,
	},

	getInitialState() {
		return { loaded: false };
	},

	componentDidMount() {
		// trigger the initial load if we aren't showing an image modal
		if (!this.props.hasActiveImage) {
			this._loadImage();
		}
	},

	componentWillReceiveProps(nextProps) {
		if (this.thumbnail === null) {
			return;
		}

		const top = this.thumbnail.getBoundingClientRect().top + nextProps.scrollTop;
		const isVisible = top >= (nextProps.scrollTop - 200) &&
			top < (nextProps.scrollBottom + 200);

		// if we are turning visible, kick off a load
		if (!this.state.isVisible && isVisible && !this.props.hasActiveImage) {
			this._loadImage(true);
		}

		this.setState({ isVisible });
	},

	// if we close an active image modal, load
	componentDidUpdate(prevProps) {
		if (prevProps.hasActiveImage !== this.props.hasActiveImage &&
				this.state.isVisible) {
			this._loadImage();
		}
	},

	_loadImage(force = false) {
		if (this.state.loaded || (!this.state.isVisible && !force)) {
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
					ref={(c) => { this.thumbnail = c; }}
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
