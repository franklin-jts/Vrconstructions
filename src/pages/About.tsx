import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const pageRef = useRef<HTMLDivElement>(null);

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
          opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out',
          scrollTrigger: { trigger: group, start: 'top 82%', toggleActions: 'play none none none' },
        }
      );
    });
    return () => { ScrollTrigger.getAll().forEach((t) => t.kill()); };
  }, []);

  const stats = [
    { icon: 'fa-building', num: '250+', label: 'Projects Completed' },
    { icon: 'fa-calendar', num: '15+', label: 'Years Experience' },
    { icon: 'fa-users', num: '180+', label: 'Happy Clients' },
    { icon: 'fa-map-marker', num: '12', label: 'Cities Covered' },
  ];

  const features = [
    { icon: 'fa-shield', title: 'Licensed & Insured', desc: 'Fully certified team with comprehensive insurance coverage for your peace of mind.' },
    { icon: 'fa-clock-o', title: '24/7 Availability', desc: 'Round the clock emergency service for urgent construction and repair needs.' },
    { icon: 'fa-usd', title: 'Transparent Pricing', desc: 'No hidden fees. Get detailed estimates with competitive rates upfront.' },
    { icon: 'fa-star', title: '5-Star Rated', desc: 'Consistently rated 5 stars by our clients for quality and professionalism.' },
  ];

  const teamMembers = [
    { name: 'Rajesh Kumar', role: 'Founder & CEO', img: 'team-1.jpg', desc: '20+ years in construction leadership.' },
    { name: 'Priya Sharma', role: 'Project Manager', img: 'team-2.jpg', desc: 'Expert in large-scale project coordination.' },
    { name: 'Amit Patel', role: 'Lead Architect', img: 'team-3.jpg', desc: 'Award-winning sustainable design specialist.' },
    { name: 'Deepak Singh', role: 'Site Supervisor', img: 'team-4.jpg', desc: 'Hands-on quality control at every stage.' },
  ];

  const faqItems = [
    { q: 'How long does a typical construction project take?', a: 'Timeline varies by scope. Residential projects take 3-6 months, commercial 6-12 months. We provide a detailed schedule during planning.' },
    { q: 'Do you handle permits and approvals?', a: 'Yes. We manage all permits, inspections, and council approvals as part of our full-service approach.' },
    { q: 'What warranty do you provide?', a: 'We offer a 10-year structural warranty and 2-year workmanship warranty on all projects.' },
    { q: 'Can I customize my project mid-construction?', a: 'Absolutely. We offer flexible change order processes with transparent cost and timeline adjustments.' },
  ];

  return (
    <div ref={pageRef}>
      {/* Sub Banner */}
      <div className="sub-banner">
        <div className="container">
          <h1>About Us</h1>
          <p>Building Trust Since 2010 — 25 Years of Construction Excellence</p>
        </div>
        <ol className="breadcrumb">
          <li><Link to="/">Home</Link></li>
          <li className="active">About Us</li>
        </ol>
      </div>

      {/* Story Section */}
      <section className="about-story-section">
        <div className="container">
          <div className="about-story-grid">
            <div className="about-story-content gsap-reveal">
              <span className="section-tag">Who We Are</span>
              <h2>Building the Future with Precision & Passion</h2>
              <div className="section-line" style={{ margin: '15px 0' }} />
              <p>
                Founded in 2010, VR Construction has grown from a small family firm to one of the most
                trusted names in the construction industry. We specialize in residential, commercial,
                and industrial projects — delivering excellence from foundation to finish.
              </p>
              <p>
                Our team of 50+ skilled professionals combines traditional craftsmanship with modern
                technology. Every project we undertake reflects our commitment to quality, safety,
                and client satisfaction.
              </p>
              <div className="about-highlights">
                {features.map((f, i) => (
                  <div key={i} className="about-highlight-item">
                    <i className={`fa ${f.icon}`}></i>
                    <div>
                      <h6>{f.title}</h6>
                      <p>{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="about-story-images gsap-reveal">
              <div className="about-img-main">
                <img src="/images/about-img.jpg" alt="VR Construction Team" />
                <div className="about-experience-badge">
                  <span className="badge-num">15+</span>
                  <span className="badge-text">Years of Excellence</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="about-stats-section">
        <div className="container">
          <div className="about-stats-grid gsap-stagger">
            {stats.map((s, i) => (
              <div key={i} className="about-stat-card">
                <div className="about-stat-icon"><i className={`fa ${s.icon}`}></i></div>
                <h3>{s.num}</h3>
                <p>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="about-mission-section">
        <div className="container">
          <div className="about-mission-grid">
            <div className="about-mission-card gsap-reveal">
              <div className="about-mission-icon"><i className="fa fa-bullseye"></i></div>
              <h3>Our Mission</h3>
              <p>
                To deliver exceptional construction services that exceed client expectations through
                innovation, quality craftsmanship, and unwavering commitment to safety and sustainability.
              </p>
            </div>
            <div className="about-mission-card gsap-reveal">
              <div className="about-mission-icon"><i className="fa fa-eye"></i></div>
              <h3>Our Vision</h3>
              <p>
                To be the most trusted construction partner in the region, known for transforming
                visions into reality while setting new standards for excellence in the industry.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="about-team-section">
        <div className="container">
          <div className="section-header gsap-reveal">
            <span className="section-tag">Our Team</span>
            <h2>Meet the Experts</h2>
            <div className="section-line" />
          </div>
          <div className="about-team-grid gsap-stagger">
            {teamMembers.map((m, i) => (
              <div key={i} className="about-team-card">
                <div className="about-team-img">
                  <img src={`/images/${m.img}`} alt={m.name} />
                  <div className="about-team-overlay">
                    <ul className="about-team-social">
                      <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                      <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                      <li><a href="#"><i className="fa fa-linkedin"></i></a></li>
                    </ul>
                  </div>
                </div>
                <div className="about-team-info">
                  <h5>{m.name}</h5>
                  <span>{m.role}</span>
                  <p>{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="about-faq-section">
        <div className="container">
          <div className="about-faq-grid">
            <div className="about-faq-content gsap-reveal">
              <span className="section-tag">FAQ</span>
              <h2>Frequently Asked Questions</h2>
              <div className="section-line" style={{ margin: '15px 0' }} />
              <p>Have questions? We have answers. If you don't find what you're looking for, feel free to contact us directly.</p>
              <Link to="/contact" className="btn btn-primary" style={{ marginTop: '20px' }}>Contact Us</Link>
            </div>
            <div className="about-faq-list gsap-reveal">
              {faqItems.map((item, i) => (
                <div key={i} className={`about-faq-item ${openFaq === i ? 'active' : ''}`}>
                  <button className="about-faq-question" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                    <span>{item.q}</span>
                    <i className={`fa fa-chevron-${openFaq === i ? 'up' : 'down'}`}></i>
                  </button>
                  <div className="about-faq-answer">
                    <p>{item.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta-section">
        <div className="container">
          <div className="about-cta-content gsap-reveal">
            <h2>Ready to Start Your Project?</h2>
            <p>Let's discuss your vision and bring it to life with our expert team.</p>
            <div className="about-cta-buttons">
              <Link to="/contact" className="btn btn-primary">Get Free Quote</Link>
              <a href="tel:+61123456789" className="btn btn-outline"><i className="fa fa-phone"></i> +61 (123) 456 789</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
