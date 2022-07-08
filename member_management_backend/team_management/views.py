from django.http import Http404
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import MemberSerializer
from .models import Member


class MemberList(APIView):

    def get(self, request):
        members = Member.objects.all()
        serializer = MemberSerializer(members, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = MemberSerializer(data=request.data)
        print(request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class MemberDetail(APIView):

    def get_member(self, pk):
        try:
            return Member.objects.get(pk=pk)
        except:
            raise Http404

    def put(self, request, pk, format=None):
        member = self.get_member(pk)
        serializer = MemberSerializer(member, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        member = self.get_member(pk)
        member.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
