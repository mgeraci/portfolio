import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";

import {
	clearActiveImage,
	navigatePrev,
	navigateNext,
} from "../../reducer";

import "./Buttons.scss";

const Buttons = ({
	atBeginning,
	atEnd,
	isMobile,
	onNavigatePrev,
	onNavigateNext,
	onClose,
}) => {
	const prevClass = {
		"image-modal-button": true,
		"image-modal-button--prev": true,
		"image-modal-button--is-hidden": isMobile,
	};

	const nextClass = {
		"image-modal-button": true,
		"image-modal-button--next": true,
		"image-modal-button--is-hidden": isMobile,
	};

	const closeClass = {
		"image-modal-button": true,
		"image-modal-button--close": true,
		"image-modal-button--is-mobile": isMobile,
	};

	return (
		<span>
			<button
				className={classnames(prevClass)}
				onClick={onNavigatePrev}
				disabled={atBeginning}
			>
				<span className="image-modal-button-text">
					previous photo
				</span>
			</button>

			<button
				className={classnames(nextClass)}
				onClick={onNavigateNext}
				disabled={atEnd}
			>
				<span className="image-modal-button-text">
					next photo
				</span>
			</button>

			<button
				className={classnames(closeClass)}
				onClick={onClose}
			>
				<span className="image-modal-button-text">
					close
				</span>
			</button>
		</span>
	);
};

Buttons.propTypes = {
	onNavigatePrev: PropTypes.func.isRequired,
	onNavigateNext: PropTypes.func.isRequired,
	onClose: PropTypes.func.isRequired,
	atBeginning: PropTypes.bool,
	atEnd: PropTypes.bool,
	isMobile: PropTypes.bool,
};

Buttons.defaultProps = {
	atBeginning: false,
	atEnd: false,
	isMobile: false,
};

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
)(Buttons);
