from django.http import Http404
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import MemberSerializer
from .models import Member
from rest_framework import generics

class MemberList(generics.ListCreateAPIView):

    def get(self, request):
        sort_param = self.request.query_params.get('sort_param')
        try:
            members = Member.objects.order_by(sort_param)
        except:
            members = Member.objects.all()
        serializer = MemberSerializer(members, many=True)
        return Response(serializer.data)

    serializer_class = MemberSerializer

class MemberDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Member.objects.all()
    serializer_class = MemberSerializer