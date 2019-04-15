import React from "react";
import PropTypes from "prop-types";

const TitleClearButton = ({ clearFilterTag }) => {
	return (
		<button
			className="page-photography-title-clear"
			onClick={clearFilterTag}
		>
			remove filter
		</button>
	);
};

TitleClearButton.propTypes = {
	clearFilterTag: PropTypes.func.isRequired,
};

export default TitleClearButton;
