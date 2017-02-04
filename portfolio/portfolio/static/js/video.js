import $ from "jquery";
import fitvids from "fitvids";

const Video = {
	projectVideoClasses: ".page-project-media-video",
	projectVideoButtons: ".page-project-media-video-icon-wrapper",
	projectPlayingClass: "is-playing",

	init() {
		fitvids();

		this.projectSelectors = `${this.projectVideoClasses}, ${this.projectVideoButtons}`;
		this.projectVideo();
	},

	projectVideo() {
		if ($("html").hasClass("touchevents")) {
			this.videoMobile();
		} else {
			this.videoDesktop();
		}
	},

	getVideoEls(e) {
		const wrapper = e.closest(".page-project-media-video-wrapper");
		const video = wrapper.find("video");

		return {
			wrapper,
			video,
		};
	},

	videoMobile() {
		$("body").on("click tap", this.projectSelectors, (e) => {
			const els = this.getVideoEls($(e.currentTarget));
			const video = els.video.get(0);

			if (video.paused) {
				video.play();
				els.wrapper.addClass(this.projectPlayingClass);
			} else {
				video.pause();
				els.wrapper.removeClass(this.projectPlayingClass);
			}
		});
	},

	videoDesktop() {
		$("body").on("mouseover", this.projectSelectors, (e) => {
			const els = this.getVideoEls($(e.currentTarget));
			els.video.get(0).play();
			els.wrapper.addClass(this.projectPlayingClass);
		}).on("mouseout", this.projectSelectors, (e) => {
			const els = this.getVideoEls($(e.currentTarget));
			els.video.get(0).pause();
			els.wrapper.removeClass(this.projectPlayingClass);
		});
	},
};

export default Video;
