from django.db import models

class ChatSession(models.Model):
    """Tracks a single browser visit conversation."""
    session_id = models.CharField(max_length=100, unique=True, db_index=True)
    current_intent = models.CharField(max_length=50, blank=True, null=True, help_text="Tracks active conversation flow")
    intent_step = models.IntegerField(default=0, help_text="Tracks step index within the active intent")
    state_data = models.JSONField(default=dict, blank=True, help_text="Stores variables collected during flow")
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-updated_at']
        verbose_name = "Chat Session"
        verbose_name_plural = "Chat Sessions"

    def __str__(self):
        return f"Session {self.session_id[:16]}…"

    def message_count(self):
        return self.messages.count()
    message_count.short_description = "Messages"


class Message(models.Model):
    """Stores every individual turn in a chat session."""
    ROLE_CHOICES = [('user', 'User'), ('model', 'AI')]
    GENERATED_CHOICES = [
        ('user', 'User Input'),
        ('layer1_heuristic', 'L1: Hardcoded/Heuristic'),
        ('layer2_kb', 'L2: Knowledge Base NLP'),
        ('layer3_gemini', 'L3: Gemini AI Emergency'),
    ]

    session = models.ForeignKey(ChatSession, on_delete=models.CASCADE, related_name='messages')
    role = models.CharField(max_length=10, choices=ROLE_CHOICES)
    text = models.TextField()
    generated_by = models.CharField(max_length=20, choices=GENERATED_CHOICES, default='user')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['created_at']
        verbose_name = "Message"
        verbose_name_plural = "Messages"

    def __str__(self):
        prefix = self.text[:60] + "…" if len(self.text) > 60 else self.text
        return f"[{self.role.upper()}] {prefix}"


class ServiceRequest(models.Model):
    """Captures all service booking leads from the chatbot."""
    STATUS_CHOICES = [
        ('new', 'New'),
        ('contacted', 'Contacted'),
        ('in_progress', 'In Progress'),
        ('completed', 'Completed'),
        ('closed', 'Closed'),
    ]

    name = models.CharField(max_length=200)
    phone = models.CharField(max_length=20)
    email = models.EmailField(blank=True, null=True)
    brand = models.CharField(max_length=100, blank=True)
    model_number = models.CharField(max_length=100, blank=True)
    issue_description = models.TextField()
    
    # Booking specifics
    desired_date = models.DateField(blank=True, null=True)
    desired_time = models.TimeField(blank=True, null=True)
    
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='new')
    notes = models.TextField(blank=True, help_text="Internal notes by technician")
    session = models.ForeignKey(ChatSession, on_delete=models.SET_NULL, null=True, blank=True, related_name='service_requests')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = "Service Request / Booking"
        verbose_name_plural = "Service Requests / Bookings"

    def __str__(self):
        return f"{self.name} — {self.brand} {self.model_number} ({self.get_status_display()})"


class DiagnosticLog(models.Model):
    """Stores every Visual Diagnostic image analysis result."""
    session = models.ForeignKey(ChatSession, on_delete=models.SET_NULL, null=True, blank=True, related_name='diagnostics')
    analysis_result = models.TextField()
    mime_type = models.CharField(max_length=50, default='image/jpeg')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = "Diagnostic Log"
        verbose_name_plural = "Diagnostic Logs"

    def __str__(self):
        short = self.analysis_result[:60] + "…" if len(self.analysis_result) > 60 else self.analysis_result
        return f"Diagnostic [{self.created_at.strftime('%Y-%m-%d %H:%M')}]: {short}"


# ─────────────────────────────────────────────────────────────────────────────
# 3-LAYER ARCHITECTURE MODELS (NEW)
# ─────────────────────────────────────────────────────────────────────────────

class KnowledgeBaseArticle(models.Model):
    """Layer 2 Search Target: Stores 5000+ QA mappings."""
    CATEGORY_CHOICES = [
        ('faq', 'General FAQ'),
        ('service', 'Service Information'),
        ('troubleshooting', 'Troubleshooting Guide'),
        ('policy', 'Store Policy'),
        ('booking', 'Booking Process'),
    ]

    question_text = models.CharField(max_length=500, help_text="Primary question (e.g. 'What is your refund policy?')")
    answer_text = models.TextField(help_text="The exact response the bot should give.")
    keywords = models.TextField(help_text="Comma-separated synonyms and aliases for fuzzy matching (e.g. 'refund, money back, guarantee, warranty')")
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='faq')
    
    class Meta:
        verbose_name = "Knowledge Base Article"
        verbose_name_plural = "Knowledge Base Articles"
        
    def __str__(self):
        return f"[{self.get_category_display()}] {self.question_text}"


class Product(models.Model):
    """For Non-AI Product recommendations."""
    name = models.CharField(max_length=200)
    category = models.CharField(max_length=100)
    description = models.TextField()
    price_estimate = models.CharField(max_length=100, blank=True)
    tags = models.TextField(help_text="Comma-separated tags for rule-based matching (e.g. 'cheap, beginner, starter, low budget')")

    class Meta:
        verbose_name = "Product / Recommendation"
        verbose_name_plural = "Products / Recommendations"

    def __str__(self):
        return self.name


class KnownVisualIssue(models.Model):
    """Bypasses Gemini Vision if a user perfectly selects/describes a known visual fault."""
    symptom_name = models.CharField(max_length=200, help_text="e.g. 'Swollen Capacitor', 'Burnt Trace'")
    category = models.CharField(max_length=100, blank=True)
    diagnosis_text = models.TextField(help_text="The predefined diagnosis to return without hitting Gemini.")

    class Meta:
        verbose_name = "Known Visual Issue"
        verbose_name_plural = "Known Visual Issues"

    def __str__(self):
        return self.symptom_name
