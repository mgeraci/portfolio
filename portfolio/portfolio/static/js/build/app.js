/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "http://localhost:8000/static/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _fastclick = _interopRequireDefault(__webpack_require__(1));

	var _menu = _interopRequireDefault(__webpack_require__(2));

	var _lazy_images = _interopRequireDefault(__webpack_require__(3));

	var _audio = _interopRequireDefault(__webpack_require__(6));

	var _video = _interopRequireDefault(__webpack_require__(8));

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	/* global document */
	// add a touchevents support class to the root for some minor style changes
	if ("ontouchstart" in document.documentElement) {
	  document.documentElement.classList.add("touchevents");
	} else {
	  document.documentElement.classList.add("no-touchevents");
	}

	_menu["default"].init();

	_lazy_images["default"].search();

	_audio["default"].init();

	_video["default"].init();

	_fastclick["default"].attach(document.body);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;;(function () {
		'use strict';

		/**
		 * @preserve FastClick: polyfill to remove click delays on browsers with touch UIs.
		 *
		 * @codingstandard ftlabs-jsv2
		 * @copyright The Financial Times Limited [All Rights Reserved]
		 * @license MIT License (see LICENSE.txt)
		 */

		/*jslint browser:true, node:true*/
		/*global define, Event, Node*/


		/**
		 * Instantiate fast-clicking listeners on the specified layer.
		 *
		 * @constructor
		 * @param {Element} layer The layer to listen on
		 * @param {Object} [options={}] The options to override the defaults
		 */
		function FastClick(layer, options) {
			var oldOnClick;

			options = options || {};

			/**
			 * Whether a click is currently being tracked.
			 *
			 * @type boolean
			 */
			this.trackingClick = false;


			/**
			 * Timestamp for when click tracking started.
			 *
			 * @type number
			 */
			this.trackingClickStart = 0;


			/**
			 * The element being tracked for a click.
			 *
			 * @type EventTarget
			 */
			this.targetElement = null;


			/**
			 * X-coordinate of touch start event.
			 *
			 * @type number
			 */
			this.touchStartX = 0;


			/**
			 * Y-coordinate of touch start event.
			 *
			 * @type number
			 */
			this.touchStartY = 0;


			/**
			 * ID of the last touch, retrieved from Touch.identifier.
			 *
			 * @type number
			 */
			this.lastTouchIdentifier = 0;


			/**
			 * Touchmove boundary, beyond which a click will be cancelled.
			 *
			 * @type number
			 */
			this.touchBoundary = options.touchBoundary || 10;


			/**
			 * The FastClick layer.
			 *
			 * @type Element
			 */
			this.layer = layer;

			/**
			 * The minimum time between tap(touchstart and touchend) events
			 *
			 * @type number
			 */
			this.tapDelay = options.tapDelay || 200;

			/**
			 * The maximum time for a tap
			 *
			 * @type number
			 */
			this.tapTimeout = options.tapTimeout || 700;

			if (FastClick.notNeeded(layer)) {
				return;
			}

			// Some old versions of Android don't have Function.prototype.bind
			function bind(method, context) {
				return function() { return method.apply(context, arguments); };
			}


			var methods = ['onMouse', 'onClick', 'onTouchStart', 'onTouchMove', 'onTouchEnd', 'onTouchCancel'];
			var context = this;
			for (var i = 0, l = methods.length; i < l; i++) {
				context[methods[i]] = bind(context[methods[i]], context);
			}

			// Set up event handlers as required
			if (deviceIsAndroid) {
				layer.addEventListener('mouseover', this.onMouse, true);
				layer.addEventListener('mousedown', this.onMouse, true);
				layer.addEventListener('mouseup', this.onMouse, true);
			}

			layer.addEventListener('click', this.onClick, true);
			layer.addEventListener('touchstart', this.onTouchStart, false);
			layer.addEventListener('touchmove', this.onTouchMove, false);
			layer.addEventListener('touchend', this.onTouchEnd, false);
			layer.addEventListener('touchcancel', this.onTouchCancel, false);

			// Hack is required for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
			// which is how FastClick normally stops click events bubbling to callbacks registered on the FastClick
			// layer when they are cancelled.
			if (!Event.prototype.stopImmediatePropagation) {
				layer.removeEventListener = function(type, callback, capture) {
					var rmv = Node.prototype.removeEventListener;
					if (type === 'click') {
						rmv.call(layer, type, callback.hijacked || callback, capture);
					} else {
						rmv.call(layer, type, callback, capture);
					}
				};

				layer.addEventListener = function(type, callback, capture) {
					var adv = Node.prototype.addEventListener;
					if (type === 'click') {
						adv.call(layer, type, callback.hijacked || (callback.hijacked = function(event) {
							if (!event.propagationStopped) {
								callback(event);
							}
						}), capture);
					} else {
						adv.call(layer, type, callback, capture);
					}
				};
			}

			// If a handler is already declared in the element's onclick attribute, it will be fired before
			// FastClick's onClick handler. Fix this by pulling out the user-defined handler function and
			// adding it as listener.
			if (typeof layer.onclick === 'function') {

				// Android browser on at least 3.2 requires a new reference to the function in layer.onclick
				// - the old one won't work if passed to addEventListener directly.
				oldOnClick = layer.onclick;
				layer.addEventListener('click', function(event) {
					oldOnClick(event);
				}, false);
				layer.onclick = null;
			}
		}

		/**
		* Windows Phone 8.1 fakes user agent string to look like Android and iPhone.
		*
		* @type boolean
		*/
		var deviceIsWindowsPhone = navigator.userAgent.indexOf("Windows Phone") >= 0;

		/**
		 * Android requires exceptions.
		 *
		 * @type boolean
		 */
		var deviceIsAndroid = navigator.userAgent.indexOf('Android') > 0 && !deviceIsWindowsPhone;


		/**
		 * iOS requires exceptions.
		 *
		 * @type boolean
		 */
		var deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent) && !deviceIsWindowsPhone;


		/**
		 * iOS 4 requires an exception for select elements.
		 *
		 * @type boolean
		 */
		var deviceIsIOS4 = deviceIsIOS && (/OS 4_\d(_\d)?/).test(navigator.userAgent);


		/**
		 * iOS 6.0-7.* requires the target element to be manually derived
		 *
		 * @type boolean
		 */
		var deviceIsIOSWithBadTarget = deviceIsIOS && (/OS [6-7]_\d/).test(navigator.userAgent);

		/**
		 * BlackBerry requires exceptions.
		 *
		 * @type boolean
		 */
		var deviceIsBlackBerry10 = navigator.userAgent.indexOf('BB10') > 0;

		/**
		 * Determine whether a given element requires a native click.
		 *
		 * @param {EventTarget|Element} target Target DOM element
		 * @returns {boolean} Returns true if the element needs a native click
		 */
		FastClick.prototype.needsClick = function(target) {
			switch (target.nodeName.toLowerCase()) {

			// Don't send a synthetic click to disabled inputs (issue #62)
			case 'button':
			case 'select':
			case 'textarea':
				if (target.disabled) {
					return true;
				}

				break;
			case 'input':

				// File inputs need real clicks on iOS 6 due to a browser bug (issue #68)
				if ((deviceIsIOS && target.type === 'file') || target.disabled) {
					return true;
				}

				break;
			case 'label':
			case 'iframe': // iOS8 homescreen apps can prevent events bubbling into frames
			case 'video':
				return true;
			}

			return (/\bneedsclick\b/).test(target.className);
		};


		/**
		 * Determine whether a given element requires a call to focus to simulate click into element.
		 *
		 * @param {EventTarget|Element} target Target DOM element
		 * @returns {boolean} Returns true if the element requires a call to focus to simulate native click.
		 */
		FastClick.prototype.needsFocus = function(target) {
			switch (target.nodeName.toLowerCase()) {
			case 'textarea':
				return true;
			case 'select':
				return !deviceIsAndroid;
			case 'input':
				switch (target.type) {
				case 'button':
				case 'checkbox':
				case 'file':
				case 'image':
				case 'radio':
				case 'submit':
					return false;
				}

				// No point in attempting to focus disabled inputs
				return !target.disabled && !target.readOnly;
			default:
				return (/\bneedsfocus\b/).test(target.className);
			}
		};


		/**
		 * Send a click event to the specified element.
		 *
		 * @param {EventTarget|Element} targetElement
		 * @param {Event} event
		 */
		FastClick.prototype.sendClick = function(targetElement, event) {
			var clickEvent, touch;

			// On some Android devices activeElement needs to be blurred otherwise the synthetic click will have no effect (#24)
			if (document.activeElement && document.activeElement !== targetElement) {
				document.activeElement.blur();
			}

			touch = event.changedTouches[0];

			// Synthesise a click event, with an extra attribute so it can be tracked
			clickEvent = document.createEvent('MouseEvents');
			clickEvent.initMouseEvent(this.determineEventType(targetElement), true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
			clickEvent.forwardedTouchEvent = true;
			targetElement.dispatchEvent(clickEvent);
		};

		FastClick.prototype.determineEventType = function(targetElement) {

			//Issue #159: Android Chrome Select Box does not open with a synthetic click event
			if (deviceIsAndroid && targetElement.tagName.toLowerCase() === 'select') {
				return 'mousedown';
			}

			return 'click';
		};


		/**
		 * @param {EventTarget|Element} targetElement
		 */
		FastClick.prototype.focus = function(targetElement) {
			var length;

			// Issue #160: on iOS 7, some input elements (e.g. date datetime month) throw a vague TypeError on setSelectionRange. These elements don't have an integer value for the selectionStart and selectionEnd properties, but unfortunately that can't be used for detection because accessing the properties also throws a TypeError. Just check the type instead. Filed as Apple bug #15122724.
			if (deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month') {
				length = targetElement.value.length;
				targetElement.setSelectionRange(length, length);
			} else {
				targetElement.focus();
			}
		};


		/**
		 * Check whether the given target element is a child of a scrollable layer and if so, set a flag on it.
		 *
		 * @param {EventTarget|Element} targetElement
		 */
		FastClick.prototype.updateScrollParent = function(targetElement) {
			var scrollParent, parentElement;

			scrollParent = targetElement.fastClickScrollParent;

			// Attempt to discover whether the target element is contained within a scrollable layer. Re-check if the
			// target element was moved to another parent.
			if (!scrollParent || !scrollParent.contains(targetElement)) {
				parentElement = targetElement;
				do {
					if (parentElement.scrollHeight > parentElement.offsetHeight) {
						scrollParent = parentElement;
						targetElement.fastClickScrollParent = parentElement;
						break;
					}

					parentElement = parentElement.parentElement;
				} while (parentElement);
			}

			// Always update the scroll top tracker if possible.
			if (scrollParent) {
				scrollParent.fastClickLastScrollTop = scrollParent.scrollTop;
			}
		};


		/**
		 * @param {EventTarget} targetElement
		 * @returns {Element|EventTarget}
		 */
		FastClick.prototype.getTargetElementFromEventTarget = function(eventTarget) {

			// On some older browsers (notably Safari on iOS 4.1 - see issue #56) the event target may be a text node.
			if (eventTarget.nodeType === Node.TEXT_NODE) {
				return eventTarget.parentNode;
			}

			return eventTarget;
		};


		/**
		 * On touch start, record the position and scroll offset.
		 *
		 * @param {Event} event
		 * @returns {boolean}
		 */
		FastClick.prototype.onTouchStart = function(event) {
			var targetElement, touch, selection;

			// Ignore multiple touches, otherwise pinch-to-zoom is prevented if both fingers are on the FastClick element (issue #111).
			if (event.targetTouches.length > 1) {
				return true;
			}

			targetElement = this.getTargetElementFromEventTarget(event.target);
			touch = event.targetTouches[0];

			if (deviceIsIOS) {

				// Only trusted events will deselect text on iOS (issue #49)
				selection = window.getSelection();
				if (selection.rangeCount && !selection.isCollapsed) {
					return true;
				}

				if (!deviceIsIOS4) {

					// Weird things happen on iOS when an alert or confirm dialog is opened from a click event callback (issue #23):
					// when the user next taps anywhere else on the page, new touchstart and touchend events are dispatched
					// with the same identifier as the touch event that previously triggered the click that triggered the alert.
					// Sadly, there is an issue on iOS 4 that causes some normal touch events to have the same identifier as an
					// immediately preceeding touch event (issue #52), so this fix is unavailable on that platform.
					// Issue 120: touch.identifier is 0 when Chrome dev tools 'Emulate touch events' is set with an iOS device UA string,
					// which causes all touch events to be ignored. As this block only applies to iOS, and iOS identifiers are always long,
					// random integers, it's safe to to continue if the identifier is 0 here.
					if (touch.identifier && touch.identifier === this.lastTouchIdentifier) {
						event.preventDefault();
						return false;
					}

					this.lastTouchIdentifier = touch.identifier;

					// If the target element is a child of a scrollable layer (using -webkit-overflow-scrolling: touch) and:
					// 1) the user does a fling scroll on the scrollable layer
					// 2) the user stops the fling scroll with another tap
					// then the event.target of the last 'touchend' event will be the element that was under the user's finger
					// when the fling scroll was started, causing FastClick to send a click event to that layer - unless a check
					// is made to ensure that a parent layer was not scrolled before sending a synthetic click (issue #42).
					this.updateScrollParent(targetElement);
				}
			}

			this.trackingClick = true;
			this.trackingClickStart = event.timeStamp;
			this.targetElement = targetElement;

			this.touchStartX = touch.pageX;
			this.touchStartY = touch.pageY;

			// Prevent phantom clicks on fast double-tap (issue #36)
			if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {
				event.preventDefault();
			}

			return true;
		};


		/**
		 * Based on a touchmove event object, check whether the touch has moved past a boundary since it started.
		 *
		 * @param {Event} event
		 * @returns {boolean}
		 */
		FastClick.prototype.touchHasMoved = function(event) {
			var touch = event.changedTouches[0], boundary = this.touchBoundary;

			if (Math.abs(touch.pageX - this.touchStartX) > boundary || Math.abs(touch.pageY - this.touchStartY) > boundary) {
				return true;
			}

			return false;
		};


		/**
		 * Update the last position.
		 *
		 * @param {Event} event
		 * @returns {boolean}
		 */
		FastClick.prototype.onTouchMove = function(event) {
			if (!this.trackingClick) {
				return true;
			}

			// If the touch has moved, cancel the click tracking
			if (this.targetElement !== this.getTargetElementFromEventTarget(event.target) || this.touchHasMoved(event)) {
				this.trackingClick = false;
				this.targetElement = null;
			}

			return true;
		};


		/**
		 * Attempt to find the labelled control for the given label element.
		 *
		 * @param {EventTarget|HTMLLabelElement} labelElement
		 * @returns {Element|null}
		 */
		FastClick.prototype.findControl = function(labelElement) {

			// Fast path for newer browsers supporting the HTML5 control attribute
			if (labelElement.control !== undefined) {
				return labelElement.control;
			}

			// All browsers under test that support touch events also support the HTML5 htmlFor attribute
			if (labelElement.htmlFor) {
				return document.getElementById(labelElement.htmlFor);
			}

			// If no for attribute exists, attempt to retrieve the first labellable descendant element
			// the list of which is defined here: http://www.w3.org/TR/html5/forms.html#category-label
			return labelElement.querySelector('button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea');
		};


		/**
		 * On touch end, determine whether to send a click event at once.
		 *
		 * @param {Event} event
		 * @returns {boolean}
		 */
		FastClick.prototype.onTouchEnd = function(event) {
			var forElement, trackingClickStart, targetTagName, scrollParent, touch, targetElement = this.targetElement;

			if (!this.trackingClick) {
				return true;
			}

			// Prevent phantom clicks on fast double-tap (issue #36)
			if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {
				this.cancelNextClick = true;
				return true;
			}

			if ((event.timeStamp - this.trackingClickStart) > this.tapTimeout) {
				return true;
			}

			// Reset to prevent wrong click cancel on input (issue #156).
			this.cancelNextClick = false;

			this.lastClickTime = event.timeStamp;

			trackingClickStart = this.trackingClickStart;
			this.trackingClick = false;
			this.trackingClickStart = 0;

			// On some iOS devices, the targetElement supplied with the event is invalid if the layer
			// is performing a transition or scroll, and has to be re-detected manually. Note that
			// for this to function correctly, it must be called *after* the event target is checked!
			// See issue #57; also filed as rdar://13048589 .
			if (deviceIsIOSWithBadTarget) {
				touch = event.changedTouches[0];

				// In certain cases arguments of elementFromPoint can be negative, so prevent setting targetElement to null
				targetElement = document.elementFromPoint(touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset) || targetElement;
				targetElement.fastClickScrollParent = this.targetElement.fastClickScrollParent;
			}

			targetTagName = targetElement.tagName.toLowerCase();
			if (targetTagName === 'label') {
				forElement = this.findControl(targetElement);
				if (forElement) {
					this.focus(targetElement);
					if (deviceIsAndroid) {
						return false;
					}

					targetElement = forElement;
				}
			} else if (this.needsFocus(targetElement)) {

				// Case 1: If the touch started a while ago (best guess is 100ms based on tests for issue #36) then focus will be triggered anyway. Return early and unset the target element reference so that the subsequent click will be allowed through.
				// Case 2: Without this exception for input elements tapped when the document is contained in an iframe, then any inputted text won't be visible even though the value attribute is updated as the user types (issue #37).
				if ((event.timeStamp - trackingClickStart) > 100 || (deviceIsIOS && window.top !== window && targetTagName === 'input')) {
					this.targetElement = null;
					return false;
				}

				this.focus(targetElement);
				this.sendClick(targetElement, event);

				// Select elements need the event to go through on iOS 4, otherwise the selector menu won't open.
				// Also this breaks opening selects when VoiceOver is active on iOS6, iOS7 (and possibly others)
				if (!deviceIsIOS || targetTagName !== 'select') {
					this.targetElement = null;
					event.preventDefault();
				}

				return false;
			}

			if (deviceIsIOS && !deviceIsIOS4) {

				// Don't send a synthetic click event if the target element is contained within a parent layer that was scrolled
				// and this tap is being used to stop the scrolling (usually initiated by a fling - issue #42).
				scrollParent = targetElement.fastClickScrollParent;
				if (scrollParent && scrollParent.fastClickLastScrollTop !== scrollParent.scrollTop) {
					return true;
				}
			}

			// Prevent the actual click from going though - unless the target node is marked as requiring
			// real clicks or if it is in the whitelist in which case only non-programmatic clicks are permitted.
			if (!this.needsClick(targetElement)) {
				event.preventDefault();
				this.sendClick(targetElement, event);
			}

			return false;
		};


		/**
		 * On touch cancel, stop tracking the click.
		 *
		 * @returns {void}
		 */
		FastClick.prototype.onTouchCancel = function() {
			this.trackingClick = false;
			this.targetElement = null;
		};


		/**
		 * Determine mouse events which should be permitted.
		 *
		 * @param {Event} event
		 * @returns {boolean}
		 */
		FastClick.prototype.onMouse = function(event) {

			// If a target element was never set (because a touch event was never fired) allow the event
			if (!this.targetElement) {
				return true;
			}

			if (event.forwardedTouchEvent) {
				return true;
			}

			// Programmatically generated events targeting a specific element should be permitted
			if (!event.cancelable) {
				return true;
			}

			// Derive and check the target element to see whether the mouse event needs to be permitted;
			// unless explicitly enabled, prevent non-touch click events from triggering actions,
			// to prevent ghost/doubleclicks.
			if (!this.needsClick(this.targetElement) || this.cancelNextClick) {

				// Prevent any user-added listeners declared on FastClick element from being fired.
				if (event.stopImmediatePropagation) {
					event.stopImmediatePropagation();
				} else {

					// Part of the hack for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
					event.propagationStopped = true;
				}

				// Cancel the event
				event.stopPropagation();
				event.preventDefault();

				return false;
			}

			// If the mouse event is permitted, return true for the action to go through.
			return true;
		};


		/**
		 * On actual clicks, determine whether this is a touch-generated click, a click action occurring
		 * naturally after a delay after a touch (which needs to be cancelled to avoid duplication), or
		 * an actual click which should be permitted.
		 *
		 * @param {Event} event
		 * @returns {boolean}
		 */
		FastClick.prototype.onClick = function(event) {
			var permitted;

			// It's possible for another FastClick-like library delivered with third-party code to fire a click event before FastClick does (issue #44). In that case, set the click-tracking flag back to false and return early. This will cause onTouchEnd to return early.
			if (this.trackingClick) {
				this.targetElement = null;
				this.trackingClick = false;
				return true;
			}

			// Very odd behaviour on iOS (issue #18): if a submit element is present inside a form and the user hits enter in the iOS simulator or clicks the Go button on the pop-up OS keyboard the a kind of 'fake' click event will be triggered with the submit-type input element as the target.
			if (event.target.type === 'submit' && event.detail === 0) {
				return true;
			}

			permitted = this.onMouse(event);

			// Only unset targetElement if the click is not permitted. This will ensure that the check for !targetElement in onMouse fails and the browser's click doesn't go through.
			if (!permitted) {
				this.targetElement = null;
			}

			// If clicks are permitted, return true for the action to go through.
			return permitted;
		};


		/**
		 * Remove all FastClick's event listeners.
		 *
		 * @returns {void}
		 */
		FastClick.prototype.destroy = function() {
			var layer = this.layer;

			if (deviceIsAndroid) {
				layer.removeEventListener('mouseover', this.onMouse, true);
				layer.removeEventListener('mousedown', this.onMouse, true);
				layer.removeEventListener('mouseup', this.onMouse, true);
			}

			layer.removeEventListener('click', this.onClick, true);
			layer.removeEventListener('touchstart', this.onTouchStart, false);
			layer.removeEventListener('touchmove', this.onTouchMove, false);
			layer.removeEventListener('touchend', this.onTouchEnd, false);
			layer.removeEventListener('touchcancel', this.onTouchCancel, false);
		};


		/**
		 * Check whether FastClick is needed.
		 *
		 * @param {Element} layer The layer to listen on
		 */
		FastClick.notNeeded = function(layer) {
			var metaViewport;
			var chromeVersion;
			var blackberryVersion;
			var firefoxVersion;

			// Devices that don't support touch don't need FastClick
			if (typeof window.ontouchstart === 'undefined') {
				return true;
			}

			// Chrome version - zero for other browsers
			chromeVersion = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [,0])[1];

			if (chromeVersion) {

				if (deviceIsAndroid) {
					metaViewport = document.querySelector('meta[name=viewport]');

					if (metaViewport) {
						// Chrome on Android with user-scalable="no" doesn't need FastClick (issue #89)
						if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
							return true;
						}
						// Chrome 32 and above with width=device-width or less don't need FastClick
						if (chromeVersion > 31 && document.documentElement.scrollWidth <= window.outerWidth) {
							return true;
						}
					}

				// Chrome desktop doesn't need FastClick (issue #15)
				} else {
					return true;
				}
			}

			if (deviceIsBlackBerry10) {
				blackberryVersion = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/);

				// BlackBerry 10.3+ does not require Fastclick library.
				// https://github.com/ftlabs/fastclick/issues/251
				if (blackberryVersion[1] >= 10 && blackberryVersion[2] >= 3) {
					metaViewport = document.querySelector('meta[name=viewport]');

					if (metaViewport) {
						// user-scalable=no eliminates click delay.
						if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
							return true;
						}
						// width=device-width (or less than device-width) eliminates click delay.
						if (document.documentElement.scrollWidth <= window.outerWidth) {
							return true;
						}
					}
				}
			}

			// IE10 with -ms-touch-action: none or manipulation, which disables double-tap-to-zoom (issue #97)
			if (layer.style.msTouchAction === 'none' || layer.style.touchAction === 'manipulation') {
				return true;
			}

			// Firefox version - zero for other browsers
			firefoxVersion = +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [,0])[1];

			if (firefoxVersion >= 27) {
				// Firefox 27+ does not have tap delay if the content is not zoomable - https://bugzilla.mozilla.org/show_bug.cgi?id=922896

				metaViewport = document.querySelector('meta[name=viewport]');
				if (metaViewport && (metaViewport.content.indexOf('user-scalable=no') !== -1 || document.documentElement.scrollWidth <= window.outerWidth)) {
					return true;
				}
			}

			// IE11: prefixed -ms-touch-action is no longer supported and it's recomended to use non-prefixed version
			// http://msdn.microsoft.com/en-us/library/windows/apps/Hh767313.aspx
			if (layer.style.touchAction === 'none' || layer.style.touchAction === 'manipulation') {
				return true;
			}

			return false;
		};


		/**
		 * Factory method for creating a FastClick object
		 *
		 * @param {Element} layer The layer to listen on
		 * @param {Object} [options={}] The options to override the defaults
		 */
		FastClick.attach = function(layer, options) {
			return new FastClick(layer, options);
		};


		if (true) {

			// AMD. Register as an anonymous module.
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
				return FastClick;
			}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if (typeof module !== 'undefined' && module.exports) {
			module.exports = FastClick.attach;
			module.exports.FastClick = FastClick;
		} else {
			window.FastClick = FastClick;
		}
	}());


/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = void 0;

	/* global document */
	var Menu = {
	  menuClass: "nav-mobile-menu",
	  init: function init() {
	    var _this = this;

	    var mobileMenuTrigger = document.querySelector(".nav-mobile-header-title");

	    if (!mobileMenuTrigger) {
	      return;
	    }

	    mobileMenuTrigger.addEventListener("click", function (e) {
	      e.preventDefault();

	      _this.openMenu();
	    });
	    document.querySelector(".nav-mobile-menu-close").addEventListener("click", function (e) {
	      e.preventDefault();

	      _this.closeMenu();
	    });
	  },
	  openMenu: function openMenu() {
	    document.querySelector(".".concat(this.menuClass)).classList.add("".concat(this.menuClass, "--show"));
	    document.body.classList.add("no-scroll");
	  },
	  closeMenu: function closeMenu() {
	    document.querySelector(".".concat(this.menuClass)).classList.remove("".concat(this.menuClass, "--show"));
	    document.body.classList.remove("no-scroll");
	  }
	};
	var _default = Menu;
	exports["default"] = _default;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = void 0;

	var _throttle = _interopRequireDefault(__webpack_require__(4));

	var _getScroll = _interopRequireDefault(__webpack_require__(5));

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	/* global window, document, Image */
	var LazyImages = {
	  buffer: 350,
	  search: function search() {
	    // load images onscreen at init
	    this.checkScroll(); // load additional images on scroll

	    var lazyScroll = (0, _throttle["default"])(300, this.checkScroll.bind(this));
	    document.addEventListener("scroll", lazyScroll);
	  },
	  checkScroll: function checkScroll() {
	    var _this = this;

	    document.querySelectorAll("[data-lazy-image]").forEach(function (lazyImage) {
	      if (_this.elementIsOnScreen(lazyImage)) {
	        _this.loadImage(lazyImage);
	      }
	    });
	  },
	  loadImage: function loadImage(el) {
	    var src = el.getAttribute("data-lazy-image");
	    var alt = el.getAttribute("data-lazy-image-alt");
	    var img = new Image();
	    var maxWidth = el.getAttribute("data-lazy-max-width");

	    if (maxWidth) {
	      maxWidth = "".concat(maxWidth, "px");
	    } else {
	      maxWidth = "auto";
	    } // remove the data attribute to keep it from loading again


	    el.removeAttribute("data-lazy-image");
	    el.removeAttribute("data-lazy-image-alt");
	    el.removeAttribute("data-lazy-image-max-width");
	    img.setAttribute("src", src);
	    img.setAttribute("alt", alt);
	    img.style.maxWidth = maxWidth;
	    img.addEventListener("load", function () {
	      el.append(img);
	    });
	  },
	  elementIsOnScreen: function elementIsOnScreen(el) {
	    if (!el) {
	      return false;
	    }

	    var buffer = this.buffer || 0;
	    var windowTop = (0, _getScroll["default"])();
	    var windowBottom = windowTop + window.innerHeight;
	    var rect = el.getBoundingClientRect();
	    var top = rect.top + windowTop;
	    var bottom = rect.bottom + windowTop;
	    var topIsVisible = top >= windowTop - buffer && top < windowBottom + buffer;
	    var bottomIsVisible = bottom > windowTop - buffer && bottom <= windowBottom + buffer;
	    var isBiggerThanScreen = rect.height != null && rect.height > LazyImages.windowHeight && top <= windowTop - buffer && bottom >= windowBottom + buffer;
	    return topIsVisible || bottomIsVisible || isBiggerThanScreen;
	  }
	};
	var _default = LazyImages;
	exports["default"] = _default;

/***/ },
/* 4 */
/***/ function(module, exports) {

	/* eslint-disable no-undefined,no-param-reassign,no-shadow */

	/**
	 * Throttle execution of a function. Especially useful for rate limiting
	 * execution of handlers on events like resize and scroll.
	 *
	 * @param  {Number}    delay          A zero-or-greater delay in milliseconds. For event callbacks, values around 100 or 250 (or even higher) are most useful.
	 * @param  {Boolean}   noTrailing     Optional, defaults to false. If noTrailing is true, callback will only execute every `delay` milliseconds while the
	 *                                    throttled-function is being called. If noTrailing is false or unspecified, callback will be executed one final time
	 *                                    after the last throttled-function call. (After the throttled-function has not been called for `delay` milliseconds,
	 *                                    the internal counter is reset)
	 * @param  {Function}  callback       A function to be executed after delay milliseconds. The `this` context and all arguments are passed through, as-is,
	 *                                    to `callback` when the throttled-function is executed.
	 * @param  {Boolean}   debounceMode   If `debounceMode` is true (at begin), schedule `clear` to execute after `delay` ms. If `debounceMode` is false (at end),
	 *                                    schedule `callback` to execute after `delay` ms.
	 *
	 * @return {Function}  A new, throttled, function.
	 */
	module.exports = function ( delay, noTrailing, callback, debounceMode ) {

		// After wrapper has stopped being called, this timeout ensures that
		// `callback` is executed at the proper times in `throttle` and `end`
		// debounce modes.
		var timeoutID;

		// Keep track of the last time `callback` was executed.
		var lastExec = 0;

		// `noTrailing` defaults to falsy.
		if ( typeof noTrailing !== 'boolean' ) {
			debounceMode = callback;
			callback = noTrailing;
			noTrailing = undefined;
		}

		// The `wrapper` function encapsulates all of the throttling / debouncing
		// functionality and when executed will limit the rate at which `callback`
		// is executed.
		function wrapper () {

			var self = this;
			var elapsed = Number(new Date()) - lastExec;
			var args = arguments;

			// Execute `callback` and update the `lastExec` timestamp.
			function exec () {
				lastExec = Number(new Date());
				callback.apply(self, args);
			}

			// If `debounceMode` is true (at begin) this is used to clear the flag
			// to allow future `callback` executions.
			function clear () {
				timeoutID = undefined;
			}

			if ( debounceMode && !timeoutID ) {
				// Since `wrapper` is being called for the first time and
				// `debounceMode` is true (at begin), execute `callback`.
				exec();
			}

			// Clear any existing timeout.
			if ( timeoutID ) {
				clearTimeout(timeoutID);
			}

			if ( debounceMode === undefined && elapsed > delay ) {
				// In throttle mode, if `delay` time has been exceeded, execute
				// `callback`.
				exec();

			} else if ( noTrailing !== true ) {
				// In trailing throttle mode, since `delay` time has not been
				// exceeded, schedule `callback` to execute `delay` ms after most
				// recent execution.
				//
				// If `debounceMode` is true (at begin), schedule `clear` to execute
				// after `delay` ms.
				//
				// If `debounceMode` is false (at end), schedule `callback` to
				// execute after `delay` ms.
				timeoutID = setTimeout(debounceMode ? clear : exec, debounceMode === undefined ? delay - elapsed : delay);
			}

		}

		// Return the wrapper function.
		return wrapper;

	};


/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = void 0;

	/* global window, document */
	var _default = function _default() {
	  if (!window || !document) {
	    return 0;
	  }

	  return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
	};

	exports["default"] = _default;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = void 0;

	var _audio = _interopRequireDefault(__webpack_require__(7));

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	/* global document */
	var Audio = {
	  init: function init() {
	    var audioInstance = (0, _audio["default"])("audiojs", "audiojsInstance", this);
	    audioInstance = this.audiojs;
	    audioInstance.events.ready(function () {
	      var audioElements = audioInstance.createAll({
	        css: false
	      });
	      var buttons = document.querySelectorAll(".audiojs .play-pause"); // pause all other players on click of a play button

	      buttons.forEach(function (button) {
	        button.addEventListener("click", function (e) {
	          var thisIndex = Array.prototype.indexOf.call(buttons, e.currentTarget);
	          audioElements.forEach(function (audioElement, i) {
	            if (i === thisIndex || !audioElement.playing) {
	              return;
	            }

	            audioElement.pause();
	          });
	        });
	      });
	    });
	  }
	};
	var _default = Audio;
	exports["default"] = _default;

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";

	function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

	// https://github.com/kolber/audiojs
	// modified by michael p. geraci to sort of work in the context of webpack
	// look for changes from the source by searching for "mgchange"
	// A cross-browser javascript shim for html5 audio
	module.exports = function (audiojs, audiojsInstance, container) {
	  // Use the path to the audio.js file to create relative paths to the swf and player graphics
	  // Remember that some systems (e.g. ruby on rails) append strings like '?1301478336' to asset paths
	  var path = function () {
	    var re = new RegExp('audio(\.min)?\.js.*'),
	        scripts = document.getElementsByTagName('script');

	    for (var i = 0, ii = scripts.length; i < ii; i++) {
	      var path = scripts[i].getAttribute('src');

	      if (re.test(path)) {
	        var f = path.split('/');
	        f.pop();
	        return f.join('/') + '/';
	      }
	    } // when no script found, an empty string causes the least confusion.


	    return '';
	  }();

	  if (typeof container === "undefined" || container === null) {
	    container = window;
	  } // ##The audiojs interface
	  // This is the global object which provides an interface for creating new `audiojs` instances.
	  // It also stores all of the construction helper methods and variables.


	  container[audiojs] = {
	    instanceCount: 0,
	    instances: {},
	    // The markup for the swf. It is injected into the page if there is not support for the `<audio>` element. The `$n`s are placeholders.
	    // `$1` The name of the flash movie
	    // `$2` The path to the swf
	    // `$3` Cache invalidation
	    flashSource: '\
	      <object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" id="$1" width="1" height="1" name="$1" style="position: absolute; left: -1px;"> \
	        <param name="movie" value="$2?playerInstance=' + audiojs + '.instances[\'$1\']&datetime=$3"> \
	        <param name="allowscriptaccess" value="always"> \
	        <embed name="$1" src="$2?playerInstance=' + audiojs + '.instances[\'$1\']&datetime=$3" width="1" height="1" allowscriptaccess="always"> \
	      </object>',
	    // ### The main settings object
	    // Where all the default settings are stored. Each of these variables and methods can be overwritten by the user-provided `options` object.
	    settings: {
	      autoplay: false,
	      loop: false,
	      preload: true,
	      imageLocation: path + 'player-graphics.gif',
	      retinaImageLocation: path + 'player-graphics@2x.gif',
	      swfLocation: path + 'audiojs.swf',
	      useFlash: function () {
	        var a = document.createElement('audio');
	        return !(a.canPlayType && a.canPlayType('audio/mpeg;').replace(/no/, ''));
	      }(),
	      hasFlash: function () {
	        if (navigator.plugins && navigator.plugins.length && navigator.plugins['Shockwave Flash']) {
	          return true;
	        } else if (navigator.mimeTypes && navigator.mimeTypes.length) {
	          var mimeType = navigator.mimeTypes['application/x-shockwave-flash'];
	          return mimeType && mimeType.enabledPlugin;
	        } else {
	          try {
	            var ax = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
	            return true;
	          } catch (e) {}
	        }

	        return false;
	      }(),
	      // The default markup and classes for creating the player:
	      createPlayer: {
	        markup: '\
	          <div class="play-pause"> \
	            <p class="play"></p> \
	            <p class="pause"></p> \
	            <p class="loading"></p> \
	            <p class="error"></p> \
	          </div> \
	          <div class="scrubber"> \
	            <div class="progress"></div> \
	            <div class="loaded"></div> \
	          </div> \
	          <div class="time"> \
	            <em class="played">00:00</em>/<strong class="duration">00:00</strong> \
	          </div> \
	          <div class="error-message"></div>',
	        playPauseClass: 'play-pause',
	        scrubberClass: 'scrubber',
	        progressClass: 'progress',
	        loaderClass: 'loaded',
	        timeClass: 'time',
	        durationClass: 'duration',
	        playedClass: 'played',
	        errorMessageClass: 'error-message',
	        playingClass: 'playing',
	        loadingClass: 'loading',
	        errorClass: 'error'
	      },
	      // The css used by the default player. This is is dynamically injected into a `<style>` tag in the top of the head.
	      css: '\
	        .audiojs audio { position: absolute; left: -1px; } \
	        .audiojs { width: 460px; height: 36px; background: #404040; overflow: hidden; font-family: monospace; font-size: 12px; \
	          background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0, #444), color-stop(0.5, #555), color-stop(0.51, #444), color-stop(1, #444)); \
	          background-image: -moz-linear-gradient(center top, #444 0%, #555 50%, #444 51%, #444 100%); \
	          -webkit-box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.3); -moz-box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.3); \
	          -o-box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.3); box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.3); } \
	        .audiojs .play-pause { width: 25px; height: 40px; padding: 4px 6px; margin: 0px; float: left; overflow: hidden; border-right: 1px solid #000; } \
	        .audiojs p { display: none; width: 25px; height: 40px; margin: 0px; cursor: pointer; } \
	        .audiojs .play { display: block; } \
	        .audiojs .scrubber { position: relative; float: left; width: 280px; background: #5a5a5a; height: 14px; margin: 10px; border-top: 1px solid #3f3f3f; border-left: 0px; border-bottom: 0px; overflow: hidden; } \
	        .audiojs .progress { position: absolute; top: 0px; left: 0px; height: 14px; width: 0px; background: #ccc; z-index: 1; \
	          background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0, #ccc), color-stop(0.5, #ddd), color-stop(0.51, #ccc), color-stop(1, #ccc)); \
	          background-image: -moz-linear-gradient(center top, #ccc 0%, #ddd 50%, #ccc 51%, #ccc 100%); } \
	        .audiojs .loaded { position: absolute; top: 0px; left: 0px; height: 14px; width: 0px; background: #000; \
	          background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0, #222), color-stop(0.5, #333), color-stop(0.51, #222), color-stop(1, #222)); \
	          background-image: -moz-linear-gradient(center top, #222 0%, #333 50%, #222 51%, #222 100%); } \
	        .audiojs .time { float: left; height: 36px; line-height: 36px; margin: 0px 0px 0px 6px; padding: 0px 6px 0px 12px; border-left: 1px solid #000; color: #ddd; text-shadow: 1px 1px 0px rgba(0, 0, 0, 0.5); } \
	        .audiojs .time em { padding: 0px 2px 0px 0px; color: #f9f9f9; font-style: normal; } \
	        .audiojs .time strong { padding: 0px 0px 0px 2px; font-weight: normal; } \
	        .audiojs .error-message { float: left; display: none; margin: 0px 10px; height: 36px; width: 400px; overflow: hidden; line-height: 36px; white-space: nowrap; color: #fff; \
	          text-overflow: ellipsis; -o-text-overflow: ellipsis; -icab-text-overflow: ellipsis; -khtml-text-overflow: ellipsis; -moz-text-overflow: ellipsis; -webkit-text-overflow: ellipsis; } \
	        .audiojs .error-message a { color: #eee; text-decoration: none; padding-bottom: 1px; border-bottom: 1px solid #999; white-space: wrap; } \
	        \
	        .audiojs .play { background: url("$1") -2px -1px no-repeat; } \
	        .audiojs .loading { background: url("$1") -2px -31px no-repeat; } \
	        .audiojs .error { background: url("$1") -2px -61px no-repeat; } \
	        .audiojs .pause { background: url("$1") -2px -91px no-repeat; } \
	        \
	        @media only screen and (-webkit-min-device-pixel-ratio: 2), \
	          only screen and (min--moz-device-pixel-ratio: 2), \
	          only screen and (min-moz-device-pixel-ratio: 2), \
	          only screen and (-o-min-device-pixel-ratio: 2/1), \
	          only screen and (min-device-pixel-ratio: 2) { \
	            .audiojs .play, .audiojs .loading, .audiojs .error, .audiojs .pause { \
	              background-image: url("$2"); \
	              -webkit-background-size: 30px 120px; \
	              -moz-background-size: 30px 120px; \
	              -o-background-size: 30px 120px; \
	              background-size: 30px 120px; \
	            } \
	        } \
	        \
	        .playing .play, .playing .loading, .playing .error { display: none; } \
	        .playing .pause { display: block; } \
	        \
	        .loading .play, .loading .pause, .loading .error { display: none; } \
	        .loading .loading { display: block; } \
	        \
	        .error .time, .error .play, .error .pause, .error .scrubber, .error .loading { display: none; } \
	        .error .error { display: block; } \
	        .error .play-pause p { cursor: auto; } \
	        .error .error-message { display: block; }',
	      // The default event callbacks:
	      trackEnded: function trackEnded(e) {},
	      flashError: function flashError() {
	        var player = this.settings.createPlayer,
	            errorMessage = getByClass(player.errorMessageClass, this.wrapper),
	            html = 'Missing <a href="http://get.adobe.com/flashplayer/">flash player</a> plugin.';
	        if (this.mp3) html += ' <a href="' + this.mp3 + '">Download audio file</a>.';
	        container[audiojs].helpers.removeClass(this.wrapper, player.loadingClass);
	        container[audiojs].helpers.addClass(this.wrapper, player.errorClass);
	        errorMessage.innerHTML = html;
	      },
	      loadError: function loadError(e) {
	        var player = this.settings.createPlayer,
	            errorMessage = getByClass(player.errorMessageClass, this.wrapper);
	        container[audiojs].helpers.removeClass(this.wrapper, player.loadingClass);
	        container[audiojs].helpers.addClass(this.wrapper, player.errorClass);
	        errorMessage.innerHTML = 'Error loading: "' + this.mp3 + '"';
	      },
	      init: function init() {
	        var player = this.settings.createPlayer;
	        container[audiojs].helpers.addClass(this.wrapper, player.loadingClass);
	      },
	      loadStarted: function loadStarted() {
	        var player = this.settings.createPlayer,
	            duration = getByClass(player.durationClass, this.wrapper),
	            m = Math.floor(this.duration / 60),
	            s = Math.floor(this.duration % 60);
	        container[audiojs].helpers.removeClass(this.wrapper, player.loadingClass);
	        duration.innerHTML = (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
	      },
	      loadProgress: function loadProgress(percent) {
	        var player = this.settings.createPlayer,
	            loaded = getByClass(player.loaderClass, this.wrapper);
	        loaded.style.width = Math.round(100 * percent) + '%';
	      },
	      playPause: function playPause() {
	        if (this.playing) this.settings.play();else this.settings.pause();
	      },
	      play: function play() {
	        var player = this.settings.createPlayer;
	        container[audiojs].helpers.removeClass(this.wrapper, player.errorClass);
	        container[audiojs].helpers.addClass(this.wrapper, player.playingClass);
	      },
	      pause: function pause() {
	        var player = this.settings.createPlayer;
	        container[audiojs].helpers.removeClass(this.wrapper, player.playingClass);
	      },
	      updatePlayhead: function updatePlayhead(percent) {
	        var player = this.settings.createPlayer,
	            progress = getByClass(player.progressClass, this.wrapper);
	        progress.style.width = Math.round(100 * percent) + '%';
	        var played = getByClass(player.playedClass, this.wrapper),
	            p = this.duration * percent,
	            m = Math.floor(p / 60),
	            s = Math.floor(p % 60);
	        played.innerHTML = (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
	      }
	    },
	    // ### Contructor functions
	    // `create()`
	    // Used to create a single `audiojs` instance.
	    // If an array is passed then it calls back to `createAll()`.
	    // Otherwise, it creates a single instance and returns it.
	    create: function create(element, options) {
	      var options = options || {};

	      if (element.length) {
	        return this.createAll(options, element);
	      } else {
	        return this.newInstance(element, options);
	      }
	    },
	    // `createAll()`
	    // Creates multiple `audiojs` instances.
	    // If `elements` is `null`, then automatically find any `<audio>` tags on the page and create `audiojs` instances for them.
	    createAll: function createAll(options, elements) {
	      var audioElements = elements || document.getElementsByTagName('audio'),
	          instances = [];
	      options = options || {};

	      for (var i = 0, ii = audioElements.length; i < ii; i++) {
	        if ((" " + audioElements[i].parentNode.className + " ").replace(/[\n\t]/g, " ").indexOf(" audiojs ") > -1) continue;
	        instances.push(this.newInstance(audioElements[i], options));
	      }

	      return instances;
	    },
	    // ### Creating and returning a new instance
	    // This goes through all the steps required to build out a usable `audiojs` instance.
	    newInstance: function newInstance(element, options) {
	      var element = element,
	          s = this.helpers.clone(this.settings),
	          id = 'audiojs' + this.instanceCount,
	          wrapperId = 'audiojs_wrapper' + this.instanceCount,
	          instanceCount = this.instanceCount++; // Check for `autoplay`, `loop` and `preload` attributes and write them into the settings.

	      if (element.getAttribute('autoplay') != null) s.autoplay = true;
	      if (element.getAttribute('loop') != null) s.loop = true;
	      if (element.getAttribute('preload') == 'none') s.preload = false; // Merge the default settings with the user-defined `options`.

	      if (options) this.helpers.merge(s, options); // Inject the player html if required.

	      if (s.createPlayer.markup) element = this.createPlayer(element, s.createPlayer, wrapperId);else element.parentNode.setAttribute('id', wrapperId); // Return a new `audiojs` instance.

	      var audio = new container[audiojsInstance](element, s); // If css has been passed in, dynamically inject it into the `<head>`.

	      if (s.css) this.helpers.injectCss(audio, s.css); // If `<audio>` or mp3 playback isn't supported, insert the swf & attach the required events for it.

	      if (s.useFlash && s.hasFlash) {
	        this.injectFlash(audio, id);
	        this.attachFlashEvents(audio.wrapper, audio);
	      } else if (s.useFlash && !s.hasFlash) {
	        s.flashError.apply(audio);
	      } // Attach event callbacks to the new audiojs instance.


	      if (!s.useFlash || s.useFlash && s.hasFlash) this.attachEvents(audio.wrapper, audio); // Store the newly-created `audiojs` instance.

	      this.instances[id] = audio;
	      return audio;
	    },
	    // ### Helper methods for constructing a working player
	    // Inject a wrapping div and the markup for the html player.
	    createPlayer: function createPlayer(element, player, id) {
	      var wrapper = document.createElement('div'),
	          newElement = element.cloneNode(true);
	      wrapper.setAttribute('class', 'audiojs');
	      wrapper.setAttribute('className', 'audiojs');
	      wrapper.setAttribute('id', id); // Fix IE's broken implementation of `innerHTML` & `cloneNode` for HTML5 elements.

	      if (newElement.outerHTML && !document.createElement('audio').canPlayType) {
	        newElement = this.helpers.cloneHtml5Node(element);
	        wrapper.innerHTML = player.markup;
	        wrapper.appendChild(newElement);
	        element.outerHTML = wrapper.outerHTML;
	        wrapper = document.getElementById(id);
	      } else {
	        wrapper.appendChild(newElement);
	        wrapper.innerHTML = wrapper.innerHTML + player.markup;
	        element.parentNode.replaceChild(wrapper, element);
	      }

	      return wrapper.getElementsByTagName('audio')[0];
	    },
	    // Attaches useful event callbacks to an `audiojs` instance.
	    attachEvents: function attachEvents(wrapper, audio) {
	      if (!audio.settings.createPlayer) return;

	      var player = audio.settings.createPlayer,
	          playPause = getByClass(player.playPauseClass, wrapper),
	          scrubber = getByClass(player.scrubberClass, wrapper),
	          leftPos = function leftPos(elem) {
	        var curleft = 0;

	        if (elem.offsetParent) {
	          do {
	            curleft += elem.offsetLeft;
	          } while (elem = elem.offsetParent);
	        }

	        return curleft;
	      };

	      container[audiojs].events.addListener(playPause, 'click', function (e) {
	        audio.playPause.apply(audio);
	      });
	      container[audiojs].events.addListener(scrubber, 'click', function (e) {
	        var relativeLeft = e.clientX - leftPos(this);
	        audio.skipTo(relativeLeft / scrubber.offsetWidth);
	      }); // _If flash is being used, then the following handlers don't need to be registered._

	      if (audio.settings.useFlash) return; // Start tracking the load progress of the track.

	      container[audiojs].events.trackLoadProgress(audio);
	      container[audiojs].events.addListener(audio.element, 'timeupdate', function (e) {
	        audio.updatePlayhead.apply(audio);
	      });
	      container[audiojs].events.addListener(audio.element, 'ended', function (e) {
	        audio.trackEnded.apply(audio);
	      });
	      container[audiojs].events.addListener(audio.source, 'error', function (e) {
	        // on error, cancel any load timers that are running.
	        clearInterval(audio.readyTimer);
	        clearInterval(audio.loadTimer);
	        audio.settings.loadError.apply(audio);
	      });
	    },
	    // Flash requires a slightly different API to the `<audio>` element, so this method is used to overwrite the standard event handlers.
	    attachFlashEvents: function attachFlashEvents(element, audio) {
	      audio['swfReady'] = false;

	      audio['load'] = function (mp3) {
	        // If the swf isn't ready yet then just set `audio.mp3`. `init()` will load it in once the swf is ready.
	        audio.mp3 = mp3;
	        if (audio.swfReady) audio.element.load(mp3);
	      };

	      audio['loadProgress'] = function (percent, duration) {
	        audio.loadedPercent = percent;
	        audio.duration = duration;
	        audio.settings.loadStarted.apply(audio);
	        audio.settings.loadProgress.apply(audio, [percent]);
	      };

	      audio['skipTo'] = function (percent) {
	        if (percent > audio.loadedPercent) return;
	        audio.updatePlayhead.call(audio, [percent]);
	        audio.element.skipTo(percent);
	      };

	      audio['updatePlayhead'] = function (percent) {
	        audio.settings.updatePlayhead.apply(audio, [percent]);
	      };

	      audio['play'] = function () {
	        // If the audio hasn't started preloading, then start it now.
	        // Then set `preload` to `true`, so that any tracks loaded in subsequently are loaded straight away.
	        if (!audio.settings.preload) {
	          audio.settings.preload = true;
	          audio.element.init(audio.mp3);
	        }

	        audio.playing = true; // IE doesn't allow a method named `play()` to be exposed through `ExternalInterface`, so lets go with `pplay()`.
	        // <http://dev.nuclearrooster.com/2008/07/27/externalinterfaceaddcallback-can-cause-ie-js-errors-with-certain-keyworkds/>

	        audio.element.pplay();
	        audio.settings.play.apply(audio);
	      };

	      audio['pause'] = function () {
	        audio.playing = false; // Use `ppause()` for consistency with `pplay()`, even though it isn't really required.

	        audio.element.ppause();
	        audio.settings.pause.apply(audio);
	      };

	      audio['setVolume'] = function (v) {
	        audio.element.setVolume(v);
	      };

	      audio['loadStarted'] = function () {
	        // Load the mp3 specified by the audio element into the swf.
	        audio.swfReady = true;
	        if (audio.settings.preload) audio.element.init(audio.mp3);
	        if (audio.settings.autoplay) audio.play.apply(audio);
	      };
	    },
	    // ### Injecting an swf from a string
	    // Build up the swf source by replacing the `$keys` and then inject the markup into the page.
	    injectFlash: function injectFlash(audio, id) {
	      var flashSource = this.flashSource.replace(/\$1/g, id);
	      flashSource = flashSource.replace(/\$2/g, audio.settings.swfLocation); // `(+new Date)` ensures the swf is not pulled out of cache. The fixes an issue with Firefox running multiple players on the same page.

	      flashSource = flashSource.replace(/\$3/g, +new Date() + Math.random()); // Inject the player markup using a more verbose `innerHTML` insertion technique that works with IE.

	      var html = audio.wrapper.innerHTML,
	          div = document.createElement('div');
	      div.innerHTML = flashSource + html;
	      audio.wrapper.innerHTML = div.innerHTML;
	      audio.element = this.helpers.getSwf(id);
	    },
	    // ## Helper functions
	    helpers: {
	      // **Merge two objects, with `obj2` overwriting `obj1`**
	      // The merge is shallow, but that's all that is required for our purposes.
	      merge: function merge(obj1, obj2) {
	        // mgchange: get at the keys of obj2 with Object.keys instead of a for-in
	        Object.keys(obj2).forEach(function (attr) {
	          if (obj1.hasOwnProperty(attr) || obj2.hasOwnProperty(attr)) {
	            obj1[attr] = obj2[attr];
	          }
	        });
	      },
	      // **Clone a javascript object (recursively)**
	      clone: function clone(obj) {
	        if (obj == null || _typeof(obj) !== 'object') return obj;
	        var temp = new obj.constructor(); // mgchange: use a direct refeence to helpers.clone instead of
	        // arguments.callee

	        for (var key in obj) {
	          temp[key] = container[audiojs].helpers.clone(obj[key]);
	        }

	        return temp;
	      },
	      // **Adding/removing classnames from elements**
	      addClass: function addClass(element, className) {
	        var re = new RegExp('(\\s|^)' + className + '(\\s|$)');
	        if (re.test(element.className)) return;
	        element.className += ' ' + className;
	      },
	      removeClass: function removeClass(element, className) {
	        var re = new RegExp('(\\s|^)' + className + '(\\s|$)');
	        element.className = element.className.replace(re, ' ');
	      },
	      // **Dynamic CSS injection**
	      // Takes a string of css, inserts it into a `<style>`, then injects it in at the very top of the `<head>`. This ensures any user-defined styles will take precedence.
	      injectCss: function injectCss(audio, string) {
	        // If an `audiojs` `<style>` tag already exists, then append to it rather than creating a whole new `<style>`.
	        var prepend = '',
	            styles = document.getElementsByTagName('style'),
	            css = string.replace(/\$1/g, audio.settings.imageLocation);
	        css = css.replace(/\$2/g, audio.settings.retinaImageLocation);

	        for (var i = 0, ii = styles.length; i < ii; i++) {
	          var title = styles[i].getAttribute('title');

	          if (title && ~title.indexOf('audiojs')) {
	            style = styles[i];
	            if (style.innerHTML === css) return;
	            prepend = style.innerHTML;
	            break;
	          }
	        }

	        ;
	        var head = document.getElementsByTagName('head')[0],
	            firstchild = head.firstChild,
	            style = document.createElement('style');
	        if (!head) return;
	        style.setAttribute('type', 'text/css');
	        style.setAttribute('title', 'audiojs');
	        if (style.styleSheet) style.styleSheet.cssText = prepend + css;else style.appendChild(document.createTextNode(prepend + css));
	        if (firstchild) head.insertBefore(style, firstchild);else head.appendChild(style);
	      },
	      // **Handle all the IE6+7 requirements for cloning `<audio>` nodes**
	      // Create a html5-safe document fragment by injecting an `<audio>` element into the document fragment.
	      cloneHtml5Node: function cloneHtml5Node(audioTag) {
	        var fragment = document.createDocumentFragment(),
	            doc = fragment.createElement ? fragment : document;
	        doc.createElement('audio');
	        var div = doc.createElement('div');
	        fragment.appendChild(div);
	        div.innerHTML = audioTag.outerHTML;
	        return div.firstChild;
	      },
	      // **Cross-browser `<object>` / `<embed>` element selection**
	      getSwf: function getSwf(name) {
	        var swf = document[name] || window[name];
	        return swf.length > 1 ? swf[swf.length - 1] : swf;
	      }
	    },
	    // ## Event-handling
	    events: {
	      memoryLeaking: false,
	      listeners: [],
	      // **A simple cross-browser event handler abstraction**
	      addListener: function addListener(element, eventName, func) {
	        // For modern browsers use the standard DOM-compliant `addEventListener`.
	        if (element.addEventListener) {
	          element.addEventListener(eventName, func, false); // For older versions of Internet Explorer, use `attachEvent`.
	          // Also provide a fix for scoping `this` to the calling element and register each listener so the containing elements can be purged on page unload.
	        } else if (element.attachEvent) {
	          this.listeners.push(element);

	          if (!this.memoryLeaking) {
	            window.attachEvent('onunload', function () {
	              if (this.listeners) {
	                for (var i = 0, ii = this.listeners.length; i < ii; i++) {
	                  container[audiojs].events.purge(this.listeners[i]);
	                }
	              }
	            });
	            this.memoryLeaking = true;
	          }

	          element.attachEvent('on' + eventName, function () {
	            func.call(element, window.event);
	          });
	        }
	      },
	      trackLoadProgress: function trackLoadProgress(audio) {
	        // If `preload` has been set to `none`, then we don't want to start loading the track yet.
	        if (!audio.settings.preload) return;
	        var readyTimer,
	            loadTimer,
	            audio = audio,
	            ios = /(ipod|iphone|ipad)/i.test(navigator.userAgent); // Use timers here rather than the official `progress` event, as Chrome has issues calling `progress` when loading mp3 files from cache.

	        readyTimer = setInterval(function () {
	          if (audio.element.readyState > -1) {
	            // iOS doesn't start preloading the mp3 until the user interacts manually, so this stops the loader being displayed prematurely.
	            if (!ios) audio.init.apply(audio);
	          }

	          if (audio.element.readyState > 1) {
	            if (audio.settings.autoplay) audio.play.apply(audio);
	            clearInterval(readyTimer); // Once we have data, start tracking the load progress.

	            loadTimer = setInterval(function () {
	              audio.loadProgress.apply(audio);
	              if (audio.loadedPercent >= 1) clearInterval(loadTimer);
	            }, 200);
	          }
	        }, 200);
	        audio.readyTimer = readyTimer;
	        audio.loadTimer = loadTimer;
	      },
	      // **Douglas Crockford's IE6 memory leak fix**
	      // <http://javascript.crockford.com/memory/leak.html>
	      // This is used to release the memory leak created by the circular references created when fixing `this` scoping for IE. It is called on page unload.
	      purge: function (_purge) {
	        function purge(_x) {
	          return _purge.apply(this, arguments);
	        }

	        purge.toString = function () {
	          return _purge.toString();
	        };

	        return purge;
	      }(function (d) {
	        var a = d.attributes,
	            i;

	        if (a) {
	          for (i = 0; i < a.length; i += 1) {
	            if (typeof d[a[i].name] === 'function') d[a[i].name] = null;
	          }
	        }

	        a = d.childNodes;

	        if (a) {
	          for (i = 0; i < a.length; i += 1) {
	            purge(d.childNodes[i]);
	          }
	        }
	      }),
	      // **DOMready function**
	      // As seen here: <https://github.com/dperini/ContentLoaded/>.
	      ready: function () {
	        return function (fn) {
	          var win = window,
	              done = false,
	              top = true,
	              doc = win.document,
	              root = doc.documentElement,
	              add = doc.addEventListener ? 'addEventListener' : 'attachEvent',
	              rem = doc.addEventListener ? 'removeEventListener' : 'detachEvent',
	              pre = doc.addEventListener ? '' : 'on',
	              init = function init(e) {
	            if (e.type == 'readystatechange' && doc.readyState != 'complete') return;
	            (e.type == 'load' ? win : doc)[rem](pre + e.type, init, false);
	            if (!done && (done = true)) fn.call(win, e.type || e);
	          },
	              poll = function poll() {
	            try {
	              root.doScroll('left');
	            } catch (e) {
	              setTimeout(poll, 50);
	              return;
	            }

	            init('poll');
	          };

	          if (doc.readyState == 'complete') fn.call(win, 'lazy');else {
	            if (doc.createEventObject && root.doScroll) {
	              try {
	                top = !win.frameElement;
	              } catch (e) {}

	              if (top) poll();
	            }

	            doc[add](pre + 'DOMContentLoaded', init, false);
	            doc[add](pre + 'readystatechange', init, false);
	            win[add](pre + 'load', init, false);
	          }
	        };
	      }()
	    }
	  }; // ## The audiojs class
	  // We create one of these per `<audio>` and then push them into `audiojs['instances']`.

	  container[audiojsInstance] = function (element, settings) {
	    // Each audio instance returns an object which contains an API back into the `<audio>` element.
	    this.element = element;
	    this.wrapper = element.parentNode;
	    this.source = element.getElementsByTagName('source')[0] || element; // First check the `<audio>` element directly for a src and if one is not found, look for a `<source>` element.

	    this.mp3 = function (element) {
	      var source = element.getElementsByTagName('source')[0];
	      return element.getAttribute('src') || (source ? source.getAttribute('src') : null);
	    }(element);

	    this.settings = settings;
	    this.loadStartedCalled = false;
	    this.loadedPercent = 0;
	    this.duration = 1;
	    this.playing = false;
	  };

	  container[audiojsInstance].prototype = {
	    // API access events:
	    // Each of these do what they need do and then call the matching methods defined in the settings object.
	    updatePlayhead: function updatePlayhead() {
	      var percent = this.element.currentTime / this.duration;
	      this.settings.updatePlayhead.apply(this, [percent]);
	    },
	    skipTo: function skipTo(percent) {
	      if (percent > this.loadedPercent) return;
	      this.element.currentTime = this.duration * percent;
	      this.updatePlayhead();
	    },
	    load: function load(mp3) {
	      this.loadStartedCalled = false;
	      this.source.setAttribute('src', mp3); // The now outdated `load()` method is required for Safari 4

	      this.element.load();
	      this.mp3 = mp3;
	      container[audiojs].events.trackLoadProgress(this);
	    },
	    loadError: function loadError() {
	      this.settings.loadError.apply(this);
	    },
	    init: function init() {
	      this.settings.init.apply(this);
	    },
	    loadStarted: function loadStarted() {
	      // Wait until `element.duration` exists before setting up the audio player.
	      if (!this.element.duration) return false;
	      this.duration = this.element.duration;
	      this.updatePlayhead();
	      this.settings.loadStarted.apply(this);
	    },
	    loadProgress: function loadProgress() {
	      if (this.element.buffered != null && this.element.buffered.length) {
	        // Ensure `loadStarted()` is only called once.
	        if (!this.loadStartedCalled) {
	          this.loadStartedCalled = this.loadStarted();
	        }

	        var durationLoaded = this.element.buffered.end(this.element.buffered.length - 1);
	        this.loadedPercent = durationLoaded / this.duration;
	        this.settings.loadProgress.apply(this, [this.loadedPercent]);
	      }
	    },
	    playPause: function playPause() {
	      if (this.playing) this.pause();else this.play();
	    },
	    play: function play() {
	      var ios = /(ipod|iphone|ipad)/i.test(navigator.userAgent); // On iOS this interaction will trigger loading the mp3, so run `init()`.

	      if (ios && this.element.readyState == 0) this.init.apply(this); // If the audio hasn't started preloading, then start it now.
	      // Then set `preload` to `true`, so that any tracks loaded in subsequently are loaded straight away.

	      if (!this.settings.preload) {
	        this.settings.preload = true;
	        this.element.setAttribute('preload', 'auto');
	        container[audiojs].events.trackLoadProgress(this);
	      }

	      this.playing = true;
	      this.element.play();
	      this.settings.play.apply(this);
	    },
	    pause: function pause() {
	      this.playing = false;
	      this.element.pause();
	      this.settings.pause.apply(this);
	    },
	    setVolume: function setVolume(v) {
	      this.element.volume = v;
	    },
	    trackEnded: function trackEnded(e) {
	      this.skipTo.apply(this, [0]);
	      if (!this.settings.loop) this.pause.apply(this);
	      this.settings.trackEnded.apply(this);
	    }
	  }; // **getElementsByClassName**
	  // Having to rely on `getElementsByTagName` is pretty inflexible internally, so a modified version of Dustin Diaz's `getElementsByClassName` has been included.
	  // This version cleans things up and prefers the native DOM method if it's available.

	  var getByClass = function getByClass(searchClass, node) {
	    var matches = [];
	    node = node || document;

	    if (node.getElementsByClassName) {
	      matches = node.getElementsByClassName(searchClass);
	    } else {
	      var i,
	          l,
	          els = node.getElementsByTagName("*"),
	          pattern = new RegExp("(^|\\s)" + searchClass + "(\\s|$)");

	      for (i = 0, l = els.length; i < l; i++) {
	        if (pattern.test(els[i].className)) {
	          matches.push(els[i]);
	        }
	      }
	    }

	    return matches.length > 1 ? matches : matches[0];
	  };
	}; // mgchange ^ don't make this a self-executing function; we'll do that upon import

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = void 0;

	var _fitvids = _interopRequireDefault(__webpack_require__(9));

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	/* global document */
	var Video = {
	  projectVideoClasses: ".page-project-media-video",
	  projectVideoButtons: ".page-project-media-video-icon-wrapper",
	  projectPlayingClass: "is-playing",
	  init: function init() {
	    (0, _fitvids["default"])();
	    this.projectSelectors = "".concat(this.projectVideoClasses, ", ").concat(this.projectVideoButtons);
	    this.projectVideo();
	  },
	  projectVideo: function projectVideo() {
	    if (document.documentElement.classList.contains("touchevents")) {
	      this.videoMobile();
	    } else {
	      this.videoDesktop();
	    }
	  },
	  getVideoEls: function getVideoEls(el) {
	    var wrapper = el.closest(".page-project-media-video-wrapper");
	    var video = wrapper.querySelector("video");
	    return {
	      wrapper: wrapper,
	      video: video
	    };
	  },
	  _onMobileInteraction: function _onMobileInteraction(e) {
	    var _this$getVideoEls = this.getVideoEls(e.currentTarget),
	        video = _this$getVideoEls.video,
	        wrapper = _this$getVideoEls.wrapper;

	    if (video.paused) {
	      video.play();
	      wrapper.classList.add(this.projectPlayingClass);
	    } else {
	      video.pause();
	      wrapper.classList.remove(this.projectPlayingClass);
	    }
	  },
	  videoMobile: function videoMobile() {
	    var _this = this;

	    document.body.querySelectorAll(this.projectSelectors).forEach(function (selector) {
	      selector.addEventListener("click", _this._onMobileInteraction.bind(_this));
	      selector.addEventListener("tap", _this._onMobileInteraction.bind(_this));
	    });
	  },
	  videoDesktop: function videoDesktop() {
	    var _this2 = this;

	    document.body.querySelectorAll(this.projectSelectors).forEach(function (selector) {
	      selector.addEventListener("mouseover", function (e) {
	        var els = _this2.getVideoEls(e.currentTarget);

	        els.video.play();
	        els.wrapper.classList.add(_this2.projectPlayingClass);
	      });
	      selector.addEventListener("mouseout", function (e) {
	        var els = _this2.getVideoEls(e.currentTarget);

	        els.video.pause();
	        els.wrapper.classList.remove(_this2.projectPlayingClass);
	      });
	    });
	  }
	};
	var _default = Video;
	exports["default"] = _default;

/***/ },
/* 9 */
/***/ function(module, exports) {

	
	'use strict'

	var selectors = [
		'iframe[src*="player.vimeo.com"]',
		'iframe[src*="youtube.com"]',
		'iframe[src*="youtube-nocookie.com"]',
		'iframe[src*="kickstarter.com"][src*="video.html"]',
		'object'
	]

	var css = '.fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}'

	module.exports = function (selector, opts) {
		opts = opts || {}
		selector = selector || 'body'

		if (isObject(selector)) {
			opts = selector
			selector = 'body'
		}

		var containers = queryAll(selector)
		if (containers.length < 1) return

		if (!document.getElementById('fit-vids-style')) {
			var head = document.head || document.getElementsByTagName('head')[0]
			head.appendChild(styles())
		}

		var customSelector = toSelector(opts.players)
		var videoSelector = toSelector(selectors)

		if (customSelector.length) {
			videoSelector = videoSelector + ',' + customSelector
		}

		for (var i = 0, l = containers.length; i < l; i++) {
			var container = containers[i]
			var videos = queryAll(container, videoSelector)
			for (var j = 0, ll = videos.length; j < ll; j++) {
				wrap(videos[j])
			}
		}
	}

	function queryAll (el, selector) {
		if (typeof el === 'string') {
			selector = el
			el = document
		}
		return Array.prototype.slice.call(el.querySelectorAll(selector))
	}

	function wrap (el) {
		if (/fluid-width-video-wrapper/.test(el.parentNode.className)) return

		var widthAttr = parseInt(el.getAttribute('width'), 10)
		var heightAttr = parseInt(el.getAttribute('height'), 10)

		var width = !isNaN(widthAttr) ? widthAttr : el.clientWidth
		var height = !isNaN(heightAttr) ? heightAttr : el.clientHeight
		var aspect = height / width

		el.removeAttribute('width')
		el.removeAttribute('height')

		var wrapper = document.createElement('div')
		el.parentNode.insertBefore(wrapper, el)
		wrapper.className = 'fluid-width-video-wrapper'
		wrapper.style.paddingTop = (aspect * 100) + '%'
		wrapper.appendChild(el)
	}

	function toSelector (input) {
		if (typeof input === 'undefined') return ''
		return Array.isArray(input) ? input.join() : input
	}

	function styles () {
		var div = document.createElement('div')
		div.innerHTML = '<p>x</p><style id="fit-vids-style">' + css + '</style>'
		return div.childNodes[1]
	}

	function isObject (input) {
		return Object.prototype.toString.call(input) === '[object Object]'
	}


/***/ }
/******/ ]);