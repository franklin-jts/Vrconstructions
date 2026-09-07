import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EMAILJS_CONFIG } from '../config/email';


gsap.registerPlugin(ScrollTrigger);

const services = [
  { id: 'construction', title: 'Construction', icon: 'fa-building', desc: 'Residential, commercial, and warehouse builds from foundation to finish.' },
  { id: 'renovation', title: 'Renovation', icon: 'fa-refresh', desc: 'Complete home renovation and remodeling services.' },
  { id: 'interior', title: 'Interior Work', icon: 'fa-home', desc: 'Kitchens, wardrobes, TV cabinets, wall paneling.' },
  { id: 'painting', title: 'Painting', icon: 'fa-paint-brush', desc: 'Interior, exterior, texture, and waterproof coatings.' },
];

const allServiceNames = [
  'Construction', 'Renovation', 'Electrical', 'Plumbing', 'Tiles Laying',
  'Carpentry', 'Fabrication', 'False Ceiling', 'Painting', 'Interior Work', 'Waterproofing',
];

const counters = [
  { icon: 'fa-building-o', count: 250, suffix: '+', label: 'Projects Completed' },
  { icon: 'fa-calendar', count: 15, suffix: '+', label: 'Years Experience' },
  { icon: 'fa-users', count: 180, suffix: '+', label: 'Happy Clients' },
  { icon: 'fa-map-marker', count: 12, suffix: '', label: 'Cities Covered' },
];

const Home: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', service: '', description: '' });

  const pageRef = useRef<HTMLDivElement>(null);

  // Scroll progress + building progress
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollTop = window.scrollY;
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          const rawPct = docHeight > 0 ? scrollTop / docHeight : 0;
          setScrollProgress(rawPct);

          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // GSAP section reveals + animations
  useEffect(() => {
    if (!pageRef.current) return;
    const ctx = gsap.context(() => {
      // Reveal animations — sections fade in from bottom
      pageRef.current!.querySelectorAll('.gsap-reveal').forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 50 },
          {
            opacity: 1, y: 0, duration: 0.4, ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 92%', toggleActions: 'play none none none' },
          }
        );
      });

      // Zigzag service rows — one by one with icon first, then text
      const zigzagContainer = document.getElementById('services-zigzag');
      if (zigzagContainer) {
        const rows = zigzagContainer.querySelectorAll('.service-zigzag-row');
        ScrollTrigger.create({
          trigger: zigzagContainer,
          start: 'top 88%',
          onEnter: () => {
            rows.forEach((row, i) => {
              setTimeout(() => {
                row.classList.add('visible');
              }, i * 300);
            });
          },
          once: true,
        });
      }

      // Stagger animations — CSS-driven slide-in with delays
      pageRef.current!.querySelectorAll('.gsap-stagger').forEach((group) => {
        ScrollTrigger.create({
          trigger: group,
          start: 'top 90%',
          onEnter: () => {
            Array.from(group.children).forEach((child, i) => {
              setTimeout(() => {
                child.classList.add('gsap-animated');
              }, i * 100);
            });
          },
          once: true,
        });
      });

      // Stats counter animation — numbers count up
      pageRef.current!.querySelectorAll('.stat-number').forEach((el) => {
        const target = parseInt(el.getAttribute('data-target') || '0');
        const suffix = el.getAttribute('data-suffix') || '';
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' },
          onUpdate: () => { el.textContent = Math.round(obj.val) + suffix; },
        });
      });

      // Contact cards — staggered slide-in from left
      pageRef.current!.querySelectorAll('.contact-cards-row').forEach((row) => {
        ScrollTrigger.create({
          trigger: row,
          start: 'top 90%',
          onEnter: () => {
            Array.from(row.children).forEach((child, i) => {
              setTimeout(() => {
                child.classList.add('gsap-animated');
              }, i * 120);
            });
          },
          once: true,
        });
      });

      // CTA section — scale up reveal
      pageRef.current!.querySelectorAll('.cta-section').forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, scale: 0.98 },
          {
            opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' },
          }
        );
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitting(true); setFormError('');
    try {
      await emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.serviceRequestTemplate,
        { ...formData, date: new Date().toLocaleDateString() },
        { publicKey: EMAILJS_CONFIG.publicKey });
      setFormSuccess(true);
      setFormData({ name: '', email: '', phone: '', service: '', description: '' });
      setTimeout(() => setFormSuccess(false), 5000);
    } catch { setFormError('Failed. Please call us directly.'); }
    finally { setFormSubmitting(false); }
  };

  return (
    <>
      {/* SCROLL PROGRESS */}
      <div className="scroll-progress-bar">
        <div className="scroll-progress-fill" style={{ width: `${scrollProgress * 100}%` }} />
      </div>

      {/* VIDEO HERO */}
      <section className="video-hero-wrapper">
        <video
          className="video-hero-bg"
          autoPlay
          muted
          loop
          playsInline
          poster="/images/slide-1.jpg"
        >
          <source src="/videos/construction-bg.mp4" type="video/mp4" />
        </video>
        <div className="video-hero-overlay" />
        <div className="video-hero-content">
          <span className="hero-tag">★ TRUSTED SINCE 2010</span>
          <h1 className="hero-title">
            Building The <span className="text-accent">Future</span>,<br />One Structure at a Time
          </h1>
          <p className="hero-desc">
            Professional construction, renovation, and interior services.
            From blueprint to handover — precision engineering at every phase.
          </p>
          <div className="hero-cta">
            <Link to="/contact" className="btn btn-primary">Get Free Quote</Link>
            <Link to="/services" className="btn btn-outline">Our Services</Link>
          </div>
          <div className="hero-trust">
            <div className="trust-item"><i className="fa fa-shield"></i><span>Licensed & Insured</span></div>
            <div className="trust-item"><i className="fa fa-clock-o"></i><span>24/7 Support</span></div>
            <div className="trust-item"><i className="fa fa-star"></i><span>5-Star Rated</span></div>
          </div>
        </div>
        <div className="video-scroll-hint">
          <span>Scroll Down</span>
          <i className="fa fa-chevron-down"></i>
        </div>
      </section>

      {/* CAUTION STRIPE */}
      <div className="caution-stripe" />

      {/* PAGE CONTENT */}
      <div ref={pageRef} className="page-content">

        {/* STATS */}
        <section className="stats-section">
          <div className="container">
            <div className="stats-grid gsap-stagger">
              {counters.map((c, idx) => (
                <div key={idx} className="stat-item">
                  <div className="stat-icon"><i className={`fa ${c.icon}`}></i></div>
                  <div className="stat-number" data-target={c.count} data-suffix={c.suffix}>0{c.suffix}</div>
                  <div className="stat-label">{c.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section className="section-white">
          <div className="container">
            <div className="section-header">
              <span className="section-tag">What We Do</span>
              <h2>Our Services</h2>
              <div className="section-line" />
            </div>
            <div className="services-zigzag" id="services-zigzag">
              {services.map((s, idx) => (
                <div key={s.id} className={`service-zigzag-row ${idx % 2 !== 0 ? 'reverse' : ''}`}>
                  <div className="service-zigzag-icon">
                    <div className="service-card-icon"><i className={`fa ${s.icon}`}></i></div>
                    <h5>{s.title}</h5>
                  </div>
                  <div className="service-zigzag-info">
                    <p>{s.desc}</p>
                    <Link to="/services" className="service-link">Learn More <i className="fa fa-arrow-right"></i></Link>
                  </div>
                </div>
              ))}
            </div>
            <div className="gsap-reveal" style={{ textAlign: 'center', marginTop: '50px' }}>
              <Link to="/services" className="btn btn-primary">View All 11 Services</Link>
            </div>
          </div>
        </section>

        {/* PARTNERS */}
        <section className="partners-section">
          <div className="container">
            <div className="section-header gsap-reveal">
              <span className="section-tag">Trusted By</span>
              <h2>Our Partners</h2>
              <div className="section-line" />
            </div>
            <div className="partners-grid gsap-stagger">
              {[1, 2, 3, 4, 5].map((num) => (
                <div key={num} className="partner-item">
                  <img src={`/images/parthner-img-${num}.png`} alt="Partner" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="cta-section">
          <div className="cta-bg" />
          <div className="cta-overlay" />
          <div className="container cta-content gsap-reveal">
            <h2>Ready to Build Your Dream?</h2>
            <p>Let's turn your vision into reality. Contact us for a free consultation.</p>
            <div className="cta-buttons">
              <Link to="/contact" className="btn btn-primary">Get Free Quote</Link>
              <a href="tel:+61123456789" className="btn btn-outline"><i className="fa fa-phone"></i> +61 (123) 456 789</a>
            </div>
          </div>
        </section>

        {/* REQUEST FORM */}
        <section className="section-light">
          <div className="container">
            <div className="section-header gsap-reveal">
              <span className="section-tag">Contact Us</span>
              <h2>Request Service or Estimate</h2>
              <div className="section-line" />
              <p>Feel free to call us or complete the form below.</p>
            </div>

            <div className="contact-cards-row gsap-stagger">
              {[
                { icon: 'fa-phone', title: 'Call Us 24/7', detail: '+61 (123) 456 789', sub: 'Emergency Service Available' },
                { icon: 'fa-map-marker', title: 'Contact Address', detail: '44 New Design Street, Melbourne 005', sub: 'info@vrconstruction.com' },
                { icon: 'fa-envelope', title: 'Email Us', detail: 'info@vrconstruction.com', sub: 'Quick Response Within 24 Hours' },
              ].map((item, idx) => (
                <div key={idx} className="contact-card-dark">
                  <i className={`fa ${item.icon}`}></i>
                  <h6>{item.title}</h6>
                  <div className="contact-card-line" />
                  <h4>{item.detail}</h4>
                  <p>{item.sub}</p>
                </div>
              ))}
            </div>

            <div className="request-form-wrap gsap-reveal">
              {formSuccess && <div className="form-success-msg"><i className="fa fa-paper-plane-o"></i>Thank You. Your Message Has Been Submitted</div>}
              {formError && <div className="form-error-msg"><i className="fa fa-exclamation-circle"></i>{formError}</div>}
              <form onSubmit={handleFormSubmit}>
                <div className="form-row">
                  <div>
                    <label>Name *</label>
                    <input type="text" name="name" value={formData.name} onChange={handleFormChange} required />
                  </div>
                  <div>
                    <label>Email *</label>
                    <input type="email" name="email" value={formData.email} onChange={handleFormChange} required />
                  </div>
                </div>
                <div className="form-row">
                  <div>
                    <label>Phone *</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleFormChange} required />
                  </div>
                  <div>
                    <label>Select Service</label>
                    <select name="service" value={formData.service} onChange={handleFormChange} required>
                      <option value="" disabled>Choose a service *</option>
                      {allServiceNames.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label>Description of Work Needed</label>
                  <textarea name="description" rows={5} value={formData.description} onChange={handleFormChange} />
                </div>
                <button type="submit" className="btn btn-primary btn-full" disabled={formSubmitting}>
                  {formSubmitting ? 'Sending...' : 'Send Request'}
                </button>
              </form>
            </div>
          </div>
        </section>



      </div>
    </>
  );
};

export default Home;
