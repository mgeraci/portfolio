import React, { PropTypes } from "react";
import { connect } from "react-redux";
import classnames from "classnames";

import {
	clearActiveImage,
	navigatePrev,
	navigateNext,
} from "../reducer";

const ImageModalButtons = React.createClass({
	propTypes: {
		atBeginning: PropTypes.bool,
		atEnd: PropTypes.bool,
		isMobile: PropTypes.bool,
		onNavigatePrev: PropTypes.func.isRequired,
		onNavigateNext: PropTypes.func.isRequired,
		onClose: PropTypes.func.isRequired,
	},

	render() {
		const {
			atBeginning,
			atEnd,
			isMobile,
			onNavigatePrev,
			onNavigateNext,
			onClose,
		} = this.props;

		const prevClass = {
			"page-photography-main-nav": true,
			"page-photography-main-nav--prev": true,
			"page-photography-main-nav--hidden": isMobile,
		};

		const nextClass = {
			"page-photography-main-nav": true,
			"page-photography-main-nav--next": true,
			"page-photography-main-nav--hidden": isMobile,
		};

		const closeClass = {
			"page-photography-main-close": true,
			"page-photography-main-close--mobile": isMobile,
		};

		return (
			<span>
				<button
						className={classnames(prevClass)}
						onClick={onNavigatePrev}
						disabled={atBeginning}>
					<span className="page-photography-main-nav-text">
						previous photo
					</span>
				</button>

				<button
						className={classnames(nextClass)}
						onClick={onNavigateNext}
						disabled={atEnd}>
					<span className="page-photography-main-nav-text">
						next photo
					</span>
				</button>

				<button
						className={classnames(closeClass)}
						onClick={onClose}>
					<span className="page-photography-main-close-text">
						close
					</span>
				</button>
			</span>
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
		onClose() {
			dispatch(clearActiveImage());
		},
		onNavigatePrev() {
			dispatch(navigatePrev());
		},
		onNavigateNext() {
			dispatch(navigateNext());
		},
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ImageModalButtons);
