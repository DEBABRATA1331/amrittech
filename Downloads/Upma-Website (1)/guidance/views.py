from django.shortcuts import render
from .models import ExamCategory, Counselor

def index(request):
    exams = ExamCategory.objects.all()
    counselors = Counselor.objects.filter(is_active=True).select_related('exam')
    context = {
        'exams': exams,
        'counselors': counselors,
    }
    return render(request, 'guidance/index.html', context)
