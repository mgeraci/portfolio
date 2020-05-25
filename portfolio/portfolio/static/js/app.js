/* global document */

import FastClick from "fastclick";

import menu from "./menu";
import lazyImages from "./lazy_images";
import audio from "./audio";
import video from "./video";

// add a touchevents support class to the root for some minor style changes
if ("ontouchstart" in document.documentElement) {
	document.documentElement.classList.add("touchevents");
} else {
	document.documentElement.classList.add("no-touchevents");
}

menu.init();
lazyImages.search();
audio.init();
video.init();
FastClick.attach(document.body);
