import os
import django
from django.urls import reverse, resolve
import sys
from pathlib import Path

# Setup Django environment
BASE_DIR = Path(__file__).resolve().parent.parent
sys.path.append(str(BASE_DIR))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'upmark_curve.settings')
django.setup()

from tinker.models import BlogPost, Product
from guidance.models import ExamCategory, Counselor
from studio.models import Service

def verify():
    print("Verifying Content...")
    
    # Check Blogs
    blog_count = BlogPost.objects.count()
    print(f"Blogs found: {blog_count}")
    if blog_count > 0:
        blog = BlogPost.objects.first()
        url = reverse('post_detail', args=[blog.slug])
        print(f"URL for blog '{blog.title}': {url}")
        match = resolve(url)
        print(f"Resolved URL to view: {match.func.__name__}")

    # Check Tinker Products
    product_count = Product.objects.count()
    print(f"Products found: {product_count}")

    # Check Guidance
    exam_count = ExamCategory.objects.count()
    counselor_count = Counselor.objects.count()
    print(f"Exams found: {exam_count}")
    print(f"Counselors found: {counselor_count}")

    # Check Studio
    service_count = Service.objects.count()
    print(f"Services found: {service_count}")

if __name__ == '__main__':
    verify()
