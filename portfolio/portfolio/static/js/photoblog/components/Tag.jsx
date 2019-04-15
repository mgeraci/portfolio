import React from "react";
import PropTypes from "prop-types";

const Tag = ({ className, slug, name, size, filterTag }) => {
	const handleClick = (e) => {
		e.preventDefault();

		filterTag({
			name: name,
			slug: slug,
		});
	};

	let style;

	if (size) {
		style = {
			fontSize: `${size}px`,
		};
	}

	return (
		<a
			className={className}
			onClick={handleClick}
			style={style}
			href={`/photography/blog/browse/${slug}`}
		>
			{name}
		</a>
	);
};

Tag.propTypes = {
	name: PropTypes.oneOfType([
		PropTypes.string.isRequired,
		PropTypes.number.isRequired,
	]).isRequired,
	slug: PropTypes.oneOfType([
		PropTypes.string.isRequired,
		PropTypes.number.isRequired,
	]).isRequired,
	className: PropTypes.string.isRequired,
	filterTag: PropTypes.func.isRequired,
	size: PropTypes.number,
};

Tag.defaultProps = {
	size: null,
};

export default Tag;
