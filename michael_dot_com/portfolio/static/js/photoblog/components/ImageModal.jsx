/* global document */

import React, { PropTypes } from "react";
import { connect } from "react-redux";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import classnames from "classnames";

import {
	clearActiveImage,
	navigatePrev,
	navigateNext,
	filterTag,
} from "../reducer";

import MainImage from "./MainImage";
import ImageMeta from "./ImageMeta";
import { KEYS } from "../util/constants";

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
		return { loaded: false };
	},

	componentDidMount() {
		document.addEventListener("keyup", this._handleKeyup);
	},

	componentWillReceiveProps(nextProps) {
		if (nextProps.image.id !== this.props.image.id) {
			this.setState({ loaded: false });
		}
	},

	componentWillUnmount() {
		document.removeEventListener("keyup", this._handleKeyup);
	},

	_handleKeyup(e) {
		const code = e.which;

		if (code === KEYS.escape) {
			this.props.onClearActiveImage();
		}

		if (!this.state.loaded) {
			return;
		}

		if (code === KEYS.left) {
			this.props.onNavigatePrev();
		} else if (code === KEYS.right) {
			this.props.onNavigateNext();
		}
	},

	_onLoad(dimensions) {
		this.setState({
			loaded: true,
			dimensions,
		});
	},

	render() {
		const { image } = this.props;
		const contentStyle = {};

		const prevClass = {
			"page-photography-main-nav": true,
			"page-photography-main-nav--prev": true,
		};

		const nextClass = {
			"page-photography-main-nav": true,
			"page-photography-main-nav--next": true,
		};

		if (typeof(this.state.dimensions) !== "undefined" && this.state.dimensions !== null) {
			contentStyle.width = this.state.dimensions.width;
		}

		return (
			<div className="page-photography-main" key={image.title}>

				<div className="page-photography-main-content" style={contentStyle}>
					<MainImage
						src={image.image}
						alt={image.title}
						loaded={this.state.loaded}
						onLoad={this._onLoad}
					/>

					<ReactCSSTransitionGroup
							transitionName="main-image"
							transitionAppear
							transitionEnterTimeout={500}
							transitionAppearTimeout={500}
							transitionLeaveTimeout={5}>
						{this.state.loaded &&
							<ImageMeta
								key={image.id}
								title={image.title}
								year={image.year}
								tags={image.tags}
								filterTag={this.props.onFilterTag}
							/>
						}
					</ReactCSSTransitionGroup>

					<span>
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
					</span>

					{!this.state.loaded &&
						<div className="loader" />
					}

					<button
							className="page-photography-main-close"
							onClick={this.props.onClearActiveImage}>
						<span className="page-photography-main-close-text">
							close
						</span>
					</button>
				</div>
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
