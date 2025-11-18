from django.db import models
from departments.models import Department

class Staff(models.Model):
    POSITION_CHOICES = [
        ('Chairman', 'Chairman'),
        ('Vice Chairman', 'Vice Chairman'),
        ('Director General', 'Director General'),
        ('Assistant Director', 'Assistant Director'),
        ('Registrar', 'Registrar'),
        ('Head of Department', 'Head of Department'),
        ('Senior Lecturer', 'Senior Lecturer'),
        ('Lecturer', 'Lecturer'),
        ('Instructor', 'Instructor'),
        ('Staff', 'Staff'),
    ]

    name = models.CharField(max_length=100)
    position = models.CharField(max_length=50, choices=POSITION_CHOICES, default='Staff')
    department = models.ForeignKey(Department, on_delete=models.SET_NULL, null=True, blank=True)
    image = models.ImageField(upload_to='staff/', blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    social_links = models.JSONField(blank=True, null=True)

    def __str__(self):
        return self.name
