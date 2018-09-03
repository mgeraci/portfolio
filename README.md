# michaelgeraci.com

This repository stores my personal website. It's written in Django, with the
static files managed by webpack. The JS is written in ES6, the styles in Sass,
and my photoblog subpage is written in React.


## Installation

Assuming that you have python, virtualenv, and node/npm:
* clone the repo
* `mkvirtualenv portfolio`
* `pip install -r requirements.txt`
* create a local database
* add the file `portfolio/michael_dot_com/localsettings.py` — see contents below
* `./portfolio/manage.py migrate`
* `./portfolio/manage.py createsuperuser` — you can then use this to log in at localhost:8000/admin
* `./portfolio/manage.py runserver`


### localsettings.py

```
# required to be defined as False in production
DEBUG = True

STATIC_ROOT = 'staticfiles'
STATIC_URL = '/static/'
MEDIA_ROOT = 'media'
MEDIA_URL = '/media/'
SECRET_KEY = '[your secret key]'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': '[your database name]',
        'USER': '[your database user]',
        'PASSWORD': '[your database user password]'
    }
}

STATIC_VERSIONS = {
    'styles': 0,
    'app': 0,
    'photoblog': 0,
}
```


## Static files

CSS is written using SASS, JS is in es6 and a smattering of React, and both are
managed with webpack. Assuming you already have node and npm installed, to
install all of the packages required to compile these files, run:

	npm install

Then to start webpack watching and compiling the files, run:

	npm run watch

To compile the minified files for use in production, run:

	npm run build

To deploy updated css or js:
* make your changes, run `npm run build`, commit, and push
* ssh to the server and cd to the root of the project
* get into your python environment with `workon michael_portfolio`
* update the appropriate version number in `portfolio/michael_dot_com/localsettings.py`
* collect the static files with `./portfolio/manage.py collectstatic`
* restart apache with `../apache2/bin/restart`
