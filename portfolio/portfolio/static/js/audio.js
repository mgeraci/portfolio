/* global document */

import audiojs from "./vendor/audio";

const Audio = {
	init() {
		let audioInstance = audiojs("audiojs", "audiojsInstance", this);
		audioInstance = this.audiojs;

		audioInstance.events.ready(() => {
			const audioElements = audioInstance.createAll({ css: false });
			const buttons = document.querySelectorAll(".audiojs .play-pause");

			// pause all other players on click of a play button
			buttons.forEach((button) => {
				button.addEventListener("click", (e) => {
					const thisIndex = Array.prototype.indexOf.call(buttons, e.currentTarget);

					audioElements.forEach((audioElement, i) => {
						if (i === thisIndex || !audioElement.playing) {
							return;
						}

						audioElement.pause();
					});
				});
			});
		});
	},
};

export default Audio;
