import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { filterTag } from "../reducer";
import Tag from "./Tag.jsx";

import "./Navigation.scss";

const Navigation = ({ years, onFilterTag }) => {
	const filterTags = (e) => {
		e.preventDefault();

		onFilterTag({
			name: "tags",
			slug: "tags",
		});
	};

	return (
		<ul className="page-photography-navigation">
			<li className="page-photography-navigation-item-wrapper">
				browse:
			</li>
			{years.map((year) => (
				<li
					className="page-photography-navigation-item-wrapper"
					key={year}
				>
					<Tag
						name={year}
						slug={year}
						filterTag={onFilterTag}
						className="page-photography-navigation-item"
					/>
				</li>
			))}
			<li className="page-photography-navigation-item-wrapper">
				<a
					className="page-photography-navigation-item"
					href="/photography/blog/browse/tags"
					onClick={filterTags}
				>
					tags
				</a>
			</li>
		</ul>
	);
};

Navigation.propTypes = {
	years: PropTypes.array.isRequired,
	onFilterTag: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
	return {
		years: state.years,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		onFilterTag(tag) {
			dispatch(filterTag(tag));
		},
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Navigation);
