import React, { PropTypes } from "react";
import Tag from "./Tag";

const ImageMeta = React.createClass({
	propTypes: {
		title: PropTypes.string.isRequired,
		year: PropTypes.number.isRequired,
		tags: PropTypes.array,
		filterTag: PropTypes.func.isRequired,
	},

	render() {
		return (
			<div className="page-photography-main-meta">
				<h3>{this.props.title}</h3>
				<span>{this.props.year}</span>
				<br />

				{!!this.props.tags.length &&
					<div className="page-photography-main-tags">
						{this.props.tags.map((tag, i) =>
							<Tag
								key={i}
								name={tag.name}
								slug={tag.slug}
								filterTag={this.props.filterTag}
							/>
						)}
					</div>
				}
			</div>
		);
	},
});

export default ImageMeta;
