import React, { PropTypes } from "react";
import { connect } from "react-redux";
import {
	setActiveImage,
	clearActiveImage,
	navigatePrev,
	navigateNext,
	filterTag,
	clearFilterTag,
} from "../reducer";
import ImageLink from "./ImageLink";
import ImageDetail from "./ImageDetail";

const App = React.createClass({
	propTypes: {
		order: PropTypes.array.isRequired,
		filteredOrder: PropTypes.array,
		filteredTerm: PropTypes.string,
		images: PropTypes.object.isRequired,
		activeImage: PropTypes.number,
		onSetActiveImage: PropTypes.func.isRequired,
		onClearActiveImage: PropTypes.func.isRequired,
		onNavigatePrev: PropTypes.func.isRequired,
		onNavigateNext: PropTypes.func.isRequired,
		onFilterTag: PropTypes.func.isRequired,
		onClearFilterTag: PropTypes.func.isRequired,
		atBeginning: PropTypes.bool,
		atEnd: PropTypes.bool,
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
			<div>
				{this.props.filteredTerm &&
					<span>
						Browsing images tagged "{this.props.filteredTerm}"
						<button onClick={this.props.onClearFilterTag}>
							clear
						</button>
					</span>
				}

				{this._getVisibleImageIds().map(id =>
					<ImageLink
						key={id}
						image={this.props.images[id]}
						setActiveImage={this.props.onSetActiveImage}
						clearActiveImage={this.props.onClearActiveImage}
					/>
				)}

				{this.props.activeImage &&
					<ImageDetail
						image={this.props.images[this.props.activeImage]}
						clearActiveImage={this.props.onClearActiveImage}
						navigatePrev={this.props.onNavigatePrev}
						navigateNext={this.props.onNavigateNext}
						atBeginning={this.props.atBeginning}
						atEnd={this.props.atEnd}
						filterTag={this.props.onFilterTag}
					/>
				}
			</div>
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
		onClearFilterTag() {
			dispatch(clearFilterTag());
		},
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);
