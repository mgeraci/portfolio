/* global document */
import React, { PropTypes } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

import MainImage from "./MainImage";
import ImageMeta from "./ImageMeta";
import { KEYS } from "../util/constants";

const ImageDetail = React.createClass({
	propTypes: {
		image: PropTypes.object.isRequired,
		atBeginning: PropTypes.bool,
		atEnd: PropTypes.bool,
		clearActiveImage: PropTypes.func.isRequired,
		navigatePrev: PropTypes.func.isRequired,
		navigateNext: PropTypes.func.isRequired,
		filterTag: PropTypes.func.isRequired,
	},

	getInitialState() {
		return { loaded: false };
	},

	componentDidMount() {
		document.addEventListener("keyup", (e) => {
			this._handleKeyup(e.which);
		});
	},

	componentWillReceiveProps(nextProps) {
		if (nextProps.image.id !== this.props.image.id) {
			this.setState({ loaded: false });
		}
	},

	componentWillUnmount() {
		document.removeEventListener("keyup", this._handleKeyup);
	},

	_handleKeyup(code) {
		if (code === KEYS.escape) {
			this.props.clearActiveImage();
		}

		if (!this.state.loaded) {
			return;
		}

		if (code === KEYS.left) {
			this.props.navigatePrev();
		} else if (code === KEYS.right) {
			this.props.navigateNext();
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
							transitionLeaveTimeout={500}>
						{this.state.loaded &&
							<ImageMeta
								key={image.id}
								title={image.title}
								year={image.year}
								tags={image.tags}
								filterTag={this.props.filterTag}
							/>
						}
					</ReactCSSTransitionGroup>

					{this.state.loaded &&
						<span>
							<button
									onClick={this.props.navigatePrev}
									disabled={this.props.atBeginning}>
								prev
							</button>
							<button
									onClick={this.props.navigateNext}
									disabled={this.props.atEnd}>
								next
							</button>
						</span>
					}

					{!this.state.loaded &&
						<div className="loader" />
					}

					<button
							className="page-photography-main-close"
							onClick={this.props.clearActiveImage}>
						<span className="page-photography-main-close-text">
							close
						</span>
					</button>
				</div>
			</div>
		);
	},
});

export default ImageDetail;
