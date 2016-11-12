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
		size: PropTypes.number,
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
		const { className, slug, name, size } = this.props;
		let style;

		if (size) {
			style = {
				fontSize: `${size}px`,
			};
		}

		return (
			<a
					className={className}
					onClick={this._handleClick}
					style={style}
					href={`/photography/blog/browse/${slug}`}>
				{name}
			</a>
		);
	},
});

export default Tag;
