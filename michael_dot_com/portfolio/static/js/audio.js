import $ from "jquery";
import audiojs from "./vendor/audio";

const Audio = {
	init() {
		let audioInstance = audiojs("audiojs", "audiojsInstance", this);
		audioInstance = this.audiojs;

		audioInstance.events.ready(() => {
			const audioElements = audioInstance.createAll({ css: false });

			// pause all other players on click of a play button
			$("body").on("click", ".audiojs .play-pause", function onClick() {
				const thisIndex = $(this).parents(".audiojs").index(".audiojs");
				let i = 0;

				audioElements.forEach(() => {
					if (i !== thisIndex && audioElements[i].playing) {
						audioElements[i].pause();
					}

					i += 1;
				});
			});
		});
	},
};

export default Audio;
