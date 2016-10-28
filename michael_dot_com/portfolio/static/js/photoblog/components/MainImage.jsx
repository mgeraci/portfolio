/* global Image */

import React, { PropTypes } from "react";
import PureRenderMixin from "react-addons-pure-render-mixin";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

const MainImage = React.createClass({
	propTypes: {
		src: PropTypes.string.isRequired,
		alt: PropTypes.string.isRequired,
		loaded: PropTypes.bool,
		onLoad: PropTypes.func.isRequired,
	},

	mixins: [ PureRenderMixin ],

	getInitialState() {
		return {};
	},

	// trigger the initial load
	componentDidMount() {
		this._loadImage();
	},

	componentWillReceiveProps(nextProps) {
		if (nextProps.maxWidth && nextProps.maxHeight &&
				nextProps.maxWidth > 0 && nextProps.maxHeight > 0) {
			this.setState({
				maxWidth: nextProps.maxWidth,
				maxHeight: nextProps.maxHeight,
			});
		}
	},

	// if we get a new image source via props, trigger the new load
	componentDidUpdate(prevProps) {
		if (prevProps.src !== this.props.src) {
			this._loadImage();
		}
	},

	_loadImage() {
		const i = new Image();
		i.src = this.props.src;

		i.onload = () => {
			this.props.onLoad({
				width: i.width,
				height: i.height,
			});

			this.setState({
				width: i.width,
				height: i.height,
			});
		};
	},

	render() {
		const { src, alt, loaded } = this.props;
		const { width, height, maxWidth, maxHeight } = this.state;
		const style = {};

		if (!width || !height) {
			return null;
		}

		if (!maxWidth || !maxHeight || maxWidth <= 0 || maxHeight <= 0) {
			return null;
		}

		const ratio = height / width;
		let resWidth;
		let resHeight;

		// get a proposed set of dimensions, meant to maximize the size...
		if (width > height) {
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
			<ReactCSSTransitionGroup
					transitionName="main-image"
					transitionAppear
					transitionEnterTimeout={500}
					transitionAppearTimeout={500}
					transitionLeaveTimeout={5}>
				{loaded &&
					<img
						key={src}
						src={src}
						alt={alt}
						style={style}
					/>
				}
			</ReactCSSTransitionGroup>
		);
	},
});

export default MainImage;
