import React, { PropTypes } from "react";
import MainImage from "./MainImage";
import Tag from "./Tag";

const ImageDetail = React.createClass({
	propTypes: {
		image: PropTypes.object.isRequired,
		clearActiveImage: PropTypes.func.isRequired,
		navigatePrev: PropTypes.func.isRequired,
		navigateNext: PropTypes.func.isRequired,
		filterTag: PropTypes.func.isRequired,
	},

	render() {
		const { image } = this.props;

		return (
			<div>
				<MainImage
					src={image.image}
					alt={image.title}
				/>

				<h3>{image.title}</h3>
				<br />
				<span>{image.year}</span>
				<br />

				{image.tags.map((tag, i) =>
					<Tag
						key={i}
						name={tag.name}
						slug={tag.slug}
						filterTag={this.props.filterTag}
					/>
				)}

				<br />

				<button onClick={this.props.clearActiveImage}>
					close
				</button>

				<br />

				<button onClick={this.props.navigatePrev}>
					prev
				</button>
				<button onClick={this.props.navigateNext}>
					next
				</button>
			</div>
		);
	},
});

export default ImageDetail;
