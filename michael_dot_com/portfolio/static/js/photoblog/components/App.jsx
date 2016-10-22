/* global window, document */

import React, { PropTypes } from "react";
import { connect } from "react-redux";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import throttle from "throttle-debounce/throttle";

import {
	setActiveImage,
	clearActiveImage,
} from "../reducer";

import { TAGS_LIST_URL } from "../util/constants.js";

import Title from "./Title";
import Navigation from "./Navigation";
import Thumbnail from "./Thumbnail";
import ImageModal from "./ImageModal";
import TagsList from "./TagsList";

const App = React.createClass({
	propTypes: {
		appInitialized: PropTypes.bool,
		order: PropTypes.array.isRequired,
		filteredOrder: PropTypes.array,
		filteredTerm: PropTypes.object,
		images: PropTypes.object.isRequired,
		activeImage: PropTypes.number,

		onSetActiveImage: PropTypes.func.isRequired,
		onClearActiveImage: PropTypes.func.isRequired,
	},

	getInitialState() {
		return {};
	},

	componentDidMount() {
		const cb = throttle(200, this._handleScroll);

		document.addEventListener("scroll", cb);
		this._triggerScroll();
	},

	componentDidUpdate(prevProps) {
		// has a tag, and it's changing
		if (this.props.filteredTerm && prevProps.filteredTerm &&
				this.props.filteredTerm.slug !== prevProps.filteredTerm.slug) {
			this._triggerScroll();
		}

		// removing a tag
		if (this.props.filteredTerm === null && prevProps.filteredTerm) {
			this._triggerScroll();
		}

		// adding a tag
		if (this.props.filteredTerm && prevProps.filteredTerm === null) {
			this._triggerScroll();
		}
	},

	_triggerScroll() {
		setTimeout(() => {
			this._handleScroll();
		}, 50);
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
		const {
			filteredTerm,
			images,
			onSetActiveImage,
			onClearActiveImage,
			activeImage,
			appInitialized,
		} = this.props;

		const { scrollTop, scrollBottom } = this.state;
		const isTagsView = filteredTerm && filteredTerm.slug === TAGS_LIST_URL;

		return (
			<span>
				<div className="page-photography-meta">
					<Title />
					<Navigation />
				</div>

				{!isTagsView &&
					<span>
						<div className="page-photography-thumbnails">

							{appInitialized && this._getVisibleImageIds().map(id =>
								<Thumbnail
									key={id}
									image={images[id]}
									scrollTop={scrollTop}
									scrollBottom={scrollBottom}
									setActiveImage={onSetActiveImage}
									clearActiveImage={onClearActiveImage}
									hasActiveImage={!!activeImage}
								/>
							)}
						</div>

						{activeImage &&
							<ReactCSSTransitionGroup
									transitionName="image-detail"
									transitionAppear
									transitionEnterTimeout={500}
									transitionAppearTimeout={500}
									transitionLeaveTimeout={500}>
								<ImageModal image={images[activeImage]} />
							</ReactCSSTransitionGroup>
						}
					</span>
				}

				{isTagsView &&
					<TagsList />
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
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);
