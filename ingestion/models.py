from django.db import models

class Source(models.Model):

    SOURCE_CHOICES = (
        ('SAP', 'SAP'),
        ('UTILITY', 'UTILITY'),
        ('TRAVEL', 'TRAVEL'),
    )

    name = models.CharField(
        max_length=100,
        choices=SOURCE_CHOICES
    )

    uploaded_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.name