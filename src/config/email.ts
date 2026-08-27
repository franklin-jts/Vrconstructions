/**
 * EmailJS Configuration
 * =====================
 * Sign up free at https://www.emailjs.com
 *
 * Steps to set up:
 * 1. Create an account at emailjs.com
 * 2. Add an Email Service (Gmail, Outlook, etc.) → copy the Service ID
 * 3. Create an Email Template → copy the Template ID
 * 4. Copy your Public Key from Account → API Keys
 *
 * Then paste your values below.
 */

export const EMAILJS_CONFIG = {
  // Your EmailJS Public Key (from Account → API Keys)
  publicKey: 'YOUR_PUBLIC_KEY_HERE',

  // Your Email Service ID (from Email Services)
  serviceId: 'YOUR_SERVICE_ID_HERE',

  // Template for Service Requests (banner form)
  serviceRequestTemplate: 'YOUR_TEMPLATE_ID_HERE',

  // Template for Contact Form
  contactTemplate: 'YOUR_TEMPLATE_ID_HERE',
};

/**
 * Email Template Variables
 * =========================
 * In your EmailJS template, use these variables:
 *
 * {{name}}       - Customer's name
 * {{email}}      - Customer's email
 * {{phone}}      - Customer's phone
 * {{service}}    - Selected service
 * {{description}} - Project description
 * {{message}}    - Contact form message
 * {{address}}    - Contact form address
 * {{date}}       - Submission date (auto-filled)
 *
 * Your EmailJS template should look like:
 * -------------------------------------------
 * Subject: New Service Request from {{name}}
 *
 * Hi VR Construction,
 *
 * You have a new service request:
 *
 * Name: {{name}}
 * Email: {{email}}
 * Phone: {{phone}}
 * Service: {{service}}
 * Description: {{description}}
 * Date: {{date}}
 *
 * -------------------------------------------
 */
