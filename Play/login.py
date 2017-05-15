from django.contrib.auth.models import User

from apps.teacher.models import Teacher
from apps.student.models import Student

import hashlib

class LoginBackend(object):
    """docstring for LoginBackend"""
    def authenticate(self, username=None, password=None):
        if password == None:
            print("Alumno")
        else:
            print("Profesor")
            try:
                teacher = Teacher.objects.get(email = username)
                print("Usuario existe")
                if hashlib.sha1(password.encode('utf-8')).hexdigest() == teacher.password:
                    print("Pass correcta")
                    return User.objects.get(username = teacher.email)
                else:
                    return None
            except Teacher.DoesNotExist:
                return None


    def get_user(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None
