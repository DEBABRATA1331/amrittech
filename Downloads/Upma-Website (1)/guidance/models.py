from django.db import models

class ExamCategory(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    slug = models.SlugField(unique=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Exam Categories"

class Counselor(models.Model):
    exam = models.ForeignKey(ExamCategory, on_delete=models.CASCADE, related_name='counselors')
    name = models.CharField(max_length=100)
    achievement = models.CharField(max_length=200, help_text="e.g. NEET AIR 50, IIT Bombay CSE")
    bio = models.TextField()
    photo = models.ImageField(upload_to='counselors/', blank=True, null=True)
    is_active = models.BooleanField(default=True)
    whatsapp_link = models.URLField(blank=True, help_text="Link to WhatsApp or booking form")

    def __str__(self):
        return f"{self.name} - {self.achievement}"
