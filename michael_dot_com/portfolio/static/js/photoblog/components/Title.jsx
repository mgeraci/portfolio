import React, { PropTypes } from "react";
import { connect } from "react-redux";
import PureRenderMixin from "react-addons-pure-render-mixin";

import {
	clearFilterTag,
} from "../reducer";
import TitleClearButton from "./TitleClearButton";

const Title = React.createClass({
	propTypes: {
		filteredTerm: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number,
		]),
		onClearFilterTag: PropTypes.func.isRequired,
	},

	mixins: [ PureRenderMixin ],

	render() {
		const { filteredTerm, onClearFilterTag } = this.props;
		const isYear = !!`${filteredTerm}`.match(/2\d{3}/);
		const isTagsList = filteredTerm === "tags";
		const isTag = !isYear && !isTagsList && filteredTerm;

		return (
			<h2 className="page-photography-meta-title">
				{isYear &&
					<span>
						Images from {filteredTerm}
						<TitleClearButton clearFilterTag={onClearFilterTag} />
					</span>
				}

				{isTagsList &&
					<span>
						Browsing tags
						<TitleClearButton clearFilterTag={onClearFilterTag} />
					</span>
				}

				{isTag &&
					<span>
						Images tagged
						&nbsp;
						<em>{filteredTerm}</em>
						<TitleClearButton clearFilterTag={onClearFilterTag} />
					</span>
				}

				{!filteredTerm &&
					<span>Photoblog</span>
				}
			</h2>
		);
	},
});

function mapStateToProps(state) {
	return {
		filteredTerm: state.filteredTerm,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		onClearFilterTag(tag) {
			dispatch(clearFilterTag(tag));
		},
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Title);
