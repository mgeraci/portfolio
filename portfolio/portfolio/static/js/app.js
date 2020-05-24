/* global document */

import FastClick from "fastclick";
import modernizr from "./vendor/modernizr"; // eslint-disable-line no-unused-vars

import menu from "./menu";
import lazyImages from "./lazy_images";
import audio from "./audio";
import video from "./video";

menu.init();
lazyImages.search();
audio.init();
video.init();
FastClick.attach(document.body);
