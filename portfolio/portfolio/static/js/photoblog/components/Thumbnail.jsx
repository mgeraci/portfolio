/* global Image */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import "./Thumbnail.sass";

class Thumbnail extends Component {
	static propTypes = {
		image: PropTypes.object.isRequired,
		setActiveImage: PropTypes.func.isRequired,
		scrollTop: PropTypes.number,
		scrollBottom: PropTypes.number,
		hasActiveImage: PropTypes.bool,
	}

	static defaultProps = {
		scrollTop: null,
		scrollBottom: null,
		hasActiveImage: false,
	};

	state = { loaded: false };

	componentDidMount() {
		const { hasActiveImage } = this.props;

		// trigger the initial load if we aren't showing an image modal
		if (!hasActiveImage) {
			this._loadImage();
		}
	}

	componentWillReceiveProps(nextProps) {
		const { hasActiveImage } = this.props;
		const { isVisible } = this.state;

		if (this.thumbnail === null) {
			return;
		}

		const top = this.thumbnail.getBoundingClientRect().top + nextProps.scrollTop;
		const thumbIsVisible = top >= (nextProps.scrollTop - 200) &&
			top < (nextProps.scrollBottom + 200);

		// if we are turning visible, kick off a load
		if (!isVisible && thumbIsVisible && !hasActiveImage) {
			this._loadImage(true);
		}

		this.setState({ isVisible });
	}

	// if we close an active image modal, load
	componentDidUpdate(prevProps) {
		const { hasActiveImage } = this.props;
		const { isVisible } = this.state;

		if (
			prevProps.hasActiveImage !== hasActiveImage &&
			isVisible
		) {
			this._loadImage();
		}
	}

	_loadImage = (force = false) => {
		const { image } = this.props;
		const { loaded, isVisible } = this.state;

		if (loaded || (!isVisible && !force)) {
			return;
		}

		const i = new Image();
		i.src = image.thumbnail;

		i.onload = () => {
			this.setState({ loaded: true });
		};
	}

	_handleClick = (e) => {
		const { setActiveImage, image } = this.props;

		e.preventDefault();
		setActiveImage(image.id);
	}

	render() {
		const { image } = this.props;
		const { loaded } = this.state;

		return (
			<a
				className="page-photography-thumbnail"
				ref={(c) => { this.thumbnail = c; }}
				href={`/photography/blog/${image.id}`}
				onClick={this._handleClick}
			>
				<TransitionGroup>
					{loaded &&
						<CSSTransition
							classNames="main-image"
							timeout={500}
						>
							<img
								className="page-photography-thumbnail-image"
								key={image.thumbnail}
								src={image.thumbnail}
								alt={image.title}
							/>
						</CSSTransition>
					}
				</TransitionGroup>
			</a>
		);
	}
}

export default Thumbnail;
