import React, { PropTypes } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

import MainImage from "./MainImage";
import ImageMeta from "./ImageMeta";
import { ORIENTATIONS } from "../util/constants";

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

	componentWillReceiveProps(nextProps) {
		if (nextProps.image.id !== this.props.image.id) {
			this.setState({ loaded: false });
		}
	},

	_onLoad(dimensions) {
		let orientation = ORIENTATIONS.portrait;

		if (dimensions.width > dimensions.height) {
			orientation = ORIENTATIONS.landscape;
		}

		this.setState({
			loaded: true,
			orientation,
		});
	},

	render() {
		const { image } = this.props;

		return (
			<div className="page-photography-main" key={image.title}>
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
							title={image.title}
							year={image.year}
							tags={image.tags}
							filterTag={this.props.filterTag}
						/>
					}
				</ReactCSSTransitionGroup>

				<br />

				<button onClick={this.props.clearActiveImage}>
					close
				</button>

				<br />

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
			</div>
		);
	},
});

export default ImageDetail;
