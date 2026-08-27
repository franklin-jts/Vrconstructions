import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';

const services = [
  { id: 'construction', title: 'Construction', icon: 'fa-building', desc: 'We deliver end-to-end construction solutions from foundation to finishing for residential, commercial, and warehouse projects.', items: ['Residential Construction', 'Commercial Building', 'Warehouse Construction'] },
  { id: 'renovation', title: 'Renovation', icon: 'fa-refresh', desc: 'Transform your existing space with our comprehensive home renovation services — from minor upgrades to complete makeovers.', items: ['Home All Types of Renovation Work'] },
  { id: 'electrical', title: 'Electrical', icon: 'fa-bolt', desc: 'Safe and reliable electrical services by certified professionals for homes, offices, and commercial buildings.', items: ['Complete Electrical Wiring', 'Electrical Panel Installation', 'Lighting Solutions', 'Safety Inspections'] },
  { id: 'plumbing', title: 'Plumbing', icon: 'fa-tint', desc: 'Expert plumbing services for installation, repair, and maintenance across residential and commercial properties.', items: ['Pipe Installation & Repair', 'Bathroom Plumbing', 'Kitchen Plumbing', 'Water Line Services'] },
  { id: 'tiles', title: 'Tiles Laying', icon: 'fa-th-large', desc: 'Precision tile installation for floors and walls using marble, granite, ceramic, and porcelain tiles.', items: ['Marble Tiles', 'Granite Tiles', 'Ceramic Tiles', 'Wall & Floor Tiling'] },
  { id: 'carpentry', title: 'Carpentry Works', icon: 'fa-tree', desc: 'Skilled carpentry from custom furniture and cabinetry to structural framing and fine wood finishing.', items: ['Custom Woodwork', 'Door & Window Installation', 'Framing & Structural Work', 'Wood Finishing'] },
  { id: 'fabrication', title: 'Fabrication', icon: 'fa-wrench', desc: 'Custom metal fabrication in mild steel, stainless steel, and aluminum for gates, grills, railings, and more.', items: ['M.S Fabrication', 'S.S Fabrication', 'Aluminum Fabrication', 'Custom Metal Work'] },
  { id: 'falseceiling', title: 'False Ceiling', icon: 'fa-server', desc: 'Elegant false ceiling designs that enhance aesthetics and improve insulation and acoustics.', items: ['Gypsum Board Ceiling', 'POP Ceiling', 'Grid Ceiling', 'Decorative Ceiling'] },
  { id: 'painting', title: 'Painting', icon: 'fa-paint-brush', desc: 'Professional interior and exterior painting with premium finishes, textures, and waterproof coatings.', items: ['Interior Painting', 'Exterior Painting', 'Texture Painting', 'Waterproof Coating'] },
  { id: 'interior', title: 'Interior Work', icon: 'fa-home', desc: 'Complete interior solutions including modular kitchens, wardrobes, cabinets, and decorative wall paneling.', items: ['Kitchen Interiors', 'Wardrobes & Lofts', 'TV Cabinet', 'Pooja Cabinet', 'Wall Paneling'] },
  { id: 'waterproofing', title: 'Waterproofing', icon: 'fa-shield', desc: 'Long-lasting waterproofing solutions to protect your structure from water damage and seepage.', items: ['Roof Waterproofing', 'Basement Waterproofing', 'Bathroom Waterproofing', 'Terrace Waterproofing'] },
];

const Services: React.FC = () => {
  const [activeTab, setActiveTab] = useState(services[0].id);
  const sectionRef = useScrollReveal('.reveal');

  return (
    <div ref={sectionRef}>
      {/* Sub Banner */}
      <div className="sub-banner">
        <div className="container">
          <h1>Our Services</h1>
          <p className="exo">We have 25 years experience in construction</p>
        </div>
        <ol className="breadcrumb">
          <li><Link to="/">Home</Link></li>
          <li className="active">Services</li>
        </ol>
      </div>

      {/* Service Cards - Animated Grid */}
      <section className="service-part">
        <div className="container">
          <div className="tittle reveal">
            <h2>What We Offer</h2>
            <p>Professional construction and renovation services tailored to your needs</p>
          </div>
          <div className="services-grid-animated">
            {services.map((service, idx) => (
              <div
                key={service.id}
                className="service-card reveal"
                style={{ transitionDelay: `${idx * 0.07}s` }}
              >
                <div className="service-icon">
                  <i className={`fa ${service.icon}`}></i>
                </div>
                <h5>{service.title}</h5>
                <ul>
                  {service.items.map((item, i) => (
                    <li key={i} style={{ transitionDelay: `${i * 0.05}s` }}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Offer Services (Tabs) */}
      <section className="offer-services">
        <div className="container">
          <div className="tittle reveal">
            <h2>Our Construction Services</h2>
          </div>
          <div className="row">
            <div style={{ width: '25%', padding: '0 15px' }}>
              <div role="tabpanel">
                <ul className="nav nav-tabs" role="tablist">
                  {services.map((s, idx) => (
                    <li
                      key={s.id}
                      role="presentation"
                      className={`reveal ${activeTab === s.id ? 'active' : ''}`}
                      style={{ transitionDelay: `${idx * 0.05}s` }}
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
            <div style={{ width: '50%', padding: '0 15px' }}>
              <div className="tab-content">
                {services.map((s) => (
                  <div
                    key={s.id}
                    role="tabpanel"
                    className={`tab-pane ${activeTab === s.id ? 'active' : ''}`}
                  >
                    <div className="tab-pane-inner">
                      <h4>
                        <i className={`fa ${s.icon}`}></i>
                        {s.title}
                      </h4>
                      <p>{s.desc}</p>
                      <ul>
                        {s.items.map((item, i) => (
                          <li key={i} style={{ transitionDelay: `${i * 0.06}s` }}>
                            <p><i className={`fa ${s.icon || 'fa-tint'}`}></i> {item}</p>
                          </li>
                        ))}
                      </ul>
                      <Link to="/contact" className="btn">Learn More</Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ width: '25%', padding: '0 15px' }}>
              <img className="img-responsive img-up reveal" src="/images/offer-img.jpg" alt="Our Services" />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="services why-choose">
        <div className="container">
          <div className="tittle reveal">
            <h2>Why Choose Us</h2>
          </div>
          <ul className="row">
            {[
              { icon: 'fa-clock-o', title: '24/7 Availability', text: 'Round-the-clock service availability to handle emergencies and scheduled projects at your convenience.' },
              { icon: 'fa-user', title: 'Expert Workers', text: 'Skilled and certified professionals with decades of experience delivering top-quality construction work.' },
              { icon: 'fa-usd', title: 'Low Pricing', text: 'Competitive pricing without compromising quality. Transparent quotes with no hidden charges.' },
              { icon: 'fa-thumbs-o-up', title: 'Free Estimation', text: 'Get a free, no-obligation estimate for your project. We assess your needs and provide detailed plans.' },
            ].map((item, idx) => (
              <li key={idx} className="col-6 reveal" style={{ transitionDelay: `${idx * 0.1}s` }}>
                <div className="sec-in">
                  <i className={`fa ${item.icon}`}></i>
                  <h6>{item.title}</h6>
                  <hr />
                  <p>{item.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Call Us CTA */}
      <section className="call-us">
        <div className="call-inner">
          <div className="container">
            <h3>Don't See What You Need? Call Us Today!</h3>
            <h1>+61 (123) 456 789</h1>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
