import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '../config/email';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', address: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.contactTemplate,
        { ...formData, date: new Date().toLocaleDateString() },
        { publicKey: EMAILJS_CONFIG.publicKey });
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', address: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      console.error('Email send error:', err);
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', address: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } finally { setSubmitting(false); }
  };

  return (
    <>
      <div className="sub-banner">
        <div className="container">
          <h1>Contact</h1>
          <p>We have 25 years experience in construction</p>
        </div>
        <ol className="breadcrumb">
          <li><Link to="/">Home</Link></li>
          <li className="active">Contact</li>
        </ol>
      </div>

      <section className="section" style={{ background: 'var(--c-bg)' }}>
        <div className="container">
          {/* Contact Cards */}
          <div style={{ display: 'flex', gap: '20px', marginBottom: '40px' }}>
            {[
              { icon: 'fa-phone', title: 'Call Us 24/7', detail: '+61 (123) 456 789', sub: 'Emergency Service Available' },
              { icon: 'fa-map-marker', title: 'Contact Address', detail: '44 New Design Street, Melbourne 005', sub: 'info@vrconstruction.com' },
              { icon: 'fa-gift', title: 'Special Offers', detail: '$25 OFF Consultation', sub: 'Limited time offer', btn: true },
            ].map((item, idx) => (
              <div key={idx} style={{ flex: 1, minWidth: 0 }}>
                <div style={{ padding: '30px', background: 'var(--c-surface)', border: '1px solid var(--c-border)', borderRadius: '8px', textAlign: 'center', height: '100%' }}>
                  <i className={`fa ${item.icon}`} style={{ fontSize: '28px', color: 'var(--c-accent)', marginBottom: '15px', display: 'block' }}></i>
                  <h6>{item.title}</h6>
                  <hr style={{ border: 'none', borderTop: '2px solid var(--c-accent)', width: '30px', margin: '10px auto' }} />
                  <h4 style={{ fontFamily: 'var(--f-heading)', color: 'var(--c-accent)', fontSize: '20px', marginBottom: '8px' }}>{item.detail}</h4>
                  <p>{item.sub}</p>
                  {item.btn && <Link to="/services" className="btn btn-primary" style={{ marginTop: '15px', border: 'none' }}>View Specials</Link>}
                </div>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="request-form-wrap">
            <div className="section-header" style={{ textAlign: 'left', marginBottom: '30px' }}>
              <span className="section-tag">Contact Us</span>
              <h2>Request Service or Estimate</h2>
              <div className="section-line" style={{ margin: '15px 0' }} />
              <p>Feel free to call us or complete the form below.</p>
            </div>

            {submitted && (
              <div className="form-success-msg">
                <i className="fa fa-paper-plane-o"></i>
                Thank You. Your Message Has Been Submitted
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div>
                  <label>Name *</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div>
                  <label>Email *</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
              </div>
              <div className="form-row">
                <div>
                  <label>Phone *</label>
                  <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
                </div>
                <div>
                  <label>Address</label>
                  <input type="text" name="address" value={formData.address} onChange={handleChange} />
                </div>
              </div>
              <div>
                <label>Description of Work Needed</label>
                <textarea name="message" rows={5} value={formData.message} onChange={handleChange} style={{ width: '100%', padding: '12px 16px', background: 'var(--c-bg)', border: '1px solid var(--c-border)', borderRadius: '4px', color: 'var(--c-white)', fontFamily: 'var(--f-body)', fontSize: '13px', resize: 'vertical', marginBottom: '15px' }} />
              </div>
              <button type="submit" className="btn btn-primary btn-full" disabled={submitting} style={{ border: 'none' }}>
                {submitting ? 'Sending...' : 'Send Request'}
              </button>
            </form>
          </div>

          {/* Map placeholder */}
          <div style={{ marginTop: '40px', padding: '80px 20px', background: 'var(--c-surface)', border: '1px solid var(--c-border)', borderRadius: '8px', textAlign: 'center' }}>
            <i className="fa fa-map-marker" style={{ fontSize: '48px', color: 'var(--c-accent)', marginBottom: '15px', display: 'block' }}></i>
            <p>44 New Design Street, Melbourne 005</p>
            <p style={{ fontSize: '12px', color: 'var(--c-text-muted)', marginTop: '8px' }}>Google Maps Integration — Add your API key in environment variables</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
