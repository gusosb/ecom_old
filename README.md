## Basic ecommerce site using Django Rest Framework, React (Hooks), Redux, Axios, Material UI

https://demo.kanindev.se/


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
    prodImgList = ImageField(read_only=True)
    prodImgSmall = ImageField(read_only=True)
    prodImg435 = ImageField(read_only=True)
    twoImgSmall = ImageField(read_only=True)
    threeImgSmall = ImageField(read_only=True)
    related = RelatedSerializer(many=True, read_only=True)

    class Meta:
        list_serializer_class = FilteredProductSerializer
        model = Product
        exclude = ['user', 'is_active', 'condition', 'brand']

class CategorySerializer(serializers.ModelSerializer):
    products = ProductSerializer(many=True, read_only=True)

    class Meta:
        model = Category
        exclude = ['site', 'user']

class SiteSerializer(serializers.ModelSerializer):
    categories = CategorySerializer(many=True, read_only=True)

    class Meta:
        model = Site
        exclude = ['stripekey', 'url', 'user', 'file']
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
    # ...
    order = models.ForeignKey(Order, on_delete=CASCADE, related_name='orderitem')
```



/ecom/frontend/src/services/content.js

Fetching content of the site

```JavaScript
const initContent = async (id) => {
    const response = await axios.get(`${baseURL}/content/${id}/`)
    return response.data
}
```

/ecom/frontend/src/reducers/contentReducer.js

Putting that content in the Redux store

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
