from django.shortcuts import redirect, render
from stripe.api_resources import payment_method
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework import status
from .models import Site

import stripe




@api_view(['POST'])
@permission_classes([AllowAny,])
def create_checkout_session(request):
    site = Site.objects.get(id=request.data['siteid'])
    stripe.api_key = site.stripekey

    cartitems = []

    data = request.data['cart']
    for item in data:
        cartitems.append({'price_data': {
            'currency': 'sek',
            'product_data': {
                'name': item['prodName'],
            },
            'unit_amount': (item['prodPrice'] * 100),
        },
        'quantity': item['quantity'],
        })

    session = stripe.checkout.Session.create(
        payment_method_types=['card'],
        line_items=cartitems,
        mode='payment',
        success_url='http://127.0.0.1:3000/success?session_id={CHECKOUT_SESSION_ID}',
        cancel_url='http://127.0.0.1:3000/cancel',
    )

    return Response(status=status.HTTP_200_OK, data=session)


@api_view(['POST'])
@permission_classes([AllowAny,])
def order_success(request):
    site = Site.objects.get(id=request.data['siteid'])
    stripe.api_key = site.stripekey
    session = stripe.checkout.Session.retrieve(request.data['sessionid'])

    return Response(status=status.HTTP_200_OK, data=session)