from django.contrib import admin
from .models import Member

class MemberAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'user_email', 'user_phone', 'user_role')

# Register your models here.

admin.site.register(Member, MemberAdmin)
