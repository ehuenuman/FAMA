from django import forms

from .models import Formative, FormativeHasQuestion

class FormativeForm(forms.ModelForm):
    """docstring for CourseForm"""
    class Meta:
        model = Formative
        fields = ('name', 'description', 'question')
        widgets = {
        	'name': forms.TextInput(attrs={'class':'validate', 'length': 50, 'data-length': 50, 'placeholder': 'Ejemplo: Conceptos básicos'}),
        	'description': forms.Textarea(attrs={'class':'materialize-textarea validate', 'length': 200, 'data-length': 200, 'placeholder': 'Ejemplo: Preguntas sobre los puntos claves de los contenidos vistos durante la semana'}),
            'question': forms.CheckboxSelectMultiple(),
        }