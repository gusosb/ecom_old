from rest_framework import serializers
from .models import NewUser
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class CustomUserSerializer(serializers.ModelSerializer):
    """
    Currently unused in preference of the below.
    """
    email = serializers.EmailField(required=True)
    #username = serializers.CharField(required=True)
    password = serializers.CharField(min_length=3, write_only=True)
    firstname = serializers.CharField()
    lastname = serializers.CharField()

    class Meta:
        model = NewUser
        fields = ('email', 'password', 'firstname', 'lastname')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        # as long as the fields are the same, we can just use this
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod

    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['email'] = user.email
        #...
        

        return token