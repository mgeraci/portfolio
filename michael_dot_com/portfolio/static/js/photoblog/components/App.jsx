/* global window, document */

import React, { PropTypes } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { connect } from "react-redux";
import throttle from "throttle-debounce/throttle";

import {
	setActiveImage,
	clearActiveImage,
	navigatePrev,
	navigateNext,
	filterTag,
} from "../reducer";

import Title from "./Title";
import Navigation from "./Navigation";
import Thumbnail from "./Thumbnail";
import ImageModal from "./ImageModal";

const App = React.createClass({
	propTypes: {
		appInitialized: PropTypes.bool,
		order: PropTypes.array.isRequired,
		filteredOrder: PropTypes.array,
		filteredTerm: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number,
		]),
		images: PropTypes.object.isRequired,
		activeImage: PropTypes.number,

		// pagination
		atBeginning: PropTypes.bool,
		atEnd: PropTypes.bool,

		// action handlers
		onSetActiveImage: PropTypes.func.isRequired,
		onClearActiveImage: PropTypes.func.isRequired,
		onNavigatePrev: PropTypes.func.isRequired,
		onNavigateNext: PropTypes.func.isRequired,
		onFilterTag: PropTypes.func.isRequired,
	},

	getInitialState() {
		return {};
	},

	componentDidMount() {
		const cb = throttle(200, this._handleScroll);

		document.addEventListener("scroll", cb);

		setTimeout(() => {
			this._handleScroll();
		}, 50);
	},

	componentDidUpdate(prevProps) {
		if (this.props.filteredTerm !== prevProps.filteredTerm) {
			setTimeout(() => {
				this._handleScroll();
			}, 50);
		}
	},

	_handleScroll() {
		const top = document.body.scrollTop;
		const height = window.innerHeight
			|| document.documentElement.clientHeight
			|| document.body.clientHeight;
		const bottom = top + height;

		this.setState({
			scrollTop: top,
			scrollBottom: bottom,
		});
	},

	_getVisibleImageIds() {
		let imageIds = this.props.order;

		if (this.props.filteredOrder && this.props.filteredOrder.length) {
			imageIds = this.props.filteredOrder;
		}

		return imageIds;
	},

	render() {
		return (
			<span>
				<div className="page-photography-meta">
					<Title />
					<Navigation />
				</div>
				<div className="page-photography-thumbnails">

					{this.props.appInitialized && this._getVisibleImageIds().map(id =>
						<Thumbnail
							key={id}
							image={this.props.images[id]}
							scrollTop={this.state.scrollTop}
							scrollBottom={this.state.scrollBottom}
							setActiveImage={this.props.onSetActiveImage}
							clearActiveImage={this.props.onClearActiveImage}
							hasActiveImage={!!this.props.activeImage}
						/>
					)}
				</div>

				{this.props.activeImage &&
					<ReactCSSTransitionGroup
							transitionName="image-detail"
							transitionAppear
							transitionEnterTimeout={500}
							transitionAppearTimeout={500}
							transitionLeaveTimeout={500}>
						<ImageModal
							image={this.props.images[this.props.activeImage]}
							clearActiveImage={this.props.onClearActiveImage}
							navigatePrev={this.props.onNavigatePrev}
							navigateNext={this.props.onNavigateNext}
							atBeginning={this.props.atBeginning}
							atEnd={this.props.atEnd}
							filterTag={this.props.onFilterTag}
						/>
					</ReactCSSTransitionGroup>
				}
			</span>
		);
	},
});

function mapStateToProps(state) {
	return {
		images: state.images,
		order: state.order,
		filteredOrder: state.filteredOrder,
		filteredTerm: state.filteredTerm,
		activeImage: state.activeImage,

		appInitialized: state.appInitialized,

		atBeginning: state.atBeginning,
		atEnd: state.atEnd,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		onSetActiveImage(id) {
			dispatch(setActiveImage(id));
		},
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
)(App);
