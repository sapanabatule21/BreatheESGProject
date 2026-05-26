from django.db import models
from ingestion.models import Source

class EmissionRecord(models.Model):

    STATUS_CHOICES = (
        ('PENDING', 'PENDING'),
        ('APPROVED', 'APPROVED'),
        ('REJECTED', 'REJECTED'),
    )

    SCOPE_CHOICES = (
        ('Scope 1', 'Scope 1'),
        ('Scope 2', 'Scope 2'),
        ('Scope 3', 'Scope 3'),
    )

    source = models.ForeignKey(
        Source,
        on_delete=models.CASCADE
    )

    category = models.CharField(
        max_length=255
    )

    scope = models.CharField(
        max_length=50,
        choices=SCOPE_CHOICES
    )

    activity_value = models.FloatField()

    unit = models.CharField(max_length=50)

    normalized_value = models.FloatField(
        null=True,
        blank=True
    )

    normalized_unit = models.CharField(
        max_length=50,
        null=True,
        blank=True
    )

    suspicious = models.BooleanField(
        default=False
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='PENDING'
    )

    locked = models.BooleanField(
        default=False
    )

    emission_factor = models.FloatField(
        null=True,
        blank=True
    )

    total_emissions = models.FloatField(
        null=True,
        blank=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.category