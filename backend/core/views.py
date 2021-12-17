from django.shortcuts import redirect, render
from django.template.loader import render_to_string , get_template
from django.core.mail import EmailMessage
from django import utils
from django.core.files.base import ContentFile, File
import os
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from stripe.api_resources import payment_method
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework import status
from .models import OrderItem, Product, Site, Order, User
from .serializers import OrderSerializer
import csv
from django.conf import settings
from django.http import HttpResponse, response, FileResponse

import stripe




@api_view(['POST'])
@permission_classes([AllowAny,])
def create_checkout_session(request):
    site = Site.objects.get(id=request.data['siteid'])
    stripe.api_key = site.stripekey

    cartitems = []

    order = Order.objects.create(site=site)
    
    data = request.data['cart']
    for item in data:
        cartitems.append({'price_data': {
            'currency': 'sek',
            'product_data': {
                'name': item['prodName'] + ' (' + item['prodVal'] + ')',
                'images': [item['prodImg']],
                'description': item['prodDescription'],
            },
            'unit_amount': (item['prodPrice'] * 100),
        },
        'quantity': item['quantity'],
        })
        OrderItem.objects.create(prodName=item['prodName'],
        prodPrice=item['prodPrice'],
        prodQty=item['quantity'],
        prodImg=item['prodImg'],
        prodid=item['id'],
        prodImgList=item['prodImgList'],
        prodcat=item['category'],
        prodVal=item['prodVal'],
        prodValnamn=item['prodValnamn'],
        artno=item['artno'],
        site=site,
        order=order,
        )

    session = stripe.checkout.Session.create(
        payment_method_types=['card'],
        line_items=cartitems,
        mode='payment',
        success_url=site.url + '/success?session_id={CHECKOUT_SESSION_ID}',
        cancel_url=site.url + '/cancel',
    )

    if request.user.id != None:
        order.customeruser=request.user
        order.customeremail=request.user.email
        
    order.cuname=request.data['firstname'] + ' ' + request.data['lastname']
    order.custreet=request.data['adress']
    order.cuzip=request.data['zipcode']
    order.cuarea=request.data['area']
    order.cuphone=request.data['phone']
    order.sessionid=session['id']
    order.save()



    return Response(status=status.HTTP_200_OK, data=session)


@api_view(['POST'])
@permission_classes([AllowAny,])
def order_success(request):
    site = Site.objects.get(id=request.data['siteid'])
    stripe.api_key = site.stripekey
    session = stripe.checkout.Session.retrieve(request.data['sessionid'])
    order = Order.objects.get(sessionid=request.data['sessionid'])
    if order.customeremail == None:
        order.customeremail=session.customer_details['email']
    order.is_paid=True
    order.save()

    serializers = OrderSerializer(order)

    data = [{
        'session': session,
        'order': serializers.data,
    }]

    html_message = get_template('ordermessage.html').render({'order': order, 'site': site})
    email = EmailMessage('Orderbekräftelse # ' + str(order.id), html_message, from_email=site.siteemail, to=[order.customeremail])
    email.content_subtype = "html"
    email.send()

    return Response(status=status.HTTP_200_OK, data=data)


@api_view(['POST'])
@permission_classes([AllowAny,])
def password_reset(request):
    user = User.objects.get(email=request.data['email'])
    site = Site.objects.get(id=request.data['siteid'])
    if user:
        base64_encoded_id = utils.http.urlsafe_base64_encode(utils.encoding.force_bytes(user.id))
        token = PasswordResetTokenGenerator().make_token(user)
        html_message = get_template('psreset.html').render({'uidb64': base64_encoded_id, 'token': token, 'site': site})
        email = EmailMessage('Återställ lösenord', html_message, from_email=site.siteemail, to=[user.email])
        email.content_subtype = "html"
        email.send()
    
    
    
    return Response(status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([AllowAny,])
def password_reset_confirm(request):
    base64_decoded_id = utils.http.urlsafe_base64_decode(request.data['uidb64'])
    user = User.objects.get(id=base64_decoded_id)
    
    if PasswordResetTokenGenerator().check_token(user, request.data['token']) == True:
        user.set_password(request.data['password'])
        user.save()

        return Response(status=status.HTTP_200_OK)
    else:
        #reset-code not valid (unauthorized)
        return Response(status=status.HTTP_401_UNAUTHORIZED)


@api_view(['POST'])
@permission_classes([AllowAny, ])
def generate_price_index(request):
    site = Site.objects.get(id=request.data['siteid'])
    prods = Product.objects.filter(user=site.user)


    

    path = os.path.join(settings.MEDIA_ROOT, str(site) + '.csv')
    #f = open(path, "w+b")
    #f.truncate()
    with open(path, 'w') as f:
        f.truncate()

        writer = csv.writer(f)
        writer.writerow(['First row', 'Foo', 'Bar', 'Baz'])
        writer.writerow(['Second row', 'A', 'B', 'C', '"Testing"', "Here's a quote"])


    if not site.file:
        site.file=path
        site.save()
    

    #response = HttpResponse(file, content_type='text/csv')
    #response['Content-Disposition'] = 'attachment; filename=file.csv'

    #response = HttpResponse(
    #    content_type='text/txt',
    #    headers={'Content-Disposition': 'attachment; filename="somefilename.txt"'},
    #)
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="export.csv"'

    return response