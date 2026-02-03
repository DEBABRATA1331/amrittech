from django.shortcuts import render
from .models import Service, ServiceInquiry
from django.core.mail import send_mail
from django.conf import settings

def index(request):
    services = Service.objects.all()
    if request.method == 'POST':
        service_id = request.POST.get('service_id')
        service = Service.objects.get(id=service_id)
        
        name = request.POST.get('name')
        email = request.POST.get('email')
        project_details = request.POST.get('project_details')

        ServiceInquiry.objects.create(
            service=service,
            name=name,
            email=email,
            project_details=project_details
        )

        # Send Email Notification
        subject = f"New Studio Inquiry from {name}"
        message = f"""
        New Inquiry Received:
        Service: {service.title}
        Name: {name}
        Email: {email}
        Details: {project_details}
        """
        send_mail(subject, message, settings.DEFAULT_FROM_EMAIL, ['upmarkcurve@gmail.com'], fail_silently=True)

        return render(request, 'studio/index.html', {'services': services, 'success': True})
    
    return render(request, 'studio/index.html', {'services': services})
