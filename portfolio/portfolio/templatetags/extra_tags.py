from django import template
from django.urls import reverse

register = template.Library()

@register.filter
def active_menu_item(x, y):
    try:
        if y == reverse('index_url'):
            return x == reverse('index_url')
        else:
            return str(x).index(str(y)) > -1

    except Exception:
        return False
