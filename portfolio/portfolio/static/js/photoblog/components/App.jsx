/* global window, document */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import throttle from "throttle-debounce/throttle";

import {
	setActiveImage,
	clearActiveImage,
} from "../reducer";

import { TAGS_LIST_URL } from "../util/constants";

import Title from "./Title.jsx";
import Navigation from "./Navigation.jsx";
import Thumbnail from "./Thumbnail.jsx";
import ImageModal from "./ImageModal.jsx";
import TagsList from "./TagsList.jsx";

import "./App.scss";

class App extends Component {
	static propTypes = {
		appInitialized: PropTypes.bool,
		order: PropTypes.array.isRequired,
		filteredOrder: PropTypes.array,
		filteredTerm: PropTypes.object,
		images: PropTypes.object.isRequired,
		activeImage: PropTypes.number,

		onSetActiveImage: PropTypes.func.isRequired,
		onClearActiveImage: PropTypes.func.isRequired,
	};

	static defaultProps = {
		appInitialized: false,
		filteredOrder: null,
		filteredTerm: null,
		activeImage: null,
	};

	state = {};

	componentDidMount() {
		const onScroll = throttle(200, this._onScroll);

		document.addEventListener("scroll", onScroll);
		this._triggerScroll();
	}

	// if the set of images is changing, trigger a scroll event to load new photos
	componentDidUpdate(prevProps) {
		const { filteredTerm } = this.props;

		// has a tag, and it's changing
		if (
			filteredTerm && prevProps.filteredTerm &&
			filteredTerm.slug !== prevProps.filteredTerm.slug
		) {
			this._triggerScroll();
		}

		// removing a tag
		if (filteredTerm === null && prevProps.filteredTerm) {
			this._triggerScroll();
		}

		// adding a tag
		if (filteredTerm && prevProps.filteredTerm === null) {
			this._triggerScroll();
		}
	}

	_triggerScroll = () => {
		setTimeout(() => {
			this._onScroll();
		}, 50);
	}

	_onScroll = () => {
		const top = document.body.scrollTop;
		const height = window.innerHeight
			|| document.documentElement.clientHeight
			|| document.body.clientHeight;
		const bottom = top + height;

		this.setState({
			scrollTop: top,
			scrollBottom: bottom,
		});
	}

	_getVisibleImageIds = () => {
		const { order, filteredOrder } = this.props;

		let imageIds = order;

		if (filteredOrder && filteredOrder.length) {
			imageIds = filteredOrder;
		}

		return imageIds;
	}

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
		const isTagsList = filteredTerm && filteredTerm.slug === TAGS_LIST_URL;
		const hasActiveImage = !!(activeImage && images[activeImage]);

		return (
			<span>
				<Title />
				<Navigation />

				{!isTagsList &&
					<span>
						<div className="page-photography-thumbnails">

							{appInitialized && this._getVisibleImageIds().map((id) => (
								<Thumbnail
									key={id}
									image={images[id]}
									scrollTop={scrollTop}
									scrollBottom={scrollBottom}
									setActiveImage={onSetActiveImage}
									clearActiveImage={onClearActiveImage}
									hasActiveImage={hasActiveImage}
								/>
							))}
						</div>

						<TransitionGroup>
							{hasActiveImage &&
								<CSSTransition
									key="main-image"
									classNames="main-image"
									timeout={500}
								>
									<ImageModal image={images[activeImage]} />
								</CSSTransition>
							}
						</TransitionGroup>
					</span>
				}

				{isTagsList &&
					<TagsList />
				}

				<a className="page-photography-rss" href="http://feeds.feedburner.com/mpgPhotoblog">
					subscribe with rss
				</a>
			</span>
		);
	}
}

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
