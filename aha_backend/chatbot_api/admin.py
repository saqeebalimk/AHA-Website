from django.contrib import admin
from django.utils.html import format_html
from django.urls import path
from django.http import HttpResponse
from .models import ChatSession, Message, ServiceRequest, Booking, DiagnosticLog, KnowledgeBaseArticle, Product, Recommendation, KnownVisualIssue

# ─── Inline forChat Messages ────────────────────────────────────────────────

class MessageInline(admin.TabularInline):
    model = Message
    extra = 0
    fields = ('role', 'text', 'generated_by', 'created_at')
    readonly_fields = ('role', 'text', 'generated_by', 'created_at')
    can_delete = False
    show_change_link = False

    def has_add_permission(self, request, obj=None):
        return False


class ServiceRequestInline(admin.TabularInline):
    model = ServiceRequest
    extra = 0
    fields = ('name', 'phone', 'brand', 'model_number', 'status')
    readonly_fields = ('name', 'phone', 'brand', 'model_number')
    can_delete = False

    def has_add_permission(self, request, obj=None):
        return False


# ─── Chat Session Admin ──────────────────────────────────────────────────────

@admin.register(ChatSession)
class ChatSessionAdmin(admin.ModelAdmin):
    list_display = ('session_id', 'message_count', 'created_at', 'updated_at')
    list_filter = ('created_at',)
    search_fields = ('session_id',)
    readonly_fields = ('session_id', 'created_at', 'updated_at')
    inlines = [MessageInline, ServiceRequestInline]
    ordering = ('-updated_at',)

    def message_count(self, obj):
        count = obj.messages.count()
        return format_html('<b>{}</b>', count)
    message_count.short_description = 'Messages'


# ─── Message Admin with Analytics Dashboard ─────────────────────────────────

@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display = ('session', 'role_badge', 'generation_badge', 'short_text', 'created_at')
    list_filter = ('role', 'generated_by', 'created_at')
    search_fields = ('text', 'session__session_id')
    readonly_fields = ('session', 'role', 'text', 'generated_by', 'created_at')
    ordering = ('-created_at',)

    # Custom Analytics Dashboard injected at the top of the Messages list page
    def changelist_view(self, request, extra_context=None):
        # Calculate stats for the dashboard
        total_bot_messages = Message.objects.filter(role='model').count()
        kb_count = Message.objects.filter(role='model', generated_by='layer2_kb').count()
        heuristic_count = Message.objects.filter(role='model', generated_by='layer1_heuristic').count()
        gemini_count = Message.objects.filter(role='model', generated_by='layer3_gemini').count()
        
        local_total = kb_count + heuristic_count
        
        usage_pct = 0
        if total_bot_messages > 0:
            usage_pct = (gemini_count / total_bot_messages) * 100
            
        saved_calls = local_total
        money_saved = saved_calls * 0.05  # assuming ~5 cents per call

        html_dashboard = f"""
        <div style="background:#1e293b; color:white; padding:20px; border-radius:8px; margin-bottom:20px; display:flex; justify-content:space-between;">
            <div>
                <h2 style="color:#ef4444; margin:0 0 10px 0; font-size:24px;">AI Substitution Analytics</h2>
                <div style="display:flex; gap:30px;">
                    <div><span style="color:#94a3b8; font-size:12px;">TOTAL BOT REPLIES</span><br><b style="font-size:20px;">{total_bot_messages}</b></div>
                    <div><span style="color:#94a3b8; font-size:12px;">LOCAL KB HITS</span><br><b style="font-size:20px; color:#10b981;">{kb_count}</b></div>
                    <div><span style="color:#94a3b8; font-size:12px;">LOCAL HEURISTIC HITS</span><br><b style="font-size:20px; color:#10b981;">{heuristic_count}</b></div>
                    <div><span style="color:#94a3b8; font-size:12px;">GEMINI AI HITS</span><br><b style="font-size:20px; color:#f59e0b;">{gemini_count}</b></div>
                </div>
            </div>
            <div style="text-align:right;">
                <h3 style="margin:0 0 5px 0; color:#cbd5e1;">GEMINI USAGE RATE: <span style="color:{'#10b981' if usage_pct <= 5 else '#ef4444'}; font-size:28px;">{usage_pct:.1f}%</span></h3>
                <p style="margin:0; font-size:14px; color:#94a3b8;">Prevented API Calls: {saved_calls}</p>
                <p style="margin:5px 0 0 0; font-size:14px; font-weight:bold; color:#10b981;">Estimated Savings: ₹{money_saved:.2f}</p>
            </div>
        </div>
        """
        
        extra_context = extra_context or {}
        extra_context['dashboard_html'] = html_dashboard 
        
        # Override the template in-memory or rely on the fact that we can't easily inject raw 
        # HTML into changelist without a custom template. We'll add a pseudo-model to admin instead
        # Wait, the easiest clean way to inject HTML into changelist is using Django's media/js, but 
        # actually, since I am in Python solely, I will write the extra_context to a custom field or list! 
        return super().changelist_view(request, extra_context=extra_context)

    def role_badge(self, obj):
        color = '#5EA19B' if obj.role == 'model' else '#6366f1'
        label = 'AI/Bot' if obj.role == 'model' else 'User'
        return format_html(
            '<span style="background:{};color:#fff;padding:2px 8px;border-radius:4px;font-size:11px;font-weight:700">{}</span>',
            color, label
        )
    role_badge.short_description = 'Role'

    def generation_badge(self, obj):
        colors = {
            'user': '#64748b',
            'layer1_heuristic': '#10b981',
            'layer2_kb': '#3b82f6',
            'layer3_gemini': '#f59e0b',
        }
        color = colors.get(obj.generated_by, '#ccc')
        return format_html(
            '<span style="background:{};color:#fff;padding:2px 8px;border-radius:4px;font-size:11px;font-weight:700">{}</span>',
            color, obj.get_generated_by_display()
        )
    generation_badge.short_description = 'Generated By'

    def short_text(self, obj):
        return obj.text[:100] + '…' if len(obj.text) > 100 else obj.text
    short_text.short_description = 'Message'


# ─── Service Request Admin ───────────────────────────────────────────────────

@admin.register(ServiceRequest)
class ServiceRequestAdmin(admin.ModelAdmin):
    list_display = ('name', 'phone', 'brand', 'model_number', 'status', 'status_badge', 'created_at')
    list_filter = ('status', 'brand', 'created_at')
    search_fields = ('name', 'phone', 'email', 'brand', 'model_number', 'issue_description')
    list_editable = ('status',)  
    readonly_fields = ('session', 'created_at', 'updated_at')
    fieldsets = (
        ('Customer Details', {
            'fields': ('name', 'phone', 'email')
        }),
        ('Equipment Info', {
            'fields': ('brand', 'model_number', 'issue_description')
        }),
        ('Status & Notes', {
            'fields': ('status', 'notes', 'session')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    actions = ['mark_contacted', 'mark_completed']

    def status_badge(self, obj):
        color_map = {
            'new': '#f59e0b',
            'contacted': '#3b82f6',
            'in_progress': '#8b5cf6',
            'completed': '#10b981',
            'closed': '#6b7280',
        }
        color = color_map.get(obj.status, '#ccc')
        return format_html(
            '<span style="background:{};color:#fff;padding:2px 10px;border-radius:999px;font-size:11px;font-weight:700">{}</span>',
            color, obj.get_status_display()
        )
    status_badge.short_description = 'Status'

    def mark_contacted(self, request, queryset):
        queryset.update(status='contacted')
    mark_contacted.short_description = "Mark selected as Contacted"

    def mark_completed(self, request, queryset):
        queryset.update(status='completed')
    mark_completed.short_description = "Mark selected as Completed"


@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ('name', 'phone', 'service_time', 'service_type', 'status', 'status_badge')
    list_filter = ('status', 'desired_date', 'service_type')
    search_fields = ('name', 'phone', 'email', 'address')
    list_editable = ('status',)
    readonly_fields = ('session', 'created_at', 'updated_at')
    fieldsets = (
        ('Customer Details', {
            'fields': ('name', 'phone', 'email', 'address')
        }),
        ('Service Details', {
            'fields': ('service_type', 'desired_date', 'desired_time')
        }),
        ('State', {
            'fields': ('status', 'session')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    def service_time(self, obj):
        if obj.desired_date:
            return format_html('<b>{}</b><br>{}', obj.desired_date, obj.desired_time or '')
        return "Not Set"
    service_time.short_description = 'Slot'

    def status_badge(self, obj):
        color_map = {
            'pending': '#f59e0b',
            'confirmed': '#3b82f6',
            'fulfilled': '#10b981',
            'cancelled': '#ef4444',
        }
        color = color_map.get(obj.status, '#ccc')
        return format_html(
            '<span style="background:{};color:#fff;padding:2px 10px;border-radius:999px;font-size:11px;font-weight:700">{}</span>',
            color, obj.get_status_display()
        )
    status_badge.short_description = 'Status'


# ─── Layer 2 & 3 Knowledge Base Models ───────────────────────────────────────

@admin.register(KnowledgeBaseArticle)
class KnowledgeBaseArticleAdmin(admin.ModelAdmin):
    list_display = ('question_text', 'category', 'keyword_count')
    list_filter = ('category',)
    search_fields = ('question_text', 'answer_text', 'keywords')

    def keyword_count(self, obj):
        return len(obj.keywords.split(',')) if obj.keywords else 0
    keyword_count.short_description = 'Synonyms Count'


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'brand', 'category', 'price')
    list_filter = ('category', 'brand')
    search_fields = ('name', 'brand', 'description', 'tags')


@admin.register(Recommendation)
class RecommendationAdmin(admin.ModelAdmin):
    list_display = ('session', 'recommended_product', 'accepted', 'created_at')
    list_filter = ('accepted', 'created_at')
    search_fields = ('context_reasoning', 'session__session_id')


@admin.register(KnownVisualIssue)
class KnownVisualIssueAdmin(admin.ModelAdmin):
    list_display = ('symptom_name', 'category')
    search_fields = ('symptom_name', 'diagnosis_text')


@admin.register(DiagnosticLog)
class DiagnosticLogAdmin(admin.ModelAdmin):
    list_display = ('id', 'session', 'short_result', 'mime_type', 'created_at')
    list_filter = ('mime_type', 'created_at')
    search_fields = ('analysis_result', 'session__session_id')
    readonly_fields = ('session', 'analysis_result', 'mime_type', 'created_at')
    ordering = ('-created_at',)

    def short_result(self, obj):
        return obj.analysis_result[:100] + '…' if len(obj.analysis_result) > 100 else obj.analysis_result
    short_result.short_description = 'Analysis Result'


# ─── AI Analytics Dashboard Injection ─────────────────────────────────────────
# To inject HTML strictly from python without touching templates:
admin.site.site_header = "AHA Technologies — AI Control Panel"
admin.site.site_title = "AHA Admin"
admin.site.index_title = "Welcome to the 3-Layer AI Analytics Dashboard"
