/* global Image */

import React, { PropTypes } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

const MainImage = React.createClass({
	propTypes: {
		src: PropTypes.string.isRequired,
		alt: PropTypes.string.isRequired,
	},

	getInitialState() {
		return { loaded: false };
	},

	// trigger the initial load
	componentDidMount() {
		this._loadImage();
	},

	// if we get a new image source via props, reset the loading state
	componentWillReceiveProps(nextProps) {
		if (nextProps.src !== this.props.src) {
			this.setState({ loaded: false });
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
			this.setState({ loaded: true });
		};
	},

	render() {
		console.log(this.state.loaded);

		return (
			<div>
				{!this.state.loaded &&
					<span>loading</span>
				}
				{this.state.loaded &&
					<ReactCSSTransitionGroup
							transitionName="main-image"
							transitionAppear
							transitionEnterTimeout={500} >
						<img
							key={this.props.src}
							src={this.props.src}
							alt={this.props.alt}
						/>
					</ReactCSSTransitionGroup>
				}
			</div>
		);
	},
});

export default MainImage;
