from django.db import models

# Create your models here.

class Member(models.Model):
    REGULAR = 'REG'
    ADMIN = 'ADM'

    USER_ROLES = [
        (REGULAR, 'Regular'),
        (ADMIN, 'Admin'),
    ]

    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    user_email = models.EmailField(max_length=80, unique=True)
    user_phone = models.CharField(max_length=30, unique=True)
    user_role = models.CharField(max_length=3, choices=USER_ROLES, default=REGULAR)


