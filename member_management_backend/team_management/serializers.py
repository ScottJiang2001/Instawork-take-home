from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from .models import Member

class MemberSerializer(serializers.ModelSerializer):
    user_email = serializers.EmailField(max_length=80, validators=[UniqueValidator(queryset=Member.objects.all(), message="This email is already being used")])
    user_phone = serializers.CharField(max_length=30,validators=[UniqueValidator(queryset=Member.objects.all(), message="This phone number is already being used")])

    class Meta:
        model = Member
        fields = '__all__'


        