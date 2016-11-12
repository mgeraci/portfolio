import React, { PropTypes } from "react";
import { connect } from "react-redux";
import PureRenderMixin from "react-addons-pure-render-mixin";

import { filterTag } from "../reducer";
import Tag from "./Tag";

const Navigation = React.createClass({
	propTypes: {
		years: PropTypes.array.isRequired,
		onFilterTag: PropTypes.func.isRequired,
	},

	mixins: [ PureRenderMixin ],

	_filterTags(e) {
		e.preventDefault();

		this.props.onFilterTag({
			name: "tags",
			slug: "tags",
		});
	},

	render() {
		return (
			<ul className="page-photography-navigation">
				<li className="page-photography-navigation-item-wrapper">
					browse:
				</li>
				{this.props.years.map(year =>
					<li
							className="page-photography-navigation-item-wrapper"
							key={year}>
						<Tag
							name={year}
							slug={year}
							filterTag={this.props.onFilterTag}
							className="page-photography-navigation-item"
						/>
					</li>
				)}
				<li className="page-photography-navigation-item-wrapper">
					<a
							className="page-photography-navigation-item"
							href="/photography/blog/browse/tags"
							onClick={this._filterTags}>
						tags
					</a>
				</li>
			</ul>
		);
	},
});

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
	mapDispatchToProps
)(Navigation);
