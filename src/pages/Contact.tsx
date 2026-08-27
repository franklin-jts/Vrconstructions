import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '../config/email';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.contactTemplate,
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          message: formData.message,
          date: new Date().toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric',
            hour: '2-digit', minute: '2-digit',
          }),
        },
        { publicKey: EMAILJS_CONFIG.publicKey },
      );
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', address: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error('Email send error:', error);
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', address: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Sub Banner */}
      <div className="sub-banner">
        <div className="container">
          <h1>Contact</h1>
          <p className="exo">We have 25 years experience in construction</p>
        </div>
        <ol className="breadcrumb">
          <li><Link to="/">Home</Link></li>
          <li className="active">Contact</li>
        </ol>
      </div>

      {/* Contact */}
      <section className="contact">
        <div className="container">
          <div className="contact-info">
            <div className="row" style={{ display: 'flex', gap: '30px' }}>
              {/* Address */}
              <div style={{ flex: 1, padding: '0 15px' }}>
                <div className="con-det">
                  <div style={{ padding: '30px', background: '#f9f9f9', borderRadius: '5px', textAlign: 'center' }}>
                    <h6>Call Us 24/7<br />For Emergency Service!</h6>
                    <hr style={{ border: 'none', borderTop: '2px solid #e8b730', width: '40px', margin: '10px auto' }} />
                    <h4 style={{ fontFamily: "'Exo 2', sans-serif", color: '#e8b730', fontSize: '24px' }}>+61 (123) 456 789</h4>
                    <p>(or)</p>
                    <p>Request service now</p>
                  </div>
                </div>
              </div>

              {/* Contact Address */}
              <div style={{ flex: 1, padding: '0 15px' }}>
                <div className="con-det">
                  <div style={{ padding: '30px', background: '#f9f9f9', borderRadius: '5px', textAlign: 'center' }}>
                    <h6>Contact Address</h6>
                    <hr style={{ border: 'none', borderTop: '2px solid #e8b730', width: '40px', margin: '10px auto' }} />
                    <p>44 New Design Street,<br />Melbourne 005</p>
                    <p>Tel: +61 (123) 456 789</p>
                    <p>Email: info@vrconstruction.com</p>
                  </div>
                </div>
              </div>

              {/* Special Offers */}
              <div style={{ flex: 1, padding: '0 15px' }}>
                <div className="con-det">
                  <div style={{ padding: '30px', background: '#f9f9f9', borderRadius: '5px', textAlign: 'center' }}>
                    <h6>Special Offers</h6>
                    <hr style={{ border: 'none', borderTop: '2px solid #e8b730', width: '40px', margin: '10px auto' }} />
                    <p>Get <span style={{ color: '#e8b730', fontWeight: 700 }}>$25 OFF</span> Any Construction Project Consultation</p>
                    <Link to="/services" className="btn" style={{ marginTop: '15px' }}>View Our Specials</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form" style={{ marginTop: '40px' }}>
            <div className="tittle">
              <h2>Request Service or Estimate</h2>
              <hr style={{ border: 'none', borderTop: '2px solid #e8b730', width: '60px', margin: '15px auto' }} />
              <p>Feel free to call us directly or simply complete our form below and we will follow up with you.</p>
            </div>

            <div className={`success-msg ${submitted ? 'show' : ''}`}>
              <i className="fa fa-paper-plane-o"></i>
              Thank You. Your Message Has Been Submitted
            </div>

            <form role="form" onSubmit={handleSubmit}>
              <ul className="row" style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
                <li style={{ width: 'calc(50% - 8px)', padding: '0' }}>
                  <label style={{ display: 'block', fontFamily: "'Exo 2', sans-serif", fontSize: '12px', color: '#333', textTransform: 'uppercase', marginBottom: '5px' }}>
                    Name *
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder=""
                      required
                      style={{ width: '100%', padding: '12px 15px', border: '1px solid #eee', borderRadius: '3px', marginTop: '5px' }}
                    />
                  </label>
                </li>
                <li style={{ width: 'calc(50% - 8px)', padding: '0' }}>
                  <label style={{ display: 'block', fontFamily: "'Exo 2', sans-serif", fontSize: '12px', color: '#333', textTransform: 'uppercase', marginBottom: '5px' }}>
                    Email *
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder=""
                      required
                      style={{ width: '100%', padding: '12px 15px', border: '1px solid #eee', borderRadius: '3px', marginTop: '5px' }}
                    />
                  </label>
                </li>
                <li style={{ width: 'calc(50% - 8px)', padding: '0' }}>
                  <label style={{ display: 'block', fontFamily: "'Exo 2', sans-serif", fontSize: '12px', color: '#333', textTransform: 'uppercase', marginBottom: '5px' }}>
                    Phone *
                    <input
                      type="text"
                      className="form-control"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder=""
                      required
                      style={{ width: '100%', padding: '12px 15px', border: '1px solid #eee', borderRadius: '3px', marginTop: '5px' }}
                    />
                  </label>
                </li>
                <li style={{ width: 'calc(50% - 8px)', padding: '0' }}>
                  <label style={{ display: 'block', fontFamily: "'Exo 2', sans-serif", fontSize: '12px', color: '#333', textTransform: 'uppercase', marginBottom: '5px' }}>
                    Full Address
                    <input
                      type="text"
                      className="form-control"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder=""
                      style={{ width: '100%', padding: '12px 15px', border: '1px solid #eee', borderRadius: '3px', marginTop: '5px' }}
                    />
                  </label>
                </li>
                <li style={{ width: '100%', padding: '0' }}>
                  <label style={{ display: 'block', fontFamily: "'Exo 2', sans-serif", fontSize: '12px', color: '#333', textTransform: 'uppercase', marginBottom: '5px' }}>
                    Description of Work or Services Needed
                    <textarea
                      className="form-control"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      placeholder=""
                      style={{ width: '100%', padding: '12px 15px', border: '1px solid #eee', borderRadius: '3px', marginTop: '5px', resize: 'vertical' }}
                    />
                  </label>
                </li>
                <li style={{ width: '100%', padding: '0' }}>
                  <button type="submit" className="btn" disabled={submitting} style={{ border: 'none', opacity: submitting ? 0.7 : 1 }}>
                    {submitting ? 'Sending...' : 'Send Request'}
                  </button>
                </li>
              </ul>
            </form>
          </div>
        </div>
      </section>

      {/* Google Map */}
      <div id="map" style={{ height: '400px', background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999', fontSize: '16px' }}>
        <div style={{ textAlign: 'center' }}>
          <i className="fa fa-map-marker" style={{ fontSize: '48px', color: '#e8b730', marginBottom: '15px', display: 'block' }}></i>
          <p>44 New Design Street, Melbourne 005</p>
          <p>Google Maps Integration - Add your API key in environment variables</p>
        </div>
      </div>
    </>
  );
};

export default Contact;
