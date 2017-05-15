from django import forms

from .models import Formative, FormativeHasQuestion

class FormativeForm(forms.ModelForm):
    """docstring for CourseForm"""
    class Meta:
        model = Formative
        fields = ('name', 'description', 'question')
        widgets = {
        	'name': forms.TextInput(attrs={'class':'validate', 'length': 50, 'data-length': 50}),
        	'description': forms.Textarea(attrs={'class':'materialize-textarea', 'length': 200, 'data-length': 200}),
            'question': forms.CheckboxSelectMultiple(),
        }