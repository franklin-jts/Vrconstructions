import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ConstructionScene from '../components/ConstructionScene';
import { EMAILJS_CONFIG } from '../config/email';

gsap.registerPlugin(ScrollTrigger);

const services = [
  { id: 'construction', title: 'Construction', icon: 'fa-building', desc: 'Residential, commercial, and warehouse builds from foundation to finish.' },
  { id: 'renovation', title: 'Renovation', icon: 'fa-refresh', desc: 'Complete home renovation and remodeling services.' },
  { id: 'electrical', title: 'Electrical', icon: 'fa-bolt', desc: 'Wiring, panel installation, lighting, and safety inspections.' },
  { id: 'plumbing', title: 'Plumbing', icon: 'fa-tint', desc: 'Pipe installation, bathroom, kitchen, and water line services.' },
  { id: 'tiles', title: 'Tiles Laying', icon: 'fa-th-large', desc: 'Marble, granite, ceramic — wall and floor tiling.' },
  { id: 'carpentry', title: 'Carpentry', icon: 'fa-tree', desc: 'Custom woodwork, doors, windows, framing, and finishing.' },
  { id: 'fabrication', title: 'Fabrication', icon: 'fa-wrench', desc: 'M.S, S.S, aluminum, and custom metal fabrication.' },
  { id: 'falseceiling', title: 'False Ceiling', icon: 'fa-server', desc: 'Gypsum, POP, grid, and decorative ceiling systems.' },
  { id: 'painting', title: 'Painting', icon: 'fa-paint-brush', desc: 'Interior, exterior, texture, and waterproof coatings.' },
  { id: 'interior', title: 'Interior Work', icon: 'fa-home', desc: 'Kitchens, wardrobes, TV cabinets, wall paneling.' },
  { id: 'waterproofing', title: 'Waterproofing', icon: 'fa-shield', desc: 'Roof, basement, bathroom, and terrace waterproofing.' },
];

const galleryItems = [
  { img: 'gallery-img-1.jpg', category: 'residential', title: 'Modern Villa Construction' },
  { img: 'gallery-img-2.jpg', category: 'commercial', title: 'Commercial Complex' },
  { img: 'gallery-img-3.jpg', category: 'infrastructure', title: 'Bridge Infrastructure' },
  { img: 'gallery-img-4.jpg', category: 'industrial', title: 'Industrial Facility' },
  { img: 'gallery-img-5.jpg', category: 'renovation', title: 'Interior Renovation' },
  { img: 'gallery-img-2.jpg', category: 'infrastructure', title: 'Road Construction' },
];

const counters = [
  { icon: 'fa-building-o', count: 250, suffix: '+', label: 'Projects Completed' },
  { icon: 'fa-calendar', count: 15, suffix: '+', label: 'Years Experience' },
  { icon: 'fa-users', count: 180, suffix: '+', label: 'Happy Clients' },
  { icon: 'fa-map-marker', count: 12, suffix: '', label: 'Cities Covered' },
];

const processSteps = [
  { num: '01', icon: 'fa-pencil-square-o', title: 'Planning', desc: 'Site survey, blueprints, 3D models, permits.' },
  { num: '02', icon: 'fa-pencil', title: 'Design', desc: 'Architectural design, material selection, budgeting.' },
  { num: '03', icon: 'fa-building', title: 'Build', desc: 'Foundation, structure, MEP, and finishing.' },
  { num: '04', icon: 'fa-check-circle', title: 'Handover', desc: 'Quality inspection, documentation, keys delivered.' },
];

const testimonials = [
  { name: 'John Smith', role: 'Home Owner', avatar: 'avatar-1.jpg', text: 'VR Construction delivered exceptional quality on our home renovation. Their attention to detail exceeded our expectations.' },
  { name: 'Sarah Johnson', role: 'Business Owner', avatar: 'avatar-2.jpg', text: 'Outstanding commercial work! Professional team, on time, within budget. Highly recommended.' },
  { name: 'Michael Brown', role: 'Property Developer', avatar: 'avatar-3.jpg', text: 'Unmatched expertise in civil engineering and project management. A true pleasure to work with.' },
];

const serviceOptions = services.map((s) => s.title);

const Home: React.FC = () => {
  const [heroProgress, setHeroProgress] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', service: '', description: '' });
  const [galleryFilter, setGalleryFilter] = useState('all');

  const heroRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);

  // GSAP ScrollTrigger — building assembly linked to scroll
  useEffect(() => {
    if (!pageRef.current) return;

    // Hero scroll progress → building floors
    ScrollTrigger.create({
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 0.5,
      onUpdate: (self) => {
        setHeroProgress(self.progress);
      },
    });

    // Section reveals
    const reveals = pageRef.current.querySelectorAll('.gsap-reveal');
    reveals.forEach((el) => {
      gsap.fromTo(el,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            end: 'top 50%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    // Staggered card reveals
    const cardGroups = pageRef.current.querySelectorAll('.gsap-stagger');
    cardGroups.forEach((group) => {
      const cards = group.children;
      gsap.fromTo(cards,
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: group,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    // Parallax sections
    const parallaxEls = pageRef.current.querySelectorAll('[data-parallax]');
    parallaxEls.forEach((el) => {
      const speed = parseFloat((el as HTMLElement).dataset.parallax || '0.2');
      gsap.to(el, {
        y: -100 * speed,
        ease: 'none',
        scrollTrigger: {
          trigger: el.parentElement,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    });

    // Process timeline — truck driving
    const truck = pageRef.current.querySelector('#process-truck');
    if (truck) {
      gsap.to(truck, {
        x: 300,
        ease: 'none',
        scrollTrigger: {
          trigger: '.process-timeline',
          start: 'top 70%',
          end: 'bottom 30%',
          scrub: true,
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitting(true);
    setFormError('');
    try {
      await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.serviceRequestTemplate,
        { ...formData, date: new Date().toLocaleDateString() },
        { publicKey: EMAILJS_CONFIG.publicKey },
      );
      setFormSuccess(true);
      setFormData({ name: '', email: '', phone: '', service: '', description: '' });
      setTimeout(() => setFormSuccess(false), 5000);
    } catch {
      setFormError('Failed to send. Please call us directly.');
    } finally {
      setFormSubmitting(false);
    }
  };

  const filteredGallery = galleryFilter === 'all'
    ? galleryItems
    : galleryItems.filter((g) => g.category === galleryFilter);

  return (
    <div ref={pageRef}>
      {/* ===== SCROLL PROGRESS ===== */}
      <div className="scroll-progress-bar">
        <div className="scroll-progress-fill" style={{ width: `${heroProgress * 100}%` }} />
      </div>

      {/* ===== HERO ===== */}
      <section id="hero" ref={heroRef} className="hero-section">
        <div className="hero-bg-pattern" data-parallax="0.1" />
        <div className="hero-content">
          <div className="hero-text gsap-reveal">
            <span className="hero-tag">★ TRUSTED SINCE 2010</span>
            <h1 className="hero-title">
              Building The <span className="text-accent">Future</span>,<br />
              One Structure at a Time
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
              <div className="trust-item">
                <i className="fa fa-shield"></i>
                <span>Licensed & Insured</span>
              </div>
              <div className="trust-item">
                <i className="fa fa-clock-o"></i>
                <span>24/7 Support</span>
              </div>
              <div className="trust-item">
                <i className="fa fa-star"></i>
                <span>5-Star Rated</span>
              </div>
            </div>
          </div>
          <div className="hero-scene">
            <ConstructionScene progress={heroProgress} />
          </div>
        </div>
        <div className="hero-scroll-indicator">
          <span>Scroll to Build</span>
          <div className="scroll-arrow">
            <i className="fa fa-chevron-down"></i>
          </div>
        </div>
      </section>

      {/* ===== CAUTION STRIPE ===== */}
      <div className="caution-stripe" />

      {/* ===== STATS BAR ===== */}
      <section className="stats-bar">
        <div className="container">
          <div className="stats-grid gsap-stagger">
            {counters.map((c, idx) => (
              <div key={idx} className="stat-item">
                <div className="stat-icon">
                  <i className={`fa ${c.icon}`}></i>
                </div>
                <div className="stat-number" data-count={c.count} data-suffix={c.suffix}>
                  0
                </div>
                <div className="stat-label">{c.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section className="section services-section">
        <div className="container">
          <div className="section-header gsap-reveal">
            <span className="section-tag">What We Do</span>
            <h2>Our Services</h2>
            <div className="section-line" />
          </div>
          <div className="services-grid gsap-stagger">
            {services.slice(0, 8).map((s) => (
              <div key={s.id} className="service-card-dark">
                <div className="service-card-icon">
                  <i className={`fa ${s.icon}`}></i>
                </div>
                <h5>{s.title}</h5>
                <p>{s.desc}</p>
                <Link to="/services" className="service-link">
                  Learn More <i className="fa fa-arrow-right"></i>
                </Link>
              </div>
            ))}
          </div>
          <div className="gsap-reveal" style={{ textAlign: 'center', marginTop: '50px' }}>
            <Link to="/services" className="btn btn-primary">View All Services</Link>
          </div>
        </div>
      </section>

      {/* ===== REQUEST FORM ===== */}
      <section className="section request-section">
        <div className="request-bg-pattern" />
        <div className="container">
          <div className="request-grid">
            <div className="request-info gsap-reveal">
              <span className="section-tag">Get Started</span>
              <h2>Request a Free Consultation</h2>
              <p>Tell us about your project and we'll get back to you within 24 hours with a detailed plan and estimate.</p>
              <div className="request-features">
                {[
                  { icon: 'fa-check-circle', text: 'Free site inspection & estimate' },
                  { icon: 'fa-check-circle', text: 'Custom project planning' },
                  { icon: 'fa-check-circle', text: 'Transparent pricing, no hidden costs' },
                  { icon: 'fa-check-circle', text: 'Licensed & insured team' },
                ].map((f, i) => (
                  <div key={i} className="request-feature">
                    <i className={`fa ${f.icon}`}></i>
                    <span>{f.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="request-form-wrap gsap-reveal">
              {formSuccess && (
                <div className="form-success-msg">
                  <i className="fa fa-check-circle"></i>
                  Thank you! We'll contact you soon.
                </div>
              )}
              {formError && (
                <div className="form-error-msg">
                  <i className="fa fa-exclamation-circle"></i>
                  {formError}
                </div>
              )}
              <form onSubmit={handleFormSubmit}>
                <div className="form-row">
                  <input type="text" name="name" placeholder="Your Name *" value={formData.name} onChange={handleFormChange} required />
                  <input type="email" name="email" placeholder="Email *" value={formData.email} onChange={handleFormChange} required />
                </div>
                <div className="form-row">
                  <input type="tel" name="phone" placeholder="Phone" value={formData.phone} onChange={handleFormChange} />
                  <select name="service" value={formData.service} onChange={handleFormChange} required>
                    <option value="" disabled>Select Service *</option>
                    {serviceOptions.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <textarea name="description" rows={4} placeholder="Describe your project..." value={formData.description} onChange={handleFormChange} />
                <button type="submit" className="btn btn-primary btn-full" disabled={formSubmitting}>
                  {formSubmitting ? 'Sending...' : 'Submit Request'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PROCESS TIMELINE ===== */}
      <section className="section process-section">
        <div className="container">
          <div className="section-header gsap-reveal">
            <span className="section-tag">How We Work</span>
            <h2>Our Process</h2>
            <div className="section-line" />
          </div>
          <div className="process-timeline">
            <div className="timeline-track">
              <div className="timeline-fill" />
              <div id="process-truck" className="timeline-truck">
                <svg viewBox="0 0 40 20" width="40" height="20">
                  <rect x="0" y="5" width="24" height="12" fill="#F5A623" rx="2" />
                  <rect x="24" y="8" width="14" height="9" fill="#D4912A" rx="1" />
                  <circle cx="10" cy="18" r="3" fill="#333" stroke="#555" strokeWidth="1" />
                  <circle cx="32" cy="18" r="3" fill="#333" stroke="#555" strokeWidth="1" />
                </svg>
              </div>
            </div>
            <div className="process-steps gsap-stagger">
              {processSteps.map((step, idx) => (
                <div key={idx} className="process-step">
                  <div className="step-num">{step.num}</div>
                  <div className="step-icon">
                    <i className={`fa ${step.icon}`}></i>
                  </div>
                  <h5>{step.title}</h5>
                  <p>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== GALLERY ===== */}
      <section className="section gallery-section">
        <div className="container">
          <div className="section-header gsap-reveal">
            <span className="section-tag">Our Work</span>
            <h2>Project Gallery</h2>
            <div className="section-line" />
          </div>
          <div className="gallery-filters gsap-reveal">
            {['all', 'residential', 'commercial', 'infrastructure', 'renovation'].map((f) => (
              <button
                key={f}
                className={`filter-btn ${galleryFilter === f ? 'active' : ''}`}
                onClick={() => setGalleryFilter(f)}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
          <div className="gallery-grid gsap-stagger">
            {filteredGallery.map((item, idx) => (
              <div key={idx} className="gallery-item-dark">
                <img src={`/images/${item.img}`} alt={item.title} />
                <div className="gallery-overlay">
                  <div className="gallery-overlay-content">
                    <span className="gallery-cat">{item.category}</span>
                    <h5>{item.title}</h5>
                    <Link to="/gallery" className="gallery-link">
                      <i className="fa fa-expand"></i>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="section testimonials-section">
        <div className="testimonials-bg" data-parallax="0.15" />
        <div className="container">
          <div className="section-header gsap-reveal">
            <span className="section-tag">Testimonials</span>
            <h2>What Clients Say</h2>
            <div className="section-line" />
          </div>
          <div className="testimonial-carousel">
            {testimonials.map((t, idx) => (
              <div key={idx} className={`testimonial-card ${idx === activeTestimonial ? 'active' : ''}`}>
                <div className="testimonial-quote">
                  <i className="fa fa-quote-left"></i>
                </div>
                <p>{t.text}</p>
                <div className="testimonial-author">
                  <img src={`/images/${t.avatar}`} alt={t.name} />
                  <div>
                    <h6>{t.name}</h6>
                    <span>{t.role}</span>
                  </div>
                </div>
                <div className="testimonial-stars">
                  {[1, 2, 3, 4, 5].map((s) => <i key={s} className="fa fa-star"></i>)}
                </div>
              </div>
            ))}
            <div className="testimonial-dots">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  className={`dot ${idx === activeTestimonial ? 'active' : ''}`}
                  onClick={() => setActiveTestimonial(idx)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="section cta-section">
        <div className="cta-bg" data-parallax="0.2" />
        <div className="cta-overlay" />
        <div className="container cta-content gsap-reveal">
          <h2>Ready to Build Your Dream?</h2>
          <p>Let's turn your vision into reality. Contact us for a free consultation.</p>
          <div className="cta-buttons">
            <Link to="/contact" className="btn btn-primary">Get Free Quote</Link>
            <a href="tel:+61123456789" className="btn btn-outline">
              <i className="fa fa-phone"></i> +61 (123) 456 789
            </a>
          </div>
        </div>
      </section>

      {/* ===== BLOG ===== */}
      <section className="section blog-section">
        <div className="container">
          <div className="section-header gsap-reveal">
            <span className="section-tag">Latest News</span>
            <h2>From Our Blog</h2>
            <div className="section-line" />
          </div>
          <div className="blog-grid gsap-stagger">
            {[
              { img: 'b-img-1.jpg', title: 'We Provide 24 Hours Service', date: 'Mar 23, 2025' },
              { img: 'b-img-2.jpg', title: 'Quality Construction Materials', date: 'Mar 15, 2025' },
              { img: 'b-img-3.jpg', title: 'Modern Building Techniques', date: 'Mar 8, 2025' },
            ].map((post, idx) => (
              <div key={idx} className="blog-card-dark">
                <div className="blog-card-img">
                  <img src={`/images/${post.img}`} alt={post.title} />
                </div>
                <div className="blog-card-content">
                  <span><i className="fa fa-clock-o"></i> {post.date}</span>
                  <Link to="/blog">{post.title}</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PARTNERS ===== */}
      <section className="section partners-section">
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
    </div>
  );
};

export default Home;
