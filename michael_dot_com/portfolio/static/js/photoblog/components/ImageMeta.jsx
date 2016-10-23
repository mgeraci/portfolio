import React, { PropTypes } from "react";
import PureRenderMixin from "react-addons-pure-render-mixin";
import Tag from "./Tag";
import { BAD_TAGS } from "../util/constants";

const ImageMeta = React.createClass({
	propTypes: {
		title: PropTypes.string.isRequired,
		year: PropTypes.number.isRequired,
		tags: PropTypes.array,
		filterTag: PropTypes.func.isRequired,
		onRender: PropTypes.func.isRequired,
	},

	mixins: [ PureRenderMixin ],

	componentDidMount() {
		this._getRefSize();
	},

	componentDidUpdate() {
		this._getRefSize();
	},

	_getRefSize() {
		if (!this.meta) {
			return;
		}

		const height = this.meta.getBoundingClientRect().height;
		this.props.onRender(height);
	},

	render() {
		const tags = this.props.tags.filter((tag) => {
			return !BAD_TAGS[tag.slug];
		});

		return (
			<div
					ref={(meta) => { this.meta = meta; }}
					className="page-photography-main-meta">
				<h3 className="page-photography-main-title">
					{this.props.title}
				</h3>
				<span className="page-photography-main-year">
					{this.props.year}
				</span>

				{!!this.props.tags.length &&
					<div className="page-photography-main-tags">
						tags:
						&nbsp;
						{tags.map((tag, i) =>
							<span key={i}>
								<Tag
									name={tag.name}
									slug={tag.slug}
									className="page-photography-main-tag"
									filterTag={this.props.filterTag}
								/>
								{i + 1 < tags.length &&
									<span>, </span>
								}
							</span>
						)}
					</div>
				}
			</div>
		);
	},
});

export default ImageMeta;
