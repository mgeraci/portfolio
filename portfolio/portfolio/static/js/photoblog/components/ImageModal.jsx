/* global window, document */

import React, { PropTypes } from "react";
import jQuery from "jquery";
import { connect } from "react-redux";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
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

import ImageModalButtons from "./ImageModalButtons";
import MainImage from "./MainImage";
import ImageMeta from "./ImageMeta";
import Swipeable from "./Swipeable";


const initialState = {
	isLoaded: false,
	metaHeight: 0,
};

const ImageDetail = React.createClass({
	propTypes: {
		image: PropTypes.object.isRequired,
		atBeginning: PropTypes.bool,
		atEnd: PropTypes.bool,

		onClearActiveImage: PropTypes.func.isRequired,
		onNavigatePrev: PropTypes.func.isRequired,
		onNavigateNext: PropTypes.func.isRequired,
		onFilterTag: PropTypes.func.isRequired,
	},

	getInitialState() {
		return initialState;
	},

	componentDidMount() {
		this._throttledResize = throttle(200, this._onResize);

		document.addEventListener("keyup", this._onKeyup);
		window.addEventListener("resize", this._throttledResize);
		jQuery("body").addClass("no-scroll");

		// trigger an initial resize event
		this._onResize();
	},

	componentWillReceiveProps(nextProps) {
		if (nextProps.image.id !== this.props.image.id) {
			this.setState(initialState);
		}
	},

	componentWillUnmount() {
		document.removeEventListener("keyup", this._onKeyup);
		window.removeEventListener("resize", this._throttledResize);
		jQuery("body").removeClass("no-scroll");
	},

	_onKeyup(e) {
		const code = e.which;

		if (code === KEYS.escape) {
			this.props.onClearActiveImage();
		}

		if (!this.state.isLoaded) {
			return;
		}

		if (code === KEYS.left) {
			this.props.onNavigatePrev();
		} else if (code === KEYS.right) {
			this.props.onNavigateNext();
		}
	},

	_onResize() {
		this.setState({
			windowWidth: window.innerWidth,
			windowHeight: window.innerHeight,
		});
	},

	_onImageLoad(dimensions) {
		this.setState({
			isLoaded: true,
			dimensions,
		});
	},

	_onImageMetaRender(height) {
		this.setState({ metaHeight: height });
	},

	render() {
		const { image } = this.props;

		const contentStyle = {};
		const isMobile = this.state.windowWidth < PHOTOBLOG_MOBILE_BREAKPOINT;
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
		if (!this.state.windowWidth) {
			src = null;
		}

		// keep images from getting bigger than their native size
		if (this.state.dimensions) {
			contentStyle.maxWidth = this.state.dimensions.width;
			contentStyle.maxHeight = this.state.dimensions.height;
		}

		const spaceStyle = {
			top: `${topPadding}px`,
			right: `${sidePadding}px`,
			bottom: `${bottomPadding}px`,
			left: `${sidePadding}px`,
		};

		const imageMaxWidth = this.state.windowWidth - (sidePadding * 2);
		const imageMaxHeight = this.state.windowHeight - topPadding - bottomPadding;

		return (
			<div className="page-photography-main" key={image.title}>
				<Swipeable
						canSwipeLeft={!this.props.atEnd}
						canSwipeRight={!this.props.atBeginning}
						onSwipeLeft={this.props.onNavigateNext}
						onSwipeRight={this.props.onNavigatePrev}>

					<div className="page-photography-main-space" style={spaceStyle}>
						<div className="page-photography-main-content" style={contentStyle}>
							{src &&
								<MainImage
									src={src}
									alt={image.title}
									maxWidth={imageMaxWidth}
									maxHeight={imageMaxHeight}
									loaded={this.state.isLoaded}
									onLoad={this._onImageLoad}
								/>
							}

							{!this.state.isLoaded &&
								<div className="loader" />
							}

							<ReactCSSTransitionGroup
									transitionName="main-image"
									transitionAppear
									transitionEnterTimeout={500}
									transitionAppearTimeout={500}
									transitionLeaveTimeout={5}>
								{this.state.isLoaded &&
									<ImageMeta
										key={image.id}
										title={image.title}
										year={image.year}
										tags={image.tags}
										onRender={this._onImageMetaRender}
										filterTag={this.props.onFilterTag}
									/>
								}
							</ReactCSSTransitionGroup>
						</div>
					</div>

				</Swipeable>

				<ImageModalButtons
					atBeginning={this.props.atBeginning}
					atEnd={this.props.atEnd}
					isMobile={isMobile}
				/>
			</div>
		);
	},
});

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
