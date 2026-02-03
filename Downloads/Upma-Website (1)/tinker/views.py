from django.shortcuts import render, redirect, get_object_or_404
from .models import LabBooking, BlogPost, ArticleSubmission, Product, Order
from django.core.mail import send_mail
from django.conf import settings

def index(request):
    return render(request, 'tinker/index.html')

def lab(request):
    if request.method == 'POST':
        # Simple processing of Lab Booking
        booking = LabBooking.objects.create(
            institution_name=request.POST.get('institution_name'),
            contact_person=request.POST.get('contact_person'),
            email=request.POST.get('email'),
            phone=request.POST.get('phone'),
            requested_date=request.POST.get('requested_date'),
            message=request.POST.get('message')
        )

        # Send Email Notification
        subject = f"New Lab Booking: {booking.institution_name}"
        message = f"""
        New Lab Booking Request:
        Institution: {booking.institution_name}
        Contact: {booking.contact_person} ({booking.phone})
        Date: {booking.requested_date}
        Message: {booking.message}
        """
        send_mail(subject, message, settings.DEFAULT_FROM_EMAIL, ['upmarkcurve@gmail.com'], fail_silently=True)

        return render(request, 'tinker/lab.html', {'success': True})
    return render(request, 'tinker/lab.html')

def campus(request):
    return render(request, 'tinker/campus.html')

def vault(request):
    posts = BlogPost.objects.filter(is_published=True).order_by('-created_at')
    return render(request, 'tinker/vault.html', {'posts': posts})

def post_detail(request, slug):
    post = get_object_or_404(BlogPost, slug=slug, is_published=True)
    return render(request, 'tinker/post_detail.html', {'post': post})

def spectrum(request):
    if request.method == 'POST':
        ArticleSubmission.objects.create(
            title=request.POST.get('title'),
            author_name=request.POST.get('author_name'),
            email=request.POST.get('email'),
            content_file=request.FILES.get('content_file')
        )
        return render(request, 'tinker/spectrum.html', {'success': True})
    return render(request, 'tinker/spectrum.html')

def tool(request):
    products = Product.objects.filter(is_active=True)
    return render(request, 'tinker/tool.html', {'products': products})

import razorpay
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse

# Initialize Razorpay Client (Use Test Credentials)
# You should normally put these in settings.py or .env
RAZORPAY_KEY_ID = "rzp_test_placeholder"
RAZORPAY_KEY_SECRET = "secret_placeholder"
client = razorpay.Client(auth=(RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET))

def create_order(request):
    if request.method == "POST":
        product_id = request.POST.get('product_id')
        product = get_object_or_404(Product, id=product_id)
        
        # Create Order in DB
        order = Order.objects.create(
            product=product,
            customer_name="Guest User", # Placeholder
            address="Not Provided",
            phone="0000000000",
            quantity=1
        )
        
        # Create Order on Razorpay
        data = { "amount": int(product.price * 100), "currency": "INR", "receipt": str(order.id) }
        razorpay_order = client.order.create(data=data)
        
        order.razorpay_order_id = razorpay_order['id']
        order.save()
        
        return JsonResponse({
            "order_id": razorpay_order['id'],
            "amount": data['amount'],
            "key_id": RAZORPAY_KEY_ID,
            "product_name": product.name,
            "description": product.description,
            "db_order_id": order.id
        })

@csrf_exempt
def payment_callback(request):
    if request.method == "POST":
        try:
            # Verify Signature
            params_dict = {
                'razorpay_order_id': request.POST.get('razorpay_order_id'),
                'razorpay_payment_id': request.POST.get('razorpay_payment_id'),
                'razorpay_signature': request.POST.get('razorpay_signature')
            }
            client.utility.verify_payment_signature(params_dict)
            
            # Update Order
            order = Order.objects.get(razorpay_order_id=params_dict['razorpay_order_id'])
            order.razorpay_payment_id = params_dict['razorpay_payment_id']
            order.is_paid = True
            order.status = 'Paid'
            order.save()
            
            return render(request, 'tinker/payment_success.html', {'order': order})
        except Exception as e:
            return render(request, 'tinker/payment_failed.html', {'error': str(e)})
