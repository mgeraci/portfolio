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
		const style = {};

		if (this.state.width && this.state.height) {
			if (this.state.width > this.state.height) {
				style.width = "100%";
				style.height = "auto";
			} else {
				style.width = "auto";
				style.height = "100%";
			}
		}

		return (
			<ReactCSSTransitionGroup
					transitionName="main-image"
					transitionAppear
					transitionEnterTimeout={500}
					transitionAppearTimeout={500}
					transitionLeaveTimeout={5}>
				{this.props.loaded &&
					<img
						key={this.props.src}
						src={this.props.src}
						alt={this.props.alt}
						style={style}
					/>
				}
			</ReactCSSTransitionGroup>
		);
	},
});

export default MainImage;
