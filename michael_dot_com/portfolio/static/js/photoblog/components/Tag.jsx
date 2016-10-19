import React, { PropTypes } from "react";
import PureRenderMixin from "react-addons-pure-render-mixin";

const Tag = React.createClass({
	propTypes: {
		name: PropTypes.oneOfType([
			PropTypes.string.isRequired,
			PropTypes.number.isRequired,
		]),
		slug: PropTypes.oneOfType([
			PropTypes.string.isRequired,
			PropTypes.number.isRequired,
		]),
		className: PropTypes.string.isRequired,
		filterTag: PropTypes.func.isRequired,
	},

	mixins: [ PureRenderMixin ],

	_handleClick(e) {
		e.preventDefault();

		this.props.filterTag({
			name: this.props.name,
			slug: this.props.slug,
		});
	},

	render() {
		return (
			<a
					className={this.props.className}
					onClick={this._handleClick}
					href={`/photography/blog/browse/${this.props.slug}`}>
				{this.props.name}
			</a>
		);
	},
});

export default Tag;
