import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const services = [
  { id: 'construction', title: 'Construction', icon: 'fa-building', desc: 'We deliver end-to-end construction solutions from foundation to finishing for residential, commercial, and warehouse projects.', items: ['Residential Construction', 'Commercial Building', 'Warehouse Construction'] },
  { id: 'renovation', title: 'Renovation', icon: 'fa-refresh', desc: 'Transform your existing space with our comprehensive home renovation services.', items: ['Home All Types of Renovation Work'] },
  { id: 'electrical', title: 'Electrical', icon: 'fa-bolt', desc: 'Safe and reliable electrical services by certified professionals.', items: ['Complete Electrical Wiring', 'Electrical Panel Installation', 'Lighting Solutions', 'Safety Inspections'] },
  { id: 'plumbing', title: 'Plumbing', icon: 'fa-tint', desc: 'Expert plumbing services for installation, repair, and maintenance.', items: ['Pipe Installation & Repair', 'Bathroom Plumbing', 'Kitchen Plumbing', 'Water Line Services'] },
  { id: 'tiles', title: 'Tiles Laying', icon: 'fa-th-large', desc: 'Precision tile installation for floors and walls.', items: ['Marble Tiles', 'Granite Tiles', 'Ceramic Tiles', 'Wall & Floor Tiling'] },
  { id: 'carpentry', title: 'Carpentry Works', icon: 'fa-tree', desc: 'Skilled carpentry from custom furniture to structural framing.', items: ['Custom Woodwork', 'Door & Window Installation', 'Framing & Structural Work', 'Wood Finishing'] },
  { id: 'fabrication', title: 'Fabrication', icon: 'fa-wrench', desc: 'Custom metal fabrication in mild steel, stainless steel, and aluminum.', items: ['M.S Fabrication', 'S.S Fabrication', 'Aluminum Fabrication', 'Custom Metal Work'] },
  { id: 'falseceiling', title: 'False Ceiling', icon: 'fa-server', desc: 'Elegant false ceiling designs that enhance aesthetics.', items: ['Gypsum Board Ceiling', 'POP Ceiling', 'Grid Ceiling', 'Decorative Ceiling'] },
  { id: 'painting', title: 'Painting', icon: 'fa-paint-brush', desc: 'Professional interior and exterior painting with premium finishes.', items: ['Interior Painting', 'Exterior Painting', 'Texture Painting', 'Waterproof Coating'] },
  { id: 'interior', title: 'Interior Work', icon: 'fa-home', desc: 'Complete interior solutions including modular kitchens and wardrobes.', items: ['Kitchen Interiors', 'Wardrobes & Lofts', 'TV Cabinet', 'Pooja Cabinet', 'Wall Paneling'] },
  { id: 'waterproofing', title: 'Waterproofing', icon: 'fa-shield', desc: 'Long-lasting waterproofing solutions to protect your structure.', items: ['Roof Waterproofing', 'Basement Waterproofing', 'Bathroom Waterproofing', 'Terrace Waterproofing'] },
];

const Services: React.FC = () => {
  const [activeTab, setActiveTab] = useState(services[0].id);

  return (
    <>
      {/* Sub Banner */}
      <div className="sub-banner">
        <div className="container">
          <h1>Our Services</h1>
          <p>We have 25 years experience in construction</p>
        </div>
        <ol className="breadcrumb">
          <li><Link to="/">Home</Link></li>
          <li className="active">Services</li>
        </ol>
      </div>

      {/* Services Grid */}
      <section className="section" style={{ background: 'var(--c-bg)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">What We Offer</span>
            <h2>Our Construction Services</h2>
            <div className="section-line" />
          </div>
          <div className="services-grid">
            {services.map((service) => (
              <div key={service.id} className="service-card-dark">
                <div className="service-card-icon"><i className={`fa ${service.icon}`}></i></div>
                <h5>{service.title}</h5>
                <p>{service.desc}</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: '10px 0 0' }}>
                  {service.items.map((item, i) => (
                    <li key={i} style={{ padding: '5px 0', fontSize: '12px', color: 'var(--c-text-muted)', borderBottom: '1px solid var(--c-border)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <i className="fa fa-check" style={{ color: 'var(--c-accent)', fontSize: '10px' }}></i>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tab Detail View */}
      <section className="section" style={{ background: 'var(--c-bg-1)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Details</span>
            <h2>Service Details</h2>
            <div className="section-line" />
          </div>
          <div style={{ display: 'flex', gap: '30px' }}>
            {/* Tab List */}
            <div style={{ width: '25%', flexShrink: 0 }}>
              {services.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setActiveTab(s.id)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '10px', width: '100%',
                    padding: '12px 16px', background: activeTab === s.id ? 'var(--c-accent)' : 'var(--c-surface)',
                    border: `1px solid ${activeTab === s.id ? 'var(--c-accent)' : 'var(--c-border)'}`,
                    color: activeTab === s.id ? 'var(--c-bg)' : 'var(--c-text-muted)',
                    fontFamily: 'var(--f-heading)', fontSize: '12px', fontWeight: 600,
                    textTransform: 'uppercase', letterSpacing: '0.5px', cursor: 'pointer',
                    marginBottom: '3px', borderRadius: '4px', transition: 'all 0.3s',
                    textAlign: 'left',
                  }}
                >
                  <i className={`fa ${s.icon}`}></i>
                  {s.title}
                  {activeTab === s.id && <i className="fa fa-arrow-right" style={{ marginLeft: 'auto' }}></i>}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div style={{ flex: 1 }}>
              {services.filter((s) => s.id === activeTab).map((s) => (
                <div key={s.id} style={{
                  background: 'var(--c-surface)', border: '1px solid var(--c-border)',
                  borderRadius: '8px', padding: '40px',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                    <div style={{
                      width: '50px', height: '50px', background: 'var(--c-accent)',
                      borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <i className={`fa ${s.icon}`} style={{ fontSize: '20px', color: 'var(--c-bg)' }}></i>
                    </div>
                    <h3 style={{ margin: 0 }}>{s.title}</h3>
                  </div>
                  <p style={{ marginBottom: '25px', lineHeight: 1.8 }}>{s.desc}</p>
                  <h5 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '15px', color: 'var(--c-accent)' }}>
                    What's Included
                  </h5>
                  <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    {s.items.map((item, i) => (
                      <li key={i} style={{
                        display: 'flex', alignItems: 'center', gap: '10px',
                        padding: '12px 16px', background: 'var(--c-bg)',
                        border: '1px solid var(--c-border)', borderRadius: '6px',
                        fontSize: '13px', color: 'var(--c-text-dim)',
                      }}>
                        <i className="fa fa-check-circle" style={{ color: 'var(--c-accent)', fontSize: '14px' }}></i>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link to="/contact" className="btn btn-primary" style={{ marginTop: '25px', border: 'none' }}>
                    Get a Quote for {s.title}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section" style={{ background: 'var(--c-bg)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Why Us</span>
            <h2>Why Choose VR Construction</h2>
            <div className="section-line" />
          </div>
          <div className="row" style={{ gap: '20px' }}>
            {[
              { icon: 'fa-clock-o', title: '24/7 Availability', text: 'Round-the-clock service for emergencies and scheduled projects.' },
              { icon: 'fa-users', title: 'Expert Workers', text: 'Skilled and certified professionals with decades of experience.' },
              { icon: 'fa-usd', title: 'Low Pricing', text: 'Competitive pricing without compromising quality. No hidden charges.' },
              { icon: 'fa-thumbs-o-up', title: 'Free Estimation', text: 'Get a free, no-obligation estimate for your project.' },
            ].map((item, idx) => (
              <div key={idx} style={{ flex: 1 }}>
                <div className="service-card-dark" style={{ textAlign: 'center', height: '100%' }}>
                  <div className="service-card-icon" style={{ margin: '0 auto 18px' }}>
                    <i className={`fa ${item.icon}`}></i>
                  </div>
                  <h5>{item.title}</h5>
                  <p>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ background: 'var(--c-bg-1)', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ marginBottom: '15px' }}>Don't See What You Need?</h2>
          <p style={{ marginBottom: '30px', fontSize: '16px' }}>Call us today for a custom consultation</p>
          <a href="tel:+61123456789" className="btn btn-primary" style={{ border: 'none', fontSize: '16px', padding: '18px 40px' }}>
            <i className="fa fa-phone"></i> +61 (123) 456 789
          </a>
        </div>
      </section>
    </>
  );
};

export default Services;
