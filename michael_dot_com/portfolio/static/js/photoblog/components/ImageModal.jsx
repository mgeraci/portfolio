/* global window, document */

import React, { PropTypes } from "react";
import { connect } from "react-redux";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import throttle from "throttle-debounce/throttle";
import classnames from "classnames";

import {
	clearActiveImage,
	navigatePrev,
	navigateNext,
	filterTag,
} from "../reducer";

import MainImage from "./MainImage";
import ImageMeta from "./ImageMeta";
import {
	KEYS,
	MAIN_IMAGE_SPACE,
	ORIENTATIONS,
} from "../util/constants";

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
		this._throttledHandleResize = throttle(200, this._handleResize);

		document.addEventListener("keyup", this._handleKeyup);
		window.addEventListener("resize", this._throttledHandleResize);

		// trigger an initial resize event
		this._handleResize();
	},

	componentWillReceiveProps(nextProps) {
		if (nextProps.image.id !== this.props.image.id) {
			this.setState(initialState);
		}
	},

	componentWillUnmount() {
		document.removeEventListener("keyup", this._handleKeyup);
		window.removeEventListener("resize", this._throttledHandleResize);
	},

	_handleKeyup(e) {
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

	_handleResize() {
		this.setState({
			windowWidth: window.innerWidth,
			windowHeight: window.innerHeight,
		});
	},

	_onLoad(dimensions) {
		this.setState({
			isLoaded: true,
			dimensions,
		});
	},

	_handleMetaRender(height) {
		this.setState({ metaHeight: height });
	},

	_getOrientation() {
		if (typeof(this.state.dimensions) !== "undefined" && this.state.dimensions !== null) {
			if (this.state.dimensions.width > this.state.dimensions.height) {
				return ORIENTATIONS.landscape;
			} else {
				return ORIENTATIONS.portrait;
			}
		} else {
			return null;
		}
	},

	render() {
		const { image } = this.props;

		// const orientation = this._getOrientation();
		const contentStyle = {};
		const bottomSpace = MAIN_IMAGE_SPACE;

		const prevClass = {
			"page-photography-main-nav": true,
			"page-photography-main-nav--prev": true,
		};

		const nextClass = {
			"page-photography-main-nav": true,
			"page-photography-main-nav--next": true,
		};

		// keep images from getting bigger than their native size
		if (this.state.dimensions) {
			contentStyle.maxWidth = this.state.dimensions.width;
			contentStyle.maxHeight = this.state.dimensions.height;
		}

		/*
		if (orientation === ORIENTATIONS.landscape) {
			contentStyle.width = "100%";
			contentStyle.height = "auto";
		} else if (orientation === ORIENTATIONS.portrait) {
			contentStyle.width = "auto";
			contentStyle.height = "100%";

			if (this.state.metaHeight) {
				bottomSpace += this.state.metaHeight;
			}
		}
		*/

		const spaceStyle = {
			top: `${MAIN_IMAGE_SPACE}px`,
			right: `${MAIN_IMAGE_SPACE}px`,
			bottom: `${bottomSpace}px`,
			left: `${MAIN_IMAGE_SPACE}px`,
		};

		const spaceDimensions = {
			width: this.state.windowWidth - (MAIN_IMAGE_SPACE * 2),
			height: this.state.windowHeight - MAIN_IMAGE_SPACE - bottomSpace,
		};

		return (
			<div className="page-photography-main" key={image.title}>

				<div className="page-photography-main-space" style={spaceStyle}>
					<div className="page-photography-main-content" style={contentStyle}>
						<MainImage
							src={image.image2000}
							alt={image.title}
							maxWidth={spaceDimensions.width}
							maxHeight={spaceDimensions.height}
							loaded={this.state.isLoaded}
							onLoad={this._onLoad}
						/>

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
									onRender={this._handleMetaRender}
									filterTag={this.props.onFilterTag}
								/>
							}
						</ReactCSSTransitionGroup>
					</div>
				</div>

				<button
						className={classnames(prevClass)}
						onClick={this.props.onNavigatePrev}
						disabled={this.props.atBeginning}>
					<span className="page-photography-main-nav-text">
						previous photo
					</span>
				</button>

				<button
						className={classnames(nextClass)}
						onClick={this.props.onNavigateNext}
						disabled={this.props.atEnd}>
					<span className="page-photography-main-nav-text">
						next photo
					</span>
				</button>

				<button
						className="page-photography-main-close"
						onClick={this.props.onClearActiveImage}>
					<span className="page-photography-main-close-text">
						close
					</span>
				</button>

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
