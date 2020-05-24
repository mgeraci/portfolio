/* global document */

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
		if (document.documentElement.classList.contains("touchevents")) {
			this.videoMobile();
		} else {
			this.videoDesktop();
		}
	},

	getVideoEls(el) {
		const wrapper = el.closest(".page-project-media-video-wrapper");
		const video = wrapper.querySelector("video");

		return {
			wrapper,
			video,
		};
	},

	_onMobileInteraction(e) {
		const { video, wrapper } = this.getVideoEls(e.currentTarget);

		if (video.paused) {
			video.play();
			wrapper.classList.add(this.projectPlayingClass);
		} else {
			video.pause();
			wrapper.classList.remove(this.projectPlayingClass);
		}
	},

	videoMobile() {
		document.body.querySelectorAll(this.projectSelectors).forEach((selector) => {
			selector.addEventListener("click", this._onMobileInteraction.bind(this));
			selector.addEventListener("tap", this._onMobileInteraction.bind(this));
		});
	},

	videoDesktop() {
		document.body.querySelectorAll(this.projectSelectors).forEach((selector) => {
			selector.addEventListener("mouseover", (e) => {
				const els = this.getVideoEls(e.currentTarget);
				els.video.play();
				els.wrapper.classList.add(this.projectPlayingClass);
			});

			selector.addEventListener("mouseout", (e) => {
				const els = this.getVideoEls(e.currentTarget);
				els.video.pause();
				els.wrapper.classList.remove(this.projectPlayingClass);
			});
		});
	},
};

export default Video;
