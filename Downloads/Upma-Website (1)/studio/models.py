from django.db import models

class Service(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    icon = models.CharField(max_length=50, help_text="Emoji or icon class")
    price_starts_at = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)

    def __str__(self):
        return self.title

class ServiceInquiry(models.Model):
    service = models.ForeignKey(Service, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    email = models.EmailField()
    project_details = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Inquiry for {self.service.title} by {self.name}"
