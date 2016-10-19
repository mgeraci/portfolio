import React, { PropTypes } from "react";
import { connect } from "react-redux";

import { generateTagsList, filterTag } from "../reducer";
import Tag from "./Tag";

const TagsList = React.createClass({
	propTypes: {
		tags: PropTypes.array,
		onGenerateTagsList: PropTypes.func.isRequired,
		onFilterTag: PropTypes.func.isRequired,
	},

	componentDidMount() {
		const { tags, onGenerateTagsList } = this.props;

		if (typeof(tags) === "undefined" || tags === null || !tags.length) {
			onGenerateTagsList();
		}
	},

	render() {
		const { tags, onFilterTag } = this.props;

		return (
			<div className="page-photography-tagslist">
				{tags && tags.length &&
					<span>
						{tags.map(tag =>
							<Tag
								key={tag.slug}
								name={tag.name}
								slug={tag.slug}
								filterTag={onFilterTag}
								className="page-photography-tagslist-tag"
							/>
						)}
					</span>
				}
			</div>
		);
	},
});


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
