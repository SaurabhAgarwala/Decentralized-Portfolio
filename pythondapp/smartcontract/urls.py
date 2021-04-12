from django.conf.urls import url
from . import views

app_name = 'smartcontract'

urlpatterns = [
    url(r'^issue/$', views.issue, name="issue"),
    url(r'^withdraw/$', views.withdraw, name="withdraw"),
    url(r'^propose/$', views.propose, name="propose"),
    url(r'^proposals/$', views.proposals, name="proposals"),
    url(r'^agree/(?P<id>[\w-]+)/$', views.agree, name="agree"),
    url(r'^disagree/(?P<id>[\w-]+)/$', views.disagree, name="disagree"),
    url(r'^execute/(?P<id>[\w-]+)/$', views.executeProposal, name="execute"),
]
