from django import forms

class IssueWithdrawForm(forms.Form):
    qty = forms.FloatField(required=True, min_value=0)

class ProposalForm(forms.Form):
    from_token = forms.CharField(required=True,max_length=45)
    to_token = forms.CharField(required=True,max_length=45)
    percentage = forms.IntegerField(required=True,min_value=1,max_value=100)