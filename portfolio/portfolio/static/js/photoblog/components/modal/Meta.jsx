import React from "react";
import PropTypes from "prop-types";

import { BAD_TAGS } from "../../util/constants";
import Tag from "../Tag.jsx";

import "./Meta.scss";

const Meta = ({ tags, title, year, filterTag }) => {
	const tagsToShow = tags.filter((tag) => {
		return !BAD_TAGS[tag.slug];
	});

	return (
		<div className="image-modal-meta">
			<h3 className="image-modal-meta-title">
				{title}
			</h3>
			<span className="image-modal-meta-year">
				{year}
			</span>

			{!!tagsToShow.length &&
				<div className="image-modal-meta-tags">
					tags:
					&nbsp;
					{tagsToShow.map((tag, i) => (
						<span key={tag.name}>
							<Tag
								name={tag.name}
								slug={tag.slug}
								className="image-modal-meta-tag"
								filterTag={filterTag}
							/>
							{i + 1 < tagsToShow.length &&
								<>, </>
							}
						</span>
					))}
				</div>
			}
		</div>
	);
};

Meta.propTypes = {
	title: PropTypes.string.isRequired,
	year: PropTypes.number.isRequired,
	filterTag: PropTypes.func.isRequired,
	tags: PropTypes.array,
};

Meta.defaultProps = {
	tags: [],
};

export default Meta;
