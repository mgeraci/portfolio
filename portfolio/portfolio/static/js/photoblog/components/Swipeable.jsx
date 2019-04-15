/* global window, document */

import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const EDGE_BUFFER = 60;
const SPEED_BUFFER = 0.5;
const SWIPE_OFF_TIME_ADJUSTMENT = 2.2; // bigger == slower
const DIRECTIONS = {
	left: "left",
	right: "right",
};

class Swipeable extends Component {
	static propTypes = {
		children: PropTypes.node.isRequired,
		onSwipeLeft: PropTypes.func.isRequired,
		onSwipeRight: PropTypes.func.isRequired,
		canSwipeLeft: PropTypes.bool.isRequired,
		canSwipeRight: PropTypes.bool.isRequired,
	}

	state = {
		origin: null,
		current: null,
		offscreenLeft: false,
		offscreenRight: false,
	};

	componentDidMount() {
		document.addEventListener("touchstart", this._onTouchStart);
		document.addEventListener("touchmove", this._onTouchMove);
		document.addEventListener("touchend", this._onTouchEnd);
	}

	componentWillUnmount() {
		document.removeEventListener("touchstart", this._onTouchStart);
		document.removeEventListener("touchmove", this._onTouchMove);
		document.removeEventListener("touchend", this._onTouchEnd);
	}

	_onTouchStart = (e) => {
		this.setState({
			origin: e.touches[0].pageX,
			originTime: Date.now(),
			current: null,
			transitionTime: null,
			isTouching: true,
		});
	}

	_onTouchMove = (e) => {
		e.preventDefault();

		this.setState({
			current: e.touches[0].pageX,
		});
	}

	_getDirection = () => {
		const { origin, current } = this.state;

		if (origin === null || current === null) {
			return false;
		}

		if (current - origin > 0) {
			return DIRECTIONS.right;
		} else {
			return DIRECTIONS.left;
		}
	}

	// returns the speed of the swipe, in pixels per millisecond
	_getSpeed = () => {
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
	}

	// when the touch has ended, determine if the swipe should trigger a next or
	// previous action. trigger, if either:
	// - the release location is close to the edge of the screen
	// - the swipe speed was fast
	_onTouchEnd = () => {
		const { canSwipeLeft, canSwipeRight } = this.props;
		const { current } = this.state;
		const speed = this._getSpeed();
		let offscreenLeft = current < EDGE_BUFFER;
		let offscreenRight = window.innerWidth - current < EDGE_BUFFER;
		let time = null;

		if (speed > SPEED_BUFFER) {
			const direction = this._getDirection();
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
	}

	_getStyle = () => {
		const style = {};
		const { onSwipeLeft, onSwipeRight } = this.props;
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
			this._dispatchEvent(onSwipeLeft);
		} else if (offscreenRight) {
			style.transform = "translateX(100%)";
			style.transitionDuration = `${transitionTime}ms`;
			this._dispatchEvent(onSwipeRight);
		} else {
			let offset = 0;

			if (origin !== null && current !== null) {
				offset = (origin - current) * -1;
			}

			style.transform = `translateX(${offset}px)`;
		}

		return style;
	}

	_dispatchEvent = (func) => {
		if (this.isDispatching) {
			return;
		}

		this.isDispatching = true;

		setTimeout(() => {
			func();
		}, 250);
	}

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
	}
}

export default Swipeable;
