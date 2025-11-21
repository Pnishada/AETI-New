from rest_framework import serializers

from departments.models import Department
from .models import Course


class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ['id', 'name', 'description', 'head', 'contact_email', 'contact_phone', 'image']

class CourseSerializer(serializers.ModelSerializer):
    department = DepartmentSerializer(read_only=True)  
    department_id = serializers.PrimaryKeyRelatedField(
        queryset=Department.objects.all(), source='department', write_only=True, required=False
    )

    class Meta:
        model = Course
        fields = ['id', 'title', 'type', 'description', 'duration', 'fee', 'method', 'department', 'department_id', 'image', 'created_at']
