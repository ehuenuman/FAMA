from django import forms

from .models import Course

class CourseForm(forms.ModelForm):
    """docstring for CourseForm"""
    class Meta:
        model = Course
        fields = ('name', 'code', 'semester', 'description')
        widgets = {
            'name': forms.TextInput(attrs={'class':'validate', 'length': 50, 'data-length': 50, 'placeholder': 'Ejemplo: Matemática Aplicada'}),
            'code': forms.TextInput(attrs={'class':'validate', 'length': 20, 'data-length': 20, 'placeholder': 'Ejemplo: MAT200'}),
            'semester': forms.Select(choices=(('1', 'I Semestre',),('2', 'II Semestre',))),
            'description': forms.Textarea(attrs={'class':'materialize-textarea validate', 'length': 200, 'data-length': 200, 'placeholder': 'Tips: Puede escribir las características pedagógicas del curso actual. Sus objetivos y como conseguirlos.'}),
        }