import $ from "jquery";
import fitvids from "fitvids";

const Video = {
	init() {
		fitvids();
		this.projectVideo();
	},

	projectVideo() {
		const videos = $(".page-project-media-video");

		if (!videos.length) {
			return;
		}

		videos.on("mouseover", (e) => {
			const video = $(e.currentTarget);
			video.get(0).play();
		}).on("mouseout", (e) => {
			const video = $(e.currentTarget);
			video.get(0).pause();
		});
	},
};

export default Video;
