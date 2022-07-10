from django.test import TestCase, Client
from rest_framework.test import APIRequestFactory
from team_management.models import Member
from django.urls import reverse
from .views import MemberList, MemberDetail


class TestAPIView(TestCase):

    def setUp(self):
        self.factory = APIRequestFactory()
        self.member_list_url = "/members/"
        self.member_detail_url = "/member/"
        self.member_list_view = MemberList.as_view()
        self.member_detail_view = MemberDetail.as_view()
        self.test_user = {
            'first_name': 'Bob',
            'last_name': 'Jones',
            'user_email': 'someemail@gmail.com',
            'user_phone': '12345',
            'user_role': 'REG'
        }
    
    def test_member_list_GET(self):
        request = self.factory.get(self.member_list_url)
        response = self.member_list_view(request)
        self.assertEquals(response.status_code, 200)

    def test_member_add_POST_good_email(self):
        request = self.factory.post(self.member_list_url, {
            'first_name': 'Bob',
            'last_name': 'Jones',
            'user_email': 'helloworld@gmail.com',
            'user_phone': '12345',
            'user_role': 'REG'
        })
        response = self.member_list_view(request)
        self.assertEquals(response.status_code, 201)
    
    def test_member_add_POST_bad_email(self):
        request = self.factory.post(self.member_list_url, {
            'first_name': 'Bob',
            'last_name': 'Jones',
            'user_email': 'helloworld@com',
            'user_phone': '12345',
            'user_role': 'REG'
        })
        response = self.member_list_view(request)
        self.assertEquals(response.status_code, 400)

    def test_member_remove_DELETE(self):
        request = self.factory.post(self.member_list_url, self.test_user)
        response = self.member_list_view(request)
        self.assertEquals(response.status_code, 201)

        test_url = '/member/'

        request = self.factory.delete(test_url)
        response = self.member_detail_view(request, pk='1')
        self.assertEquals(response.status_code, 204)
    
    def test_member_edit_PUT(self):
        request = self.factory.post(self.member_list_url, self.test_user)
        response = self.member_list_view(request)
        self.assertEquals(response.status_code, 201)

        test_detail_url = '/member/'

        request = self.factory.put(test_detail_url, {
            'first_name':'Bob',
            'last_name': 'Jones Jr.',
            'user_email': 'someemail@gmail.com',
            'user_phone': '12345',
            'user_role': 'REG'
        })

        response = self.member_detail_view(request, pk='1')
        self.assertNotEquals(response.status_code, 400)

    

    


        

    
