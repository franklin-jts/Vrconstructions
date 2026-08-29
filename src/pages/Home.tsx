import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { EMAILJS_CONFIG } from '../config/email';

const services = [
  { id: 'construction', title: 'Construction', icon: 'fa-building', items: ['Residential Construction', 'Commercial Building', 'Warehouse Construction'] },
  { id: 'renovation', title: 'Renovation', icon: 'fa-refresh', items: ['Home All Types of Renovation Work'] },
  { id: 'electrical', title: 'Electrical', icon: 'fa-bolt', items: ['Complete Electrical Wiring', 'Electrical Panel Installation', 'Lighting Solutions', 'Safety Inspections'] },
  { id: 'plumbing', title: 'Plumbing', icon: 'fa-tint', items: ['Pipe Installation & Repair', 'Bathroom Plumbing', 'Kitchen Plumbing', 'Water Line Services'] },
  { id: 'tiles', title: 'Tiles Laying', icon: 'fa-th-large', items: ['Marble Tiles', 'Granite Tiles', 'Ceramic Tiles', 'Wall & Floor Tiling'] },
  { id: 'carpentry', title: 'Carpentry Works', icon: 'fa-tree', items: ['Custom Woodwork', 'Door & Window Installation', 'Framing & Structural Work', 'Wood Finishing'] },
  { id: 'fabrication', title: 'Fabrication', icon: 'fa-wrench', items: ['M.S Fabrication', 'S.S Fabrication', 'Aluminum Fabrication', 'Custom Metal Work'] },
  { id: 'falseceiling', title: 'False Ceiling', icon: 'fa-server', items: ['Gypsum Board Ceiling', 'POP Ceiling', 'Grid Ceiling', 'Decorative Ceiling'] },
  { id: 'painting', title: 'Painting', icon: 'fa-paint-brush', items: ['Interior Painting', 'Exterior Painting', 'Texture Painting', 'Waterproof Coating'] },
  { id: 'interior', title: 'Interior Work', icon: 'fa-home', items: ['Kitchen Interiors', 'Wardrobes & Lofts', 'TV Cabinet', 'Pooja Cabinet', 'Wall Paneling'] },
  { id: 'waterproofing', title: 'Waterproofing', icon: 'fa-shield', items: ['Roof Waterproofing', 'Basement Waterproofing', 'Bathroom Waterproofing', 'Terrace Waterproofing'] },
];

const galleryItems = [
  { img: 'gallery-img-1.jpg', category: 'repair', title: 'Modern Villa Construction' },
  { img: 'gallery-img-2.jpg', category: 'installation', title: 'Commercial Complex' },
  { img: 'gallery-img-3.jpg', category: 'remod', title: 'Bridge Infrastructure' },
  { img: 'gallery-img-4.jpg', category: 'inspec', title: 'Industrial Facility' },
  { img: 'gallery-img-5.jpg', category: 'other', title: 'Interior Renovation' },
  { img: 'gallery-img-2.jpg', category: 'repair', title: 'Road Construction' },
  { img: 'gallery-img-1.jpg', category: 'installation', title: 'High Rise Building' },
  { img: 'gallery-img-3.jpg', category: 'remod', title: 'Warehouse Project' },
];

const counters = [
  { icon: 'fa-trophy', count: 250, suffix: '+', label: 'Projects Completed' },
  { icon: 'fa-users', count: 180, suffix: '+', label: 'Happy Clients' },
  { icon: 'fa-calendar-check-o', count: 15, suffix: '+', label: 'Years Experience' },
  { icon: 'fa-handshake-o', count: 50, suffix: '+', label: 'Expert Workers' },
];

const serviceOptions = services.map((s) => s.title);

const Home: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTab, setActiveTab] = useState(services[0].id);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    description: '',
  });
  const sectionRef = useScrollReveal('.reveal');

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
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: formData.service,
          description: formData.description,
          date: new Date().toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric',
            hour: '2-digit', minute: '2-digit',
          }),
        },
        { publicKey: EMAILJS_CONFIG.publicKey },
      );
      setFormSuccess(true);
      setFormData({ name: '', email: '', phone: '', service: '', description: '' });
      setTimeout(() => setFormSuccess(false), 5000);
    } catch (err) {
      console.error('Email send error:', err);
      setFormError('Failed to send request. Please try again or call us directly.');
    } finally {
      setFormSubmitting(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % 2);
        setIsTransitioning(false);
      }, 500);
    }, 6000);
    return () => clearInterval(interval);
  }, [currentSlide]);

  const handleSlideChange = (idx: number) => {
    if (idx === currentSlide) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide(idx);
      setIsTransitioning(false);
    }, 500);
  };

  return (
    <div ref={sectionRef}>
      {/* ======= BANNER ======= */}
      <div id="banner">
        <div className="flex-banner">
          <ul className="slides">
            {[0, 1].map((i) => (
              <li
                key={i}
                className={`banner-slide ${currentSlide === i ? 'active' : ''} ${currentSlide === i && isTransitioning ? 'entering' : ''}`}
              >
                <img src={`/images/slide-${i === 0 ? '1' : '2'}.jpg`} alt="VR Construction" />
                <div className="banner-up">
                  <div className="container">
                    <div className="row">
                      {i === 0 ? (
                        <>
                          <div className="col-5">
                            <div className="bnr-form banner-content" style={{ animationDelay: '0.3s' }}>
                              <h3>Quick Service Request</h3>
                              <h6>24 hours service available!</h6>

                              {formSuccess && (
                                <div className="form-success-msg">
                                  <i className="fa fa-check-circle"></i>
                                  Thank you! Your request has been submitted. We'll contact you soon.
                                </div>
                              )}

                              {formError && (
                                <div className="form-error-msg">
                                  <i className="fa fa-exclamation-circle"></i>
                                  {formError}
                                </div>
                              )}

                              <form role="form" onSubmit={handleFormSubmit}>
                                <ul className="row">
                                  <li style={{ width: '50%', padding: '0 7.5px' }}>
                                    <input type="text" name="name" placeholder="Your Name *" value={formData.name} onChange={handleFormChange} required />
                                  </li>
                                  <li style={{ width: '50%', padding: '0 7.5px' }}>
                                    <input type="email" name="email" placeholder="Email Address *" value={formData.email} onChange={handleFormChange} required />
                                  </li>
                                  <li style={{ width: '100%', padding: '0 7.5px' }}>
                                    <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleFormChange} />
                                  </li>
                                  <li style={{ width: '100%', padding: '0 7.5px' }}>
                                    <select name="service" value={formData.service} onChange={handleFormChange} required style={{ width: '100%', padding: '10px 15px', background: 'transparent', border: '1px solid #555', color: '#fff', fontFamily: "'Lato', sans-serif", fontSize: '13px', borderRadius: '3px', appearance: 'none' as const }}>
                                      <option value="" disabled style={{ color: '#333' }}>Select a Service *</option>
                                      {serviceOptions.map((s) => (
                                        <option key={s} value={s} style={{ color: '#333' }}>{s}</option>
                                      ))}
                                    </select>
                                  </li>
                                  <li style={{ width: '100%', padding: '0 7.5px' }}>
                                    <textarea name="description" rows={4} placeholder="Describe your project..." value={formData.description} onChange={handleFormChange}></textarea>
                                  </li>
                                  <li style={{ width: '100%', padding: '0 7.5px' }}>
                                    <button type="submit" className="btn" disabled={formSubmitting} style={{ width: '100%', border: 'none', opacity: formSubmitting ? 0.7 : 1 }}>
                                      {formSubmitting ? 'Submitting...' : 'SUBMIT REQUEST'}
                                    </button>
                                  </li>
                                </ul>
                              </form>
                            </div>
                          </div>
                          <div className="col-7" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                            <img className="img-responsive banner-image" src="/images/slide-img-1.png" alt="" style={{ maxWidth: '80%' }} />
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="col-5" style={{ display: 'flex', alignItems: 'center' }}>
                            <img className="img-responsive banner-image" src="/images/slide-img-2.png" alt="" />
                          </div>
                          <div className="col-7">
                            <div className="text-sec banner-content">
                              <section>
                                <h1>Just Call <span>+61 (123) 456 789</span></h1>
                              </section>
                              <section>
                                <h1>We Are Always Ready to Serve</h1>
                              </section>
                              <Link to="/contact" className="btn btn-1">Get Quote</Link>
                              <Link to="/about" className="btn">About Us</Link>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="slider-nav">
          {[0, 1].map((i) => (
            <button
              key={i}
              className={currentSlide === i ? 'active' : ''}
              onClick={() => handleSlideChange(i)}
            />
          ))}
        </div>
      </div>

      {/* ======= CINEMATIC COUNTERS ======= */}
      <section className="cinematic-counters">
        <div className="counters-parallax-bg" data-parallax="0.15"></div>
        <div className="container">
          <div className="counters-grid">
            {counters.map((c, idx) => (
              <div key={idx} className="counter-item reveal" data-reveal-group="counters" style={{ transitionDelay: `${idx * 0.12}s` }}>
                <div className="counter-icon">
                  <i className={`fa ${c.icon}`}></i>
                </div>
                <div className="counter-number" data-count={c.count} data-suffix={c.suffix}>0</div>
                <div className="counter-label">{c.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======= SERVICES - ANIMATED CARDS ======= */}
      <section className="services">
        <div className="container">
          <div className="tittle reveal">
            <h2>Our Services</h2>
            <p>Complete construction and renovation solutions for every need</p>
          </div>
          <div className="services-grid-animated">
            {services.slice(0, 6).map((service, idx) => (
              <div
                key={service.id}
                className="service-card reveal"
                data-reveal-group="services"
                style={{ transitionDelay: `${idx * 0.1}s` }}
              >
                <div className="service-icon">
                  <i className={`fa ${service.icon}`}></i>
                </div>
                <h5>{service.title}</h5>
                <ul>
                  {service.items.slice(0, 3).map((item, i) => (
                    <li key={i} style={{ transitionDelay: `${i * 0.05}s` }}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="reveal" style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link to="/services" className="btn">View All Services</Link>
          </div>
        </div>
      </section>

      {/* ======= WELCOME — CINEMATIC PARALLAX ======= */}
      <section className="welcome-cinematic">
        <div className="cinematic-bg" data-parallax="0.2">
          <img src="/images/welcome-img.jpg" alt="" />
          <div className="cinematic-overlay"></div>
        </div>
        <div className="container cinematic-welcome-content">
          <div className="welcome-text-block reveal">
            <span className="welcome-tag">Welcome to VR Construction</span>
            <h2>Building Dreams Into Reality</h2>
            <div className="welcome-divider"></div>
            <p>We bring over 15 years of expertise to every project. From residential homes to commercial complexes, our team delivers quality craftsmanship with precision and care.</p>
            <Link to="/about" className="btn">Discover More</Link>
          </div>
        </div>
      </section>

      {/* ======= OFFER SERVICES (TABS) ======= */}
      <section className="offer-services">
        <div className="container">
          <div className="tittle reveal">
            <h2>Our Construction Services</h2>
          </div>
          <div className="row">
            <div style={{ width: '25%', padding: '0 15px' }}>
              <div role="tabpanel">
                <ul className="nav nav-tabs" role="tablist">
                  {services.map((s) => (
                    <li
                      key={s.id}
                      role="presentation"
                      className={activeTab === s.id ? 'active' : ''}
                    >
                      <a
                        role="tab"
                        onClick={() => setActiveTab(s.id)}
                        style={{ cursor: 'pointer' }}
                      >
                        <i className={`fa ${s.icon}`}></i>
                        {s.title}
                        <i className="fa fa-long-arrow-right tab-arrow"></i>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div style={{ width: '75%', padding: '0 15px' }}>
              <div className="tab-content">
                {services.map((s) => (
                  <div
                    key={s.id}
                    role="tabpanel"
                    className={`tab-pane${activeTab === s.id ? ' active' : ''}`}
                  >
                    <div className="row">
                      <div style={{ width: '60%', padding: '0 15px' }}>
                        <div className="tab-pane-inner">
                          <h4>
                            <i className={`fa ${s.icon}`}></i>
                            {s.title}
                          </h4>
                          <p>Our experts have the state of the art tools, electronic equipment, and supplies to deliver any construction project in a timely manner.</p>
                          <ul>
                            {s.items.map((item, i) => (
                              <li key={i} style={{ transitionDelay: `${i * 0.06}s` }}>
                                <p><i className={`fa ${s.icon || 'fa-tint'}`}></i> {item}</p>
                              </li>
                            ))}
                          </ul>
                          <Link to="/services" className="btn">Learn More</Link>
                        </div>
                      </div>
                      <div style={{ width: '40%', padding: '0 15px' }}>
                        <img className="img-responsive img-up" src="/images/offer-img.jpg" alt={s.title} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======= WHY CHOOSE US ======= */}
      <section className="why-choose-cinematic">
        <div className="container">
          <div className="tittle reveal">
            <h2>Why Choose Us</h2>
            <p>What makes VR Construction stand out from the rest</p>
          </div>
          <div className="row why-grid">
            {[
              { icon: 'fa-shield', title: 'Trusted & Reliable', desc: 'Licensed and insured with a proven track record of successful projects across the region.' },
              { icon: 'fa-clock-o', title: 'On-Time Delivery', desc: 'We respect your deadlines. Our project management ensures every phase is completed on schedule.' },
              { icon: 'fa-certificate', title: 'Quality Assured', desc: 'Premium materials and skilled craftsmanship backed by our quality guarantee on all work.' },
              { icon: 'fa-headphones', title: '24/7 Support', desc: 'Round-the-clock customer service. Call us anytime — we are always ready to help.' },
            ].map((item, idx) => (
              <div key={idx} style={{ width: '25%', padding: '0 15px' }}>
                <div className="sec-in reveal" data-reveal-group="why" style={{ transitionDelay: `${idx * 0.12}s` }}>
                  <i className={`fa ${item.icon}`}></i>
                  <hr />
                  <h6>{item.title}</h6>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======= PARALLAX CTA ======= */}
      <section className="parallax-cta">
        <div className="parallax-cta-bg" data-parallax="0.25"></div>
        <div className="parallax-cta-overlay"></div>
        <div className="container parallax-cta-content">
          <div className="reveal">
            <h3>Need a Free Consultation?</h3>
            <h1>Let's Build Something Amazing Together</h1>
            <p>Call us now or fill out the form — we'll get back to you within 24 hours.</p>
            <div className="parallax-cta-buttons">
              <Link to="/contact" className="btn">Get Free Quote</Link>
              <a href="tel:+61123456789" className="btn btn-cta-phone">
                <i className="fa fa-phone"></i> +61 (123) 456 789
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ======= GALLERY ======= */}
      <section className="gallery">
        <div className="container">
          <div className="tittle reveal">
            <h2>Our Works Gallery</h2>
          </div>
        </div>
        <div className="gallery-slide">
          {galleryItems.map((item, idx) => (
            <div key={idx} className="gal-item reveal" data-reveal-group="gallery" style={{ transitionDelay: `${idx * 0.08}s` }}>
              <img src={`/images/${item.img}`} alt={item.title} />
              <div className="gallery-over">
                <Link to="/gallery" className="link-up link">
                  <i className="fa fa-long-arrow-right"></i>
                </Link>
                <div className="items-text">
                  <p>{item.category}</p>
                  <h5>{item.title}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ======= CLIENTS FEEDBACK ======= */}
      <section className="clients">
        <div className="container">
          <div className="tittle reveal">
            <h2>Feedback From Clients</h2>
          </div>
          <ul className="row">
            {[
              { name: 'John Smith', role: 'Home Owner', avatar: 'avatar-1.jpg', text: 'VR Construction delivered exceptional quality on our home renovation. Their attention to detail and professional approach exceeded our expectations.' },
              { name: 'Sarah Johnson', role: 'Business Owner', avatar: 'avatar-2.jpg', text: 'Outstanding commercial construction work! The team was professional, on time, and within budget. Highly recommended for any construction project.' },
              { name: 'Michael Brown', role: 'Property Developer', avatar: 'avatar-3.jpg', text: 'Working with VR Construction has been a pleasure. Their expertise in civil engineering and project management is unmatched in the industry.' },
            ].map((client, idx) => (
              <li key={idx} className="reveal" data-reveal-group="clients" style={{ flex: 1, transitionDelay: `${idx * 0.15}s` }}>
                <div className="avatar">
                  <img src={`/images/${client.avatar}`} alt={client.name} />
                </div>
                <div className="clients-in">
                  <p>{client.text}</p>
                  <h6>{client.name} - <span>{client.role}</span></h6>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ======= BLOG ======= */}
      <section className="blog">
        <div className="container">
          <div className="tittle reveal">
            <h2>News From Blog</h2>
          </div>
          <ul className="row">
            {[
              { img: 'b-img-1.jpg', title: 'We Provide 24 Hours Service' },
              { img: 'b-img-2.jpg', title: 'Quality Construction Materials' },
              { img: 'b-img-3.jpg', title: 'Modern Building Techniques' },
            ].map((post, idx) => (
              <li key={idx} className="reveal" data-reveal-group="blog" style={{ width: '33.333%', padding: '0 15px', transitionDelay: `${idx * 0.15}s` }}>
                <div className="b-inner">
                  <img className="img-responsive" src={`/images/${post.img}`} alt={post.title} />
                  <div className="b-details">
                    <span><i className="fa fa-clock-o"></i> Mar 23, 2025</span>
                    <Link to="/blog">{post.title}</Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ======= PARTNERS ======= */}
      <section className="parthner">
        <div className="container">
          <div className="tittle reveal">
            <h2>Partners / Clients</h2>
          </div>
          <div className="parthner-slide">
            {[1, 2, 3, 4, 5].map((num) => (
              <div key={num} className="part reveal" data-reveal-group="partners" style={{ transitionDelay: `${num * 0.1}s` }}>
                <a href="#"><img src={`/images/parthner-img-${num}.png`} alt="Partner" /></a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
