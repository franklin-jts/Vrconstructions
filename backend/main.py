"""
VR Construction - FastAPI Backend
Handles contact form submissions, service requests, and API endpoints.
Sends email notifications for new service requests.
"""

import os
import json
import aiosmtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime
from typing import Optional

from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel

# ============================================================
# SMTP Configuration (set these via environment variables)
# ============================================================
SMTP_HOST = os.getenv("SMTP_HOST", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))
SMTP_USER = os.getenv("SMTP_USER", "")          # your Gmail address
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD", "")   # Gmail App Password
ADMIN_EMAIL = os.getenv("ADMIN_EMAIL", "")       # where to receive notifications
FROM_NAME = os.getenv("FROM_NAME", "VR Construction Website")
FROM_EMAIL = os.getenv("FROM_EMAIL", SMTP_USER)

# ============================================================
# Initialize FastAPI app
# ============================================================
app = FastAPI(
    title="VR Construction API",
    description="Backend API for VR Construction website - Contact forms, service requests, and more.",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3000",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ============================================================
# Data Models
# ============================================================

class ContactForm(BaseModel):
    name: str
    email: str
    phone: str
    address: Optional[str] = ""
    message: Optional[str] = ""

class ServiceRequest(BaseModel):
    name: str
    email: str
    phone: Optional[str] = ""
    service: str = ""
    description: Optional[str] = ""

class ContactResponse(BaseModel):
    success: bool
    message: str
    id: Optional[str] = None

# ============================================================
# In-memory storage
# ============================================================
submissions_db: list[dict] = []

# ============================================================
# Email Helpers
# ============================================================

async def send_email(to_email: str, subject: str, html_body: str) -> bool:
    """Send an HTML email using aiosmtplib."""
    if not SMTP_USER or not SMTP_PASSWORD:
        print(f"[EMAIL SKIPPED] No SMTP configured. Would send to {to_email}: {subject}")
        return False

    try:
        message = MIMEMultipart("alternative")
        message["From"] = f"{FROM_NAME} <{FROM_EMAIL}>"
        message["To"] = to_email
        message["Subject"] = subject

        # Plain text fallback
        text_part = MIMEText(html_body, "plain")
        message.attach(text_part)

        # HTML part
        html_part = MIMEText(html_body, "html")
        message.attach(html_part)

        await aiosmtplib.send(
            message,
            hostname=SMTP_HOST,
            port=SMTP_PORT,
            start_tls=True,
            username=SMTP_USER,
            password=SMTP_PASSWORD,
        )
        print(f"[EMAIL SENT] To: {to_email} | Subject: {subject}")
        return True
    except Exception as e:
        print(f"[EMAIL ERROR] Failed to send to {to_email}: {e}")
        return False


def build_admin_notification(name: str, email: str, phone: str, service: str, description: str, sub_id: str) -> str:
    """Build HTML email for admin when a new service request comes in."""
    return f"""
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {{ font-family: Arial, sans-serif; background: #f5f5f5; margin: 0; padding: 20px; }}
        .container {{ max-width: 600px; margin: 0 auto; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }}
        .header {{ background: #333; padding: 25px 30px; }}
        .header h1 {{ color: #e8b730; margin: 0; font-size: 22px; }}
        .header p {{ color: #aaa; margin: 5px 0 0; font-size: 13px; }}
        .body {{ padding: 30px; }}
        .badge {{ display: inline-block; background: #e8b730; color: #333; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: bold; margin-bottom: 20px; }}
        .field {{ margin-bottom: 15px; }}
        .field label {{ display: block; font-size: 11px; color: #999; text-transform: uppercase; margin-bottom: 4px; letter-spacing: 0.5px; }}
        .field .value {{ font-size: 15px; color: #333; font-weight: 500; }}
        .field .value a {{ color: #e8b730; text-decoration: none; }}
        .divider {{ border: none; border-top: 1px solid #eee; margin: 20px 0; }}
        .description {{ background: #f9f9f9; padding: 15px; border-radius: 5px; border-left: 3px solid #e8b730; }}
        .description p {{ margin: 0; color: #555; line-height: 1.6; }}
        .footer {{ background: #f5f5f5; padding: 15px 30px; text-align: center; }}
        .footer p {{ margin: 0; font-size: 12px; color: #999; }}
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🏗️ VR Construction</h1>
          <p>New Service Request Received</p>
        </div>
        <div class="body">
          <span class="badge">🔔 NEW REQUEST</span>

          <div class="field">
            <label>Customer Name</label>
            <div class="value">{name}</div>
          </div>

          <div class="field">
            <label>Email Address</label>
            <div class="value"><a href="mailto:{email}">{email}</a></div>
          </div>

          <div class="field">
            <label>Phone Number</label>
            <div class="value">{phone or 'Not provided'}</div>
          </div>

          <hr class="divider">

          <div class="field">
            <label>Service Requested</label>
            <div class="value" style="color: #e8b730; font-size: 16px;">{service or 'Not specified'}</div>
          </div>

          <div class="field">
            <label>Project Description</label>
            <div class="description">
              <p>{description or 'No description provided'}</p>
            </div>
          </div>

          <hr class="divider">

          <div class="field">
            <label>Request ID</label>
            <div class="value" style="font-size: 12px; color: #999;">{sub_id}</div>
          </div>
          <div class="field">
            <label>Submitted At</label>
            <div class="value" style="font-size: 12px; color: #999;">{datetime.now().strftime('%B %d, %Y at %I:%M %p')}</div>
          </div>
        </div>
        <div class="footer">
          <p>This is an automated notification from VR Construction website.</p>
        </div>
      </div>
    </body>
    </html>
    """


def build_customer_confirmation(name: str, service: str) -> str:
    """Build HTML confirmation email for the customer."""
    return f"""
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {{ font-family: Arial, sans-serif; background: #f5f5f5; margin: 0; padding: 20px; }}
        .container {{ max-width: 600px; margin: 0 auto; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }}
        .header {{ background: #333; padding: 25px 30px; text-align: center; }}
        .header h1 {{ color: #e8b730; margin: 0; font-size: 22px; }}
        .body {{ padding: 30px; text-align: center; }}
        .check {{ font-size: 48px; margin-bottom: 15px; }}
        .body h2 {{ color: #333; font-size: 20px; margin-bottom: 10px; }}
        .body p {{ color: #777; line-height: 1.7; font-size: 14px; }}
        .service-box {{ background: #f9f9f9; border: 1px solid #eee; border-radius: 5px; padding: 15px; margin: 20px 0; }}
        .service-box p {{ margin: 0; color: #e8b730; font-weight: bold; font-size: 16px; }}
        .footer {{ background: #f5f5f5; padding: 15px 30px; text-align: center; }}
        .footer p {{ margin: 0; font-size: 12px; color: #999; }}
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🏗️ VR Construction</h1>
        </div>
        <div class="body">
          <div class="check">✅</div>
          <h2>Thank You, {name}!</h2>
          <p>We have received your service request. Our team will review your details and get back to you within 24 hours.</p>

          <div class="service-box">
            <p>Service: {service or 'General Inquiry'}</p>
          </div>

          <p>If you need immediate assistance, please call us at<br><strong style="color: #e8b730;">+61 (123) 456 789</strong></p>
        </div>
        <div class="footer">
          <p>VR Construction — Professional Building Services</p>
        </div>
      </div>
    </body>
    </html>
    """


# ============================================================
# API Endpoints
# ============================================================

@app.get("/")
async def root():
    """Health check endpoint."""
    return {
        "status": "running",
        "service": "VR Construction API",
        "version": "1.0.0",
        "timestamp": datetime.now().isoformat()
    }


@app.get("/api/health")
async def health_check():
    """API health check."""
    return {"status": "healthy", "service": "vr-construction-api"}


@app.post("/api/contact", response_model=ContactResponse)
async def submit_contact_form(form: ContactForm):
    """Handle contact form submissions from the Contact page."""
    if not form.name.strip():
        raise HTTPException(status_code=400, detail="Name is required")
    if not form.email.strip():
        raise HTTPException(status_code=400, detail="Email is required")
    if not form.phone.strip():
        raise HTTPException(status_code=400, detail="Phone is required")

    submission = {
        "id": f"contact_{len(submissions_db) + 1}",
        "type": "contact",
        "name": form.name.strip(),
        "email": form.email.strip(),
        "phone": form.phone.strip(),
        "address": form.address.strip() if form.address else "",
        "message": form.message.strip() if form.message else "",
        "submitted_at": datetime.now().isoformat(),
        "status": "new"
    }

    submissions_db.append(submission)

    # Send admin notification email
    await send_email(
        to_email=ADMIN_EMAIL,
        subject=f"📩 New Contact Form — {form.name.strip()}",
        html_body=build_admin_notification(
            name=form.name.strip(),
            email=form.email.strip(),
            phone=form.phone.strip(),
            service="Contact Form",
            description=form.message or "",
            sub_id=submission["id"],
        ),
    )

    return ContactResponse(
        success=True,
        message="Thank you! Your message has been submitted. We will contact you shortly.",
        id=submission["id"]
    )


@app.post("/api/service-request", response_model=ContactResponse)
async def submit_service_request(form: ServiceRequest):
    """
    Handle quick service request forms from the homepage banner.
    Sends admin notification + customer confirmation email.
    """
    if not form.name.strip():
        raise HTTPException(status_code=400, detail="Name is required")
    if not form.email.strip():
        raise HTTPException(status_code=400, detail="Email is required")

    submission = {
        "id": f"service_{len(submissions_db) + 1}",
        "type": "service_request",
        "name": form.name.strip(),
        "email": form.email.strip(),
        "phone": form.phone.strip() if form.phone else "",
        "service": form.service.strip() if form.service else "",
        "description": form.description.strip() if form.description else "",
        "submitted_at": datetime.now().isoformat(),
        "status": "new"
    }

    submissions_db.append(submission)

    # 1) Send admin notification email
    await send_email(
        to_email=ADMIN_EMAIL,
        subject=f"🔔 New Service Request — {form.name.strip()} [{form.service or 'General'}]",
        html_body=build_admin_notification(
            name=form.name.strip(),
            email=form.email.strip(),
            phone=form.phone or "",
            service=form.service or "",
            description=form.description or "",
            sub_id=submission["id"],
        ),
    )

    # 2) Send confirmation email to customer
    await send_email(
        to_email=form.email.strip(),
        subject="✅ Your Service Request — VR Construction",
        html_body=build_customer_confirmation(
            name=form.name.strip(),
            service=form.service or "",
        ),
    )

    return ContactResponse(
        success=True,
        message="Thank you! Your service request has been submitted. Our team will reach out to you soon.",
        id=submission["id"]
    )


@app.get("/api/submissions")
async def get_all_submissions():
    """Admin endpoint: Get all form submissions."""
    return {
        "total": len(submissions_db),
        "submissions": submissions_db
    }


@app.get("/api/submissions/{submission_id}")
async def get_submission(submission_id: str):
    """Get a specific submission by ID."""
    for sub in submissions_db:
        if sub["id"] == submission_id:
            return sub
    raise HTTPException(status_code=404, detail="Submission not found")


@app.delete("/api/submissions/{submission_id}")
async def delete_submission(submission_id: str):
    """Delete a submission by ID."""
    global submissions_db
    original_length = len(submissions_db)
    submissions_db = [s for s in submissions_db if s["id"] != submission_id]
    if len(submissions_db) == original_length:
        raise HTTPException(status_code=404, detail="Submission not found")
    return {"success": True, "message": "Submission deleted"}


# ============================================================
# Run the server
# ============================================================
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )
