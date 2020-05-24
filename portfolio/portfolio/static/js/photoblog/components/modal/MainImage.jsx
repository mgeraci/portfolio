/* global Image */

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import "./MainImage.sass";

class MainImage extends PureComponent {
	static propTypes = {
		src: PropTypes.string,
		alt: PropTypes.string.isRequired,
		onLoad: PropTypes.func.isRequired,
		loaded: PropTypes.bool,
		maxWidth: PropTypes.number,
		maxHeight: PropTypes.number,
	};

	static defaultProps = {
		src: null,
		loaded: false,
		maxWidth: null,
		maxHeight: null,
	};

	state = {
		width: 0,
		height: 0,
	};

	// trigger the initial load
	componentDidMount() {
		this._loadImage();
	}

	componentWillReceiveProps(nextProps) {
		if (
			nextProps.maxWidth && nextProps.maxHeight &&
			nextProps.maxWidth > 0 && nextProps.maxHeight > 0
		) {
			this.setState({
				maxWidth: nextProps.maxWidth,
				maxHeight: nextProps.maxHeight,
			});
		}
	}

	// if we get a new image source via props, trigger the new load
	componentDidUpdate(prevProps) {
		const { src } = this.props;

		if (prevProps.src !== src) {
			this._loadImage();
		}
	}

	_loadImage = () => {
		const { src, onLoad } = this.props;

		const i = new Image();
		i.src = src;

		i.onload = () => {
			onLoad({
				width: i.width,
				height: i.height,
			});

			this.setState({
				width: i.width,
				height: i.height,
			});
		};
	}

	render() {
		const { src, alt, loaded } = this.props;
		const { width, height, maxWidth, maxHeight } = this.state;
		const style = {};

		const ratio = height / width;
		let resWidth;
		let resHeight;

		// get a proposed set of dimensions, meant to maximize the size...
		if (!width || !height) {
			resWidth = 0;
			resHeight = 0;
		} else if (width > height) {
			resWidth = maxWidth;
			resHeight = resWidth * ratio;
		} else {
			resHeight = maxHeight;
			resWidth = resHeight / ratio;
		}

		// ...but if the height is bigger than the available height, or the width
		// is bigger than the available width, keep the size in bounds.
		if (resHeight > maxHeight) {
			style.width = "auto";
			style.height = `${maxHeight}px`;
		} else if (resWidth > maxWidth) {
			style.width = `${maxWidth}px`;
			style.height = "auto";
		} else {
			style.width = resWidth;
			style.height = resHeight;
		}

		return (
			<div className="image-modal-content-image">
				<TransitionGroup>
					{loaded &&
						<CSSTransition
							key={src}
							classNames="main-image"
							timeout={500}
						>
							<img
								src={src}
								alt={alt}
								style={style}
							/>
						</CSSTransition>
					}
				</TransitionGroup>
			</div>
		);
	}
}

export default MainImage;
