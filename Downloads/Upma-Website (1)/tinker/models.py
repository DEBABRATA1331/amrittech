from django.db import models

# --- Curve Tinker Lab ---
class LabBooking(models.Model):
    institution_name = models.CharField(max_length=200)
    contact_person = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=15)
    requested_date = models.DateField()
    message = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.institution_name} - {self.requested_date}"

# --- Curve Vault (Blogs) ---
class BlogPost(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    author = models.CharField(max_length=100, default="Curve Team")
    content = models.TextField()
    image = models.ImageField(upload_to='blog/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    is_published = models.BooleanField(default=True)

    def __str__(self):
        return self.title

# --- Curve Spectrum (Magazine) ---
class ArticleSubmission(models.Model):
    title = models.CharField(max_length=200)
    author_name = models.CharField(max_length=100)
    email = models.EmailField()
    content_file = models.FileField(upload_to='submissions/')
    is_paid = models.BooleanField(default=False)
    status = models.CharField(max_length=20, choices=[('pending', 'Pending'), ('approved', 'Approved')], default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} by {self.author_name}"

# --- Curve Tool (Store) ---
class Product(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to='products/')
    stock = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name

class Order(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    customer_name = models.CharField(max_length=100)
    address = models.TextField()
    phone = models.CharField(max_length=15)
    quantity = models.IntegerField(default=1)
    status = models.CharField(max_length=20, default='New')
    razorpay_order_id = models.CharField(max_length=100, blank=True, null=True)
    razorpay_payment_id = models.CharField(max_length=100, blank=True, null=True)
    is_paid = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order #{self.id} - {self.customer_name}"
