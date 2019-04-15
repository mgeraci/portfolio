import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { generateTagsList, filterTag } from "../reducer";
import { scale } from "../util/helpers";
import Tag from "./Tag.jsx";

import "./TagsList.sass";

class TagsList extends Component {
	static propTypes = {
		tags: PropTypes.array,
		onGenerateTagsList: PropTypes.func.isRequired,
		onFilterTag: PropTypes.func.isRequired,
	}

	static defaultProps = {
		tags: null,
	};

	componentDidMount() {
		const { tags, onGenerateTagsList } = this.props;

		if (typeof(tags) === "undefined" || tags === null || !tags.length) {
			onGenerateTagsList();
		}
	}

	render() {
		const { tags, onFilterTag } = this.props;
		const counts = [];

		if (typeof(tags) === "undefined" || tags === null) {
			return null;
		}

		tags.forEach((tag) => {
			counts.push(tag.count);
		});

		const min = 1;
		const max = Math.max(...counts);

		return (
			<div className="page-photography-tagslist">
				<span>
					{tags.map((tag) => {
						const size = scale({
							input: tag.count,
							inMin: min,
							inMax: max,
							outMin: 14,
							outMax: 45,
						});

						return (
							<Tag
								key={tag.slug}
								name={tag.name}
								slug={tag.slug}
								size={size}
								filterTag={onFilterTag}
								className="page-photography-tagslist-tag"
							/>
						);
					})}
				</span>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		tags: state.tags,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		onGenerateTagsList() {
			dispatch(generateTagsList());
		},

		onFilterTag(tag) {
			dispatch(filterTag(tag));
		},
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(TagsList);
