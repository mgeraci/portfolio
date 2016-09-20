import React, { PropTypes } from "react";

import MainImage from "./MainImage";
import Tag from "./Tag";

const ImageDetail = React.createClass({
	propTypes: {
		image: PropTypes.object.isRequired,
		atBeginning: PropTypes.bool,
		atEnd: PropTypes.bool,
		clearActiveImage: PropTypes.func.isRequired,
		navigatePrev: PropTypes.func.isRequired,
		navigateNext: PropTypes.func.isRequired,
		filterTag: PropTypes.func.isRequired,
	},

	getInitialState() {
		return { loaded: false };
	},

	componentWillReceiveProps(nextProps) {
		if (nextProps.image.id !== this.props.image.id) {
			this.setState({ loaded: false });
		}
	},

	_onLoad() {
		this.setState({ loaded: true });
	},

	render() {
		const { image } = this.props;

		return (
			<div className="page-photography-main" key={image.title}>
				<MainImage
					src={image.image}
					alt={image.title}
					loaded={this.state.loaded}
					onLoad={this._onLoad}
				/>

				<h3>{image.title}</h3>
				<br />
				<span>{image.year}</span>
				<br />
				X{this.state.loaded}X
				<br />

				<div className="page-photography-main-tags">
					{image.tags.map((tag, i) =>
						<Tag
							key={i}
							name={tag.name}
							slug={tag.slug}
							filterTag={this.props.filterTag}
						/>
					)}
				</div>

				<br />

				<button onClick={this.props.clearActiveImage}>
					close
				</button>

				<br />

				<button
						onClick={this.props.navigatePrev}
						disabled={this.props.atBeginning}>
					prev
				</button>
				<button
						onClick={this.props.navigateNext}
						disabled={this.props.atEnd}>
					next
				</button>
			</div>
		);
	},
});

export default ImageDetail;
