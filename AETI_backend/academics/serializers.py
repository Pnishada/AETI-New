from rest_framework import serializers
from .models import AcademicItem

class AcademicItemSerializer(serializers.ModelSerializer):
    file_url = serializers.SerializerMethodField()

    def get_file_url(self, obj):
        if obj.file:
            return self.context['request'].build_absolute_uri(obj.file.url)
        return None

    class Meta:
        model = AcademicItem
        fields = '__all__'
