## Basic ecommerce site using Django Rest Framework, React (Hooks), Redux, Axios, Material UI, integrated with Stripe Checkout

https://demo.kanindev.se/

Stripe integration is testable, add an item to the cart and go to checkout, fill in order information and pay as guest, you can pay with card number 4242 4242 4242 4242.


/ecom/backend/core/ViewSets.py

Content of the site consists of a SiteViewSet, serializing the data in the SiteSerializer.

```Python
class SiteViewSet(viewsets.ReadOnlyModelViewSet):

    queryset = Site.objects.all()
    serializer_class = SiteSerializer
    permission_classes = [AllowAny,]

    def get_queryset(self):
        return Site.objects.all()
```


/ecom/backend/core/Serializers.py

```Python
class ProductSerializer(serializers.ModelSerializer):
    related = RelatedSerializer(many=True, read_only=True)
    # ...

class CategorySerializer(serializers.ModelSerializer):
    products = ProductSerializer(many=True, read_only=True)
    # ...

class SiteSerializer(serializers.ModelSerializer):
    categories = CategorySerializer(many=True, read_only=True)
    # ...
```


/ecom/backend/core/models.py

```Python
class Site(models.Model):
    user = models.ForeignKey(User, on_delete=CASCADE, related_name='siteuser')
    # ...

class Category(models.Model):
    site = models.ForeignKey(Site, on_delete=CASCADE, related_name='categories')
    # ...

class Product(models.Model):
    category = models.ForeignKey(Category, on_delete=CASCADE, related_name='products', verbose_name='Kategori')
    # ...

class Order(models.Model):
    site = models.ForeignKey(Site, on_delete=CASCADE, related_name='orders')
    # ...

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=CASCADE, related_name='orderitem')
    # ...
```



/ecom/frontend/src/services/content.js

Fetching content of the site.

```JavaScript
const initContent = async (id) => {
    const response = await axios.get(`${baseURL}/content/${id}/`)
    return response.data
}
```

/ecom/frontend/src/reducers/contentReducer.js

Putting that content in the Redux store.

```JavaScript
export const initContent = () => {
    return async dispatch => {
      const content = await contentService.initContent(1)
      dispatch({
        type: 'INIT_CONT',
        data: content,
      })
    }
}

const contentReducer = (state=[], action) => {
    switch(action.type) {
        case 'INIT_CONT':
          return action.data
        default:
          return state
      }
}
```


Initiating the Stripe payment checkout session and then routing the customer to the Stripe Checkout.

/ecom/backend/core/views.py

```Python
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
    # ...

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
        
    # ...
    order.save()

    return Response(status=status.HTTP_200_OK, data=session)
```


If payment is completed customer is routed to the get-success-session page, where we make a new call to the Stripe api verifying that payment has gone through and setting the order as paid.

/ecom/backend/core/views.py

```Python
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
```
