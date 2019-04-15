import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { clearFilterTag } from "../reducer";
import TitleClearButton from "./TitleClearButton.jsx";

import "./Title.sass";

const Title = ({ filteredTerm, onClearFilterTag }) => {
	const isYear = !!`${filteredTerm}`.match(/2\d{3}/);
	const isTagsList = filteredTerm && filteredTerm.name === "tags";
	const isTag = !isYear && !isTagsList && filteredTerm && filteredTerm.slug;

	return (
		<h2 className="page-photography-title">
			{isYear &&
				<span>
					Images from {filteredTerm.name}
					<TitleClearButton clearFilterTag={onClearFilterTag} />
				</span>
			}

			{isTagsList &&
				<span>
					Browsing tags
					<TitleClearButton clearFilterTag={onClearFilterTag} />
				</span>
			}

			{isTag &&
				<span>
					Images tagged
					&nbsp;
					<em>{filteredTerm.name}</em>
					<TitleClearButton clearFilterTag={onClearFilterTag} />
				</span>
			}

			{!(filteredTerm && filteredTerm.slug) &&
				<span>Photoblog</span>
			}
		</h2>
	);
};

Title.propTypes = {
	onClearFilterTag: PropTypes.func.isRequired,
	filteredTerm: PropTypes.object,
};

Title.defaultProps = {
	filteredTerm: null,
};

function mapStateToProps(state) {
	return {
		filteredTerm: state.filteredTerm,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		onClearFilterTag(tag) {
			dispatch(clearFilterTag(tag));
		},
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Title);
