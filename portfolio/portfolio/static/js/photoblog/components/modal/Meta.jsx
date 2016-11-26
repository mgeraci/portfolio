import React, { PropTypes } from "react";
import PureRenderMixin from "react-addons-pure-render-mixin";

import { BAD_TAGS } from "../../util/constants";
import Tag from "../Tag";

import "./Meta.sass";

const Meta = React.createClass({
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
					className="image-modal-meta">
				<h3 className="image-modal-meta-title">
					{this.props.title}
				</h3>
				<span className="image-modal-meta-year">
					{this.props.year}
				</span>

				{!!this.props.tags.length &&
					<div className="image-modal-meta-tags">
						tags:
						&nbsp;
						{tags.map((tag, i) =>
							<span key={i}>
								<Tag
									name={tag.name}
									slug={tag.slug}
									className="image-modal-meta-tag"
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

export default Meta;
