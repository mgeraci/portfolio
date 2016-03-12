menu = require("./menu.coffee")
lazyImages = require("./lazy_images.coffee")
audio = require("./audio.coffee")
video = require("./video.coffee")

# initialize at page bottom
menu.init()
lazyImages.search()
audio.init()
video.init()
