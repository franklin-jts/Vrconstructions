import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EMAILJS_CONFIG } from '../config/email';

gsap.registerPlugin(ScrollTrigger);

/* ===== DATA ===== */
const constructionServices = [
  { icon: 'fa-building', title: 'Residential', desc: 'Custom homes, apartments, and residential complexes built with precision.' },
  { icon: 'fa-briefcase', title: 'Commercial', desc: 'Office buildings, retail spaces, and commercial developments.' },
  { icon: 'fa-warehouse', title: 'Warehouse', desc: 'Industrial warehouses, storage facilities, and logistics centers.' },
];

const renovationServices = [
  { icon: 'fa-refresh', title: 'Home Renovation', desc: 'Complete home makeovers — kitchens, bathrooms, living spaces, and more.' },
  { icon: 'fa-cogs', title: 'Remodeling', desc: 'Structural changes, extensions, and complete space reconfiguration.' },
];

const specializedServices = [
  { icon: 'fa-bolt', title: 'Electrical', desc: 'Wiring, panel installation, lighting, and safety systems.' },
  { icon: 'fa-tint', title: 'Plumbing', desc: 'Pipe installation, drainage, bathroom and kitchen plumbing.' },
  { icon: 'fa-th-large', title: 'Tiles Laying', desc: 'Marble, granite, ceramic — floor and wall tiling.' },
  { icon: 'fa-tree', title: 'Carpentry', desc: 'Custom woodwork, doors, windows, framing, and finishing.' },
  { icon: 'fa-wrench', title: 'Fabrication', desc: 'M.S, S.S, aluminium — gates, railings, frames, staircases.' },
  { icon: 'fa-server', title: 'False Ceiling', desc: 'Gypsum, POP, grid systems, and decorative ceilings.' },
  { icon: 'fa-paint-brush', title: 'Painting', desc: 'Interior, exterior, texture, and waterproof coatings.' },
  { icon: 'fa-shield', title: 'Waterproofing', desc: 'Roof, basement, bathroom, and terrace waterproofing.' },
];

const interiorServices = [
  { icon: 'fa-cutlery', title: 'Kitchen', desc: 'Modern modular kitchens with cabinets, countertops, and appliances.' },
  { icon: 'fa-columns', title: 'Wall Units', desc: 'Custom wall-mounted storage and display units.' },
  { icon: 'fa-archive', title: 'Wardrobes & Tops', desc: 'Elegant wardrobes, loft storage, and countertop surfaces.' },
  { icon: 'fa-television', title: 'TV Cabinet', desc: 'Premium entertainment units and media consoles.' },
  { icon: 'fa-sun-o', title: 'Pooja Cabinet', desc: 'Traditional-modern prayer units with detailed woodwork.' },
  { icon: 'fa-bars', title: 'Wall Paneling', desc: 'Decorative panels that transform interiors into luxury spaces.' },
];

const galleryItems = [
  { img: 'gallery-img-1.jpg', category: 'residential', title: 'Modern Villa' },
  { img: 'gallery-img-2.jpg', category: 'commercial', title: 'Commercial Complex' },
  { img: 'gallery-img-3.jpg', category: 'infrastructure', title: 'Bridge Project' },
  { img: 'gallery-img-4.jpg', category: 'industrial', title: 'Industrial Facility' },
  { img: 'gallery-img-5.jpg', category: 'interior', title: 'Interior Renovation' },
  { img: 'gallery-img-2.jpg', category: 'residential', title: 'Luxury Apartment' },
];

const processSteps = [
  { num: '01', icon: 'fa-comments', title: 'Consultation', desc: 'We discuss your vision, requirements, and budget to understand your needs.' },
  { num: '02', icon: 'fa-pencil', title: 'Design', desc: 'Our architects create detailed plans and 3D visualizations for your project.' },
  { num: '03', icon: 'fa-cogs', title: 'Execution', desc: 'Expert craftsmen bring the design to life with precision and quality materials.' },
  { num: '04', icon: 'fa-key', title: 'Handover', desc: 'Final inspection, documentation, and keys delivered to your satisfaction.' },
];

const testimonials = [
  { name: 'Rajesh Mehta', role: 'Home Owner', text: 'VR Construction transformed our old house into a modern dream home. Their attention to detail and quality of work exceeded our expectations.' },
  { name: 'Priya Sharma', role: 'Business Owner', text: 'Outstanding commercial work! The team delivered on time and within budget. Highly recommended for any construction project.' },
  { name: 'Amit Patel', role: 'Property Developer', text: 'Unmatched expertise in project management. From foundation to finish, every phase was executed flawlessly.' },
];

const allServiceNames = [
  'Construction', 'Renovation', 'Electrical', 'Plumbing', 'Tiles Laying',
  'Carpentry', 'Fabrication', 'False Ceiling', 'Painting', 'Interior Work', 'Waterproofing',
];

/* ===== COMPONENT ===== */
const Home: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [galleryFilter, setGalleryFilter] = useState('all');
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', service: '', description: '' });

  const pageRef = useRef<HTMLDivElement>(null);

  // Scroll progress
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollTop = window.scrollY;
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          setScrollProgress(docHeight > 0 ? scrollTop / docHeight : 0);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // GSAP reveals
  useEffect(() => {
    if (!pageRef.current) return;
    const reveals = pageRef.current.querySelectorAll('.gsap-reveal');
    reveals.forEach((el) => {
      gsap.fromTo(el,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
        }
      );
    });
    const staggerGroups = pageRef.current.querySelectorAll('.gsap-stagger');
    staggerGroups.forEach((group) => {
      gsap.fromTo(group.children,
        { opacity: 0, y: 30, scale: 0.96 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.08, ease: 'power2.out',
          scrollTrigger: { trigger: group, start: 'top 82%', toggleActions: 'play none none none' },
        }
      );
    });
    return () => { ScrollTrigger.getAll().forEach((t) => t.kill()); };
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const iv = setInterval(() => setActiveTestimonial((p) => (p + 1) % testimonials.length), 5000);
    return () => clearInterval(iv);
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

  const filteredGallery = galleryFilter === 'all' ? galleryItems : galleryItems.filter((g) => g.category === galleryFilter);

  return (
    <div ref={pageRef} className="page-content">

      {/* ===== HERO ===== */}
      <section className="hero-section">
        <div className="hero-bg-image" style={{ backgroundImage: 'url(/images/slide-1.jpg)' }} />
        <div className="hero-overlay-dark" />
        <div className="container hero-inner">
          <div className="hero-text gsap-reveal">
            <span className="hero-tag">★ TRUSTED SINCE 2010</span>
            <h1 className="hero-title">
              Building & Renovating<br />Spaces <span className="text-accent">You'll Love</span>
            </h1>
            <p className="hero-desc">
              Professional construction, renovation, and interior services.
              From blueprint to handover — precision engineering at every phase.
            </p>
            <div className="hero-cta">
              <Link to="/contact" className="btn btn-primary">Get a Free Quote</Link>
              <Link to="/services" className="btn btn-outline-white">Our Services</Link>
            </div>
            <div className="hero-trust">
              <div className="trust-item"><i className="fa fa-shield"></i><span>Licensed & Insured</span></div>
              <div className="trust-item"><i className="fa fa-clock-o"></i><span>24/7 Support</span></div>
              <div className="trust-item"><i className="fa fa-star"></i><span>5-Star Rated</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATS BAR ===== */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid gsap-stagger">
            {[
              { icon: 'fa-building-o', count: '250+', label: 'Projects Completed' },
              { icon: 'fa-calendar', count: '15+', label: 'Years Experience' },
              { icon: 'fa-users', count: '180+', label: 'Happy Clients' },
              { icon: 'fa-map-marker', count: '12', label: 'Cities Covered' },
            ].map((c, idx) => (
              <div key={idx} className="stat-item">
                <div className="stat-icon"><i className={`fa ${c.icon}`}></i></div>
                <div className="stat-number">{c.count}</div>
                <div className="stat-label">{c.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ABOUT US ===== */}
      <section className="about-section">
        <div className="container">
          <div className="about-grid">
            <div className="about-content gsap-reveal">
              <span className="section-tag">About Us</span>
              <h2>Building Trust Since 2010</h2>
              <div className="section-line-left" />
              <p>
                VR Construction has grown from a small family firm to one of the most trusted names
                in the construction industry. We specialize in residential, commercial, and industrial
                projects — delivering excellence from foundation to finish.
              </p>
              <p>
                Our team of 50+ skilled professionals combines traditional craftsmanship with modern
                technology. Every project reflects our commitment to quality, safety, and client satisfaction.
              </p>
              <div className="about-features">
                {[
                  { icon: 'fa-check', text: 'Licensed & Insured Team' },
                  { icon: 'fa-check', text: 'Free Consultations & Estimates' },
                  { icon: 'fa-check', text: 'Transparent Pricing' },
                  { icon: 'fa-check', text: 'Quality Materials & Workmanship' },
                ].map((f, i) => (
                  <div key={i} className="about-feature"><i className={`fa ${f.icon}`}></i><span>{f.text}</span></div>
                ))}
              </div>
              <Link to="/about" className="btn btn-primary" style={{ marginTop: '25px' }}>Learn More About Us</Link>
            </div>
            <div className="about-images gsap-reveal">
              <div className="about-img-main">
                <img src="/images/about-img.jpg" alt="VR Construction Team" />
              </div>
              <div className="about-experience-badge">
                <span className="badge-num">15+</span>
                <span className="badge-text">Years of Excellence</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section className="services-section">
        <div className="container">
          <div className="section-header gsap-reveal">
            <span className="section-tag">What We Do</span>
            <h2>Our Services</h2>
            <div className="section-line" />
          </div>

          {/* Construction */}
          <div className="service-category gsap-reveal">
            <h3><i className="fa fa-building"></i> Construction</h3>
            <div className="services-grid gsap-stagger">
              {constructionServices.map((s, i) => (
                <div key={i} className="service-card">
                  <div className="service-card-icon"><i className={`fa ${s.icon}`}></i></div>
                  <h5>{s.title}</h5>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Renovation */}
          <div className="service-category gsap-reveal">
            <h3><i className="fa fa-refresh"></i> Renovation</h3>
            <div className="services-grid gsap-stagger">
              {renovationServices.map((s, i) => (
                <div key={i} className="service-card">
                  <div className="service-card-icon"><i className={`fa ${s.icon}`}></i></div>
                  <h5>{s.title}</h5>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Specialized Services */}
          <div className="service-category gsap-reveal">
            <h3><i className="fa fa-cogs"></i> Specialized Services</h3>
            <div className="services-grid four-col gsap-stagger">
              {specializedServices.map((s, i) => (
                <div key={i} className="service-card">
                  <div className="service-card-icon"><i className={`fa ${s.icon}`}></i></div>
                  <h5>{s.title}</h5>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="gsap-reveal" style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link to="/services" className="btn btn-primary">View All Services</Link>
          </div>
        </div>
      </section>

      {/* ===== INTERIOR WORKS ===== */}
      <section className="interior-section">
        <div className="container">
          <div className="section-header gsap-reveal">
            <span className="section-tag">Interior Design</span>
            <h2>Interior Works</h2>
            <div className="section-line" />
            <p>Transform your space with our premium interior design and installation services</p>
          </div>
          <div className="interior-grid gsap-stagger">
            {interiorServices.map((s, i) => (
              <div key={i} className="interior-card">
                <div className="interior-card-icon"><i className={`fa ${s.icon}`}></i></div>
                <h5>{s.title}</h5>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== GALLERY ===== */}
      <section className="gallery-section">
        <div className="container">
          <div className="section-header gsap-reveal">
            <span className="section-tag">Our Work</span>
            <h2>Portfolio</h2>
            <div className="section-line" />
          </div>
          <div className="gallery-filters gsap-reveal">
            {['all', 'residential', 'commercial', 'interior', 'industrial'].map((f) => (
              <button key={f} className={`filter-btn ${galleryFilter === f ? 'active' : ''}`} onClick={() => setGalleryFilter(f)}>
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
          <div className="gallery-grid gsap-stagger">
            {filteredGallery.map((item, idx) => (
              <div key={idx} className="gallery-item">
                <img src={`/images/${item.img}`} alt={item.title} />
                <div className="gallery-overlay">
                  <div className="gallery-overlay-content">
                    <span className="gallery-cat">{item.category}</span>
                    <h5>{item.title}</h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="gsap-reveal" style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link to="/gallery" className="btn btn-primary">View Full Gallery</Link>
          </div>
        </div>
      </section>

      {/* ===== PROCESS ===== */}
      <section className="process-section">
        <div className="container">
          <div className="section-header gsap-reveal">
            <span className="section-tag">How It Works</span>
            <h2>Our Process</h2>
            <div className="section-line" />
          </div>
          <div className="process-steps gsap-stagger">
            {processSteps.map((step, idx) => (
              <div key={idx} className="process-step">
                <div className="step-num">{step.num}</div>
                <div className="step-icon"><i className={`fa ${step.icon}`}></i></div>
                <h5>{step.title}</h5>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header gsap-reveal">
            <span className="section-tag">Testimonials</span>
            <h2>What Clients Say</h2>
            <div className="section-line" />
          </div>
          <div className="testimonial-carousel">
            {testimonials.map((t, idx) => (
              <div key={idx} className={`testimonial-card ${idx === activeTestimonial ? 'active' : ''}`}>
                <div className="testimonial-quote"><i className="fa fa-quote-left"></i></div>
                <p>{t.text}</p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar"><i className="fa fa-user"></i></div>
                  <div><h6>{t.name}</h6><span>{t.role}</span></div>
                </div>
                <div className="testimonial-stars">
                  {[1, 2, 3, 4, 5].map((s) => <i key={s} className="fa fa-star"></i>)}
                </div>
              </div>
            ))}
            <div className="testimonial-dots">
              {testimonials.map((_, idx) => (
                <button key={idx} className={`dot ${idx === activeTestimonial ? 'active' : ''}`} onClick={() => setActiveTestimonial(idx)} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="cta-section">
        <div className="cta-bg" style={{ backgroundImage: 'url(/images/slide-1.jpg)' }} />
        <div className="cta-overlay-dark" />
        <div className="container cta-content gsap-reveal">
          <h2>Ready to Build Your Dream?</h2>
          <p>Let's turn your vision into reality. Contact us for a free consultation.</p>
          <div className="cta-buttons">
            <Link to="/contact" className="btn btn-primary">Get a Free Quote</Link>
            <a href="tel:+61123456789" className="btn btn-outline-white"><i className="fa fa-phone"></i> +61 (123) 456 789</a>
          </div>
        </div>
      </section>

      {/* ===== CONTACT FORM ===== */}
      <section className="contact-form-section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info gsap-reveal">
              <span className="section-tag">Get In Touch</span>
              <h2>Request a Free Estimate</h2>
              <div className="section-line-left" />
              <p>Feel free to call us or complete the form. We'll get back to you within 24 hours.</p>

              <div className="contact-details">
                {[
                  { icon: 'fa-phone', label: 'Phone', value: '+61 (123) 456 789', href: 'tel:+61123456789' },
                  { icon: 'fa-envelope', label: 'Email', value: 'info@vrconstruction.com', href: 'mailto:info@vrconstruction.com' },
                  { icon: 'fa-map-marker', label: 'Address', value: '44 New Design Street, Melbourne 005' },
                  { icon: 'fa-clock-o', label: 'Hours', value: 'Mon–Sat: 8:00 AM – 6:00 PM' },
                ].map((item, i) => (
                  <div key={i} className="contact-detail-item">
                    <div className="contact-detail-icon"><i className={`fa ${item.icon}`}></i></div>
                    <div>
                      <span className="contact-detail-label">{item.label}</span>
                      {item.href ? (
                        <a href={item.href} className="contact-detail-value">{item.value}</a>
                      ) : (
                        <span className="contact-detail-value">{item.value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="contact-form-wrap gsap-reveal">
              {formSuccess && <div className="form-success-msg"><i className="fa fa-check-circle"></i>Thank You. We'll contact you soon.</div>}
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
                    <label>Service Type</label>
                    <select name="service" value={formData.service} onChange={handleFormChange} required>
                      <option value="" disabled>Select a service *</option>
                      {allServiceNames.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label>Project Description</label>
                  <textarea name="description" rows={5} value={formData.description} onChange={handleFormChange} />
                </div>
                <button type="submit" className="btn btn-primary btn-full" disabled={formSubmitting}>
                  {formSubmitting ? 'Sending...' : 'Send Request'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PARTNERS ===== */}
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
    </div>
  );
};

export default Home;
