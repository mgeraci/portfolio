/* global window, document */

import React, { PropTypes } from "react";
import classnames from "classnames";

const EDGE_BUFFER = 60;
const SPEED_BUFFER = 0.5;
const SWIPE_OFF_TIME_ADJUSTMENT = 2; // bigger == slower
const DIRECTIONS = {
	left: "left",
	right: "right",
};

const Swipeable = React.createClass({
	propTypes: {
		children: PropTypes.node.isRequired,
		onSwipeLeft: PropTypes.func.isRequired,
		onSwipeRight: PropTypes.func.isRequired,
		canSwipeLeft: PropTypes.bool.isRequired,
		canSwipeRight: PropTypes.bool.isRequired,
	},

	getInitialState() {
		return {
			origin: null,
			current: null,
			offscreenLeft: false,
			offscreenRight: false,
		};
	},

	componentDidMount() {
		document.addEventListener("touchstart", this._onTouchStart);
		document.addEventListener("touchmove", this._onTouchMove);
		document.addEventListener("touchend", this._onTouchEnd);
	},

	componentWillUnmount() {
		document.removeEventListener("touchstart", this._onTouchStart);
		document.removeEventListener("touchmove", this._onTouchMove);
		document.removeEventListener("touchend", this._onTouchEnd);
	},

	_onTouchStart(e) {
		this.setState({
			origin: e.touches[0].pageX,
			originTime: Date.now(),
			current: null,
			transitionTime: null,
			isTouching: true,
		});
	},

	_onTouchMove(e) {
		this.setState({
			current: e.touches[0].pageX,
		});
	},

	_getDirection() {
		const { origin, current } = this.state;

		if (origin === null || current === null) {
			return false;
		}

		if (current - origin > 0) {
			return DIRECTIONS.right;
		} else {
			return DIRECTIONS.left;
		}
	},

	// returns the speed of the swipe, in pixels per millisecond
	_getSpeed() {
		const { origin, originTime, current } = this.state;
		if (origin === null || current === null) {
			return false;
		}

		const time = Date.now() - originTime;
		let distance = current - origin;

		if (distance < 0) {
			distance *= -1;
		}

		return distance / time;
	},

	// when the touch has ended, determine if the swipe should trigger a next or
	// previous action. trigger, if either:
	// - the release location is close to the edge of the screen
	// - the swipe speed was fast
	_onTouchEnd() {
		const { canSwipeLeft, canSwipeRight } = this.props;
		const speed = this._getSpeed();
		let offscreenLeft = this.state.current < EDGE_BUFFER;
		let offscreenRight = window.innerWidth - this.state.current < EDGE_BUFFER;
		let time = null;

		if (speed > SPEED_BUFFER) {
			const direction = this._getDirection();
			const { current } = this.state;
			let distance;

			if (direction === DIRECTIONS.left) {
				offscreenLeft = true;
				distance = current;
			} else if (direction === DIRECTIONS.right) {
				offscreenRight = true;
				distance = window.innerWidth - current;
			}

			time = (distance / speed) * SWIPE_OFF_TIME_ADJUSTMENT;
		}

		// cancel the swipe if we aren't allowed to
		if (offscreenLeft && !canSwipeLeft) {
			offscreenLeft = false;
		}

		if (offscreenRight && !canSwipeRight) {
			offscreenRight = false;
		}

		this.setState({
			origin: null,
			originTime: null,
			isTouching: false,
			offscreenLeft,
			offscreenRight,
			transitionTime: time,
		});
	},

	_getStyle() {
		const style = {};
		const {
			origin,
			current,
			offscreenLeft,
			offscreenRight,
			transitionTime,
		} = this.state;

		if (offscreenLeft) {
			style.transform = "translateX(-100%)";
			style.transitionDuration = `${transitionTime}ms`;
			this._dispatchEvent(this.props.onSwipeLeft);
		} else if (offscreenRight) {
			style.transform = "translateX(100%)";
			style.transitionDuration = `${transitionTime}ms`;
			this._dispatchEvent(this.props.onSwipeRight);
		} else {
			let offset = 0;

			if (origin !== null && current !== null) {
				offset = (origin - current) * -1;
			}

			style.transform = `translateX(${offset}px)`;
		}

		return style;
	},

	_dispatchEvent(func) {
		setTimeout(() => {
			func();
		}, 250);
	},

	render() {
		const { children } = this.props;
		const { isTouching } = this.state;

		const classes = {
			"swipeable": true,
			"swipeable--is-touching": isTouching,
		};

		return (
			<div className={classnames(classes)} style={this._getStyle()}>
				{children}
			</div>
		);
	},
});

export default Swipeable;
