# michaelgeraci.com

This repository stores my personal website. It's written in Django, with a
smattering of frontend technologies.


## Installation

Assuming that you have python, virtualenv, and node/npm:
* clone the repo
* mkvirtualenv portfolio
* pip install -r requirements.txt
* create a local database
* add the file michael_dot_com/michael_dot_com/localsettings.py — see contents below
* michael_dot_com/manage.py migrate
* michael_dot_com/manage.py createsuperuser — you can use this to log in at localhost:8000/admin
* michael_dot_com/manage.py runserver


### localsettings.py

```
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
```


## Static files

CSS is written using SASS, JS is in coffeescript, and both are managed with
gulp. The coffee is compiled with webpack. Assuming you already have node and
npm installed, to install all of the packages required to compile these files,
run:

	npm install

Then to start gulp watching and compiling the files, run:

	gulp
