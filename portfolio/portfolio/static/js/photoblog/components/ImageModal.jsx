/* global window, document */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import throttle from "throttle-debounce/throttle";

import {
	clearActiveImage,
	navigatePrev,
	navigateNext,
	filterTag,
} from "../reducer";

import {
	KEYS,
	MAIN_IMAGE_SPACE,
	PHOTOBLOG_MOBILE_BREAKPOINT,
} from "../util/constants";

import Buttons from "./modal/Buttons.jsx";
import MainImage from "./modal/MainImage.jsx";
import Meta from "./modal/Meta.jsx";
import Swipeable from "./Swipeable.jsx";

import "./ImageModal.sass";

const initialState = {
	isLoaded: false,
};

class ImageDetail extends Component {
	static propTypes = {
		image: PropTypes.object.isRequired,
		atBeginning: PropTypes.bool,
		atEnd: PropTypes.bool,

		onClearActiveImage: PropTypes.func.isRequired,
		onNavigatePrev: PropTypes.func.isRequired,
		onNavigateNext: PropTypes.func.isRequired,
		onFilterTag: PropTypes.func.isRequired,
	};

	static defaultProps = {
		atBeginning: false,
		atEnd: false,
	};

	state = initialState;

	componentDidMount() {
		this._throttledResize = throttle(200, this._onResize);

		document.addEventListener("keyup", this._onKeyup);
		window.addEventListener("resize", this._throttledResize);
		document.body.classList.add("no-scroll");

		// trigger an initial resize event
		this._onResize();
	}

	componentWillReceiveProps(nextProps) {
		const { image } = this.props;

		if (nextProps.image.id !== image.id) {
			this.setState(initialState);
		}
	}

	componentWillUnmount() {
		document.removeEventListener("keyup", this._onKeyup);
		window.removeEventListener("resize", this._throttledResize);
		document.body.classList.remove("no-scroll");

		// change the scroll to trigger thumbnails to load
		window.scrollTo(0, window.scrollY - 1);
		window.scrollTo(0, window.scrollY + 1);
	}

	_onKeyup = (e) => {
		const { onClearActiveImage, onNavigatePrev, onNavigateNext } = this.props;
		const { isLoaded } = this.state;

		const code = e.which;

		if (code === KEYS.escape) {
			onClearActiveImage();
		}

		if (!isLoaded) {
			return;
		}

		if (code === KEYS.left) {
			onNavigatePrev();
		} else if (code === KEYS.right) {
			onNavigateNext();
		}
	}

	_onResize = () => {
		this.setState({
			windowWidth: window.innerWidth,
			windowHeight: window.innerHeight,
		});
	}

	_onImageLoad = (dimensions) => {
		this.setState({
			isLoaded: true,
			dimensions,
		});
	}

	render() {
		const {
			image,
			atEnd,
			atBeginning,
			onNavigatePrev,
			onNavigateNext,
			onFilterTag,
		} = this.props;
		const { windowWidth, windowHeight, dimensions, isLoaded } = this.state;

		const contentStyle = {};
		const isMobile = windowWidth < PHOTOBLOG_MOBILE_BREAKPOINT;
		let topPadding = MAIN_IMAGE_SPACE;
		let sidePadding = MAIN_IMAGE_SPACE;
		const bottomPadding = MAIN_IMAGE_SPACE;
		let src = image.image2000;

		if (isMobile) {
			sidePadding = 5;
			topPadding = MAIN_IMAGE_SPACE * 1.5;
			src = image.image700;
		}

		// don't load any image if we don't have a window size yet
		if (!windowWidth) {
			src = null;
		}

		// keep images from getting bigger than their native size
		if (dimensions) {
			contentStyle.maxWidth = dimensions.width;
			contentStyle.maxHeight = dimensions.height;
		}

		const spaceStyle = {
			top: `${topPadding}px`,
			right: `${sidePadding}px`,
			bottom: `${bottomPadding}px`,
			left: `${sidePadding}px`,
		};

		const imageMaxWidth = windowWidth - (sidePadding * 2);
		const imageMaxHeight = windowHeight - topPadding - bottomPadding;

		return (
			<div className="image-modal" key={image.title}>
				<Swipeable
					canSwipeLeft={!atEnd}
					canSwipeRight={!atBeginning}
					onSwipeLeft={onNavigateNext}
					onSwipeRight={onNavigatePrev}
				>

					<div className="image-modal-space" style={spaceStyle}>
						<div className="image-modal-content" style={contentStyle}>
							<MainImage
								src={src}
								alt={image.title}
								maxWidth={imageMaxWidth}
								maxHeight={imageMaxHeight}
								loaded={isLoaded}
								onLoad={this._onImageLoad}
							/>

							{!isLoaded &&
								<div className="loader" />
							}

							<TransitionGroup>
								{isLoaded &&
									<CSSTransition
										key={image.id}
										classNames="main-image"
										timeout={500}
									>
										<Meta
											title={image.title}
											year={image.year}
											tags={image.tags}
											filterTag={onFilterTag}
										/>
									</CSSTransition>
								}
							</TransitionGroup>
						</div>
					</div>

				</Swipeable>

				<Buttons
					atBeginning={atBeginning}
					atEnd={atEnd}
					isMobile={isMobile}
				/>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		atBeginning: state.atBeginning,
		atEnd: state.atEnd,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		onClearActiveImage() {
			dispatch(clearActiveImage());
		},
		onNavigatePrev() {
			dispatch(navigatePrev());
		},
		onNavigateNext() {
			dispatch(navigateNext());
		},
		onFilterTag(tag) {
			dispatch(filterTag(tag));
		},
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ImageDetail);
