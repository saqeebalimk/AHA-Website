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
    """Captures technical queries, repair quotes, and diagnostic questions."""
    STATUS_CHOICES = [
        ('new', 'New'),
        ('contacted', 'Contacted'),
        ('in_progress', 'Evaluating'),
        ('completed', 'Resolved'),
        ('closed', 'Closed'),
    ]

    name = models.CharField(max_length=200)
    phone = models.CharField(max_length=20)
    email = models.EmailField(blank=True, null=True)
    brand = models.CharField(max_length=100, blank=True)
    model_number = models.CharField(max_length=100, blank=True)
    issue_description = models.TextField()
    
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='new')
    notes = models.TextField(blank=True, help_text="Internal notes by technician")
    session = models.ForeignKey(ChatSession, on_delete=models.SET_NULL, null=True, blank=True, related_name='service_requests')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = "Service Request"
        verbose_name_plural = "Service Requests"

    def __str__(self):
        return f"{self.name} — {self.brand} {self.model_number} ({self.get_status_display()})"\


class Booking(models.Model):
    """Captures formal site visits and bench diagnostic appointments from the booking flow."""
    STATUS_CHOICES = [
        ('pending', 'Pending Confirmation'),
        ('confirmed', 'Confirmed'),
        ('fulfilled', 'Fulfilled'),
        ('cancelled', 'Cancelled'),
    ]

    name = models.CharField(max_length=200)
    phone = models.CharField(max_length=20)
    email = models.EmailField(blank=True, null=True)
    service_type = models.CharField(max_length=150, help_text="e.g. 'Site Visit', 'Home Theatre Calibration', 'PCB Repair Drop-off'")
    
    desired_date = models.DateField(blank=True, null=True)
    desired_time = models.TimeField(blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    session = models.ForeignKey(ChatSession, on_delete=models.SET_NULL, null=True, blank=True, related_name='bookings')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = "Booking"
        verbose_name_plural = "Bookings"

    def __str__(self):
        date_str = self.desired_date.strftime('%Y-%m-%d') if self.desired_date else "No Date"
        return f"{self.name} — {self.service_type} on {date_str}"


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
    """Layer 2 Search Target: Stores 1500+ structured AV engineering QA articles."""
    CATEGORY_CHOICES = [
        ('faq', 'General FAQ'),
        ('home_theatre', 'Home Theatre'),
        ('dolby_atmos', 'Dolby Atmos'),
        ('amplifier_repair', 'Amplifier Repair'),
        ('pcb_repair', 'PCB Repair'),
        ('hdmi_repair', 'HDMI Board Repair'),
        ('dsp_channels', 'DSP & Lost Channels'),
        ('speaker_repair', 'Speaker Repair'),
        ('subwoofer', 'Subwoofers'),
        ('calibration', 'Calibration'),
        ('hifi_audio', 'Hi-Fi Audio'),
        ('commercial_audio', 'Commercial Audio'),
        ('preventive_maintenance', 'Preventive Maintenance'),
        ('service', 'Service Information'),
        ('troubleshooting', 'Troubleshooting Guide'),
        ('policy', 'Store Policy'),
        ('booking', 'Booking Process'),
    ]

    question_text = models.CharField(max_length=500, help_text="Primary question (e.g. 'What is your refund policy?')")
    short_answer = models.TextField(blank=True, help_text="1-3 sentence concise answer for chatbot and WhatsApp.")
    answer_text = models.TextField(help_text="Detailed engineering-level answer (100-250 words).")
    keywords = models.TextField(help_text="Comma-separated synonyms and aliases for fuzzy matching.")
    synonyms = models.TextField(blank=True, help_text="Comma-separated alternative phrasings of the question.")
    category = models.CharField(max_length=30, choices=CATEGORY_CHOICES, default='faq')
    subcategory = models.CharField(max_length=100, blank=True, help_text="e.g. 'Protect Mode', 'HDMI ARC', 'Capacitor Ageing'")
    related_topics = models.TextField(blank=True, help_text="Comma-separated related article questions for internal linking.")
    
    class Meta:
        verbose_name = "Knowledge Base Article"
        verbose_name_plural = "Knowledge Base Articles"
        
    def __str__(self):
        return f"[{self.get_category_display()}] {self.question_text}"


class Product(models.Model):
    """Stores the literal hardware inventory and AV catalog."""
    name = models.CharField(max_length=200)
    brand = models.CharField(max_length=100, blank=True)
    category = models.CharField(max_length=100, help_text="e.g. 'AV Receiver', 'Tower Speaker', 'Integrated Amp'")
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    tags = models.TextField(help_text="Comma-separated tags for matching (e.g. 'cheap, beginner, starter, small room')")

    class Meta:
        verbose_name = "Product"
        verbose_name_plural = "Products"

    def __str__(self):
        return f"{self.brand} {self.name}"


class Recommendation(models.Model):
    """Tracks dynamic product configurations recommended to users by the AI System Designer."""
    session = models.ForeignKey(ChatSession, on_delete=models.CASCADE, related_name='recommendations')
    recommended_product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True, related_name='recommended_in')
    context_reasoning = models.TextField(help_text="Why did the AI recommend this? (e.g. 'Matches room size 15x20')")
    accepted = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "AI Recommendation"
        verbose_name_plural = "AI Recommendations"
        ordering = ['-created_at']

    def __str__(self):
        return f"Rec: {self.recommended_product} for Session {self.session.session_id[:8]}"


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
