import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  const [openAccordion, setOpenAccordion] = useState('collapseOne');
  const toggleAccordion = (id: string) => setOpenAccordion(openAccordion === id ? '' : id);

  const teamMembers = [
    { name: 'Nissan Waser', role: 'Construction Engineer', img: 'team-1.jpg' },
    { name: 'Benjamin Thomas', role: 'Project Manager', img: 'team-2.jpg' },
    { name: 'Isabella', role: 'Interior Designer', img: 'team-3.jpg' },
    { name: 'Alexander', role: 'Site Supervisor', img: 'team-4.jpg' },
  ];

  const accordionItems = [
    { id: 'collapseOne', icon: 'fa-gear', title: 'Awards & Recognition', text: 'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.' },
    { id: 'collapseTwo', icon: 'fa-bell', title: 'Our Company History', text: 'Founded in 2000, VR Construction has grown from a small construction firm to one of the most trusted names in the industry. Our journey has been marked by continuous innovation and commitment to excellence.' },
    { id: 'collapseThree', icon: 'fa-gear', title: 'Future Plans', text: 'We are committed to expanding our services into sustainable building practices, smart home technology integration, and green construction solutions.' },
  ];

  return (
    <>
      <div className="sub-banner">
        <div className="container">
          <h1>About Us</h1>
          <p>We have 25 years experience in construction</p>
        </div>
        <ol className="breadcrumb">
          <li><Link to="/">Home</Link></li>
          <li className="active">About Us</li>
        </ol>
      </div>

      <section className="section" style={{ background: 'var(--c-bg)' }}>
        <div className="container">
          <div className="row" style={{ alignItems: 'center' }}>
            <div style={{ width: '50%', padding: '0 15px' }}>
              <div className="section-header" style={{ textAlign: 'left' }}>
                <span className="section-tag">About Us</span>
                <h2>We Build All Your Construction Dreams</h2>
                <div className="section-line" style={{ margin: '15px 0' }} />
              </div>
              <p style={{ marginBottom: '20px', lineHeight: 1.8 }}>
                Sed quis viverra enim. Vivamus aliquet rutrum dui a varius. Mauris ornare tortor
                in eleifend blandit ullam ut ligula et neque.
              </p>
              <Link to="/about" className="btn btn-primary">Learn More</Link>
            </div>
            <div style={{ width: '50%', padding: '0 15px' }}>
              <div className="row" style={{ gap: '15px' }}>
                {[
                  { icon: 'fa-clock-o', title: '24/7 Availability', desc: 'Round the clock service for all your construction needs.' },
                  { icon: 'fa-users', title: 'Expert Workers', desc: 'Skilled professionals with years of experience.' },
                  { icon: 'fa-usd', title: 'Low Pricing', desc: 'Competitive rates without compromising quality.' },
                  { icon: 'fa-thumbs-o-up', title: 'Free Estimation', desc: 'Get a free quote for your project today.' },
                ].map((item, idx) => (
                  <div key={idx} style={{ width: 'calc(50% - 8px)', padding: '0' }}>
                    <div className="service-card-dark" style={{ height: '100%' }}>
                      <div className="service-card-icon"><i className={`fa ${item.icon}`}></i></div>
                      <h5>{item.title}</h5>
                      <p>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--c-bg-1)' }}>
        <div className="container">
          <div className="row" style={{ alignItems: 'center' }}>
            <div style={{ width: '50%', padding: '0 15px' }}>
              <div className="section-header" style={{ textAlign: 'left' }}>
                <span className="section-tag">Who We Are</span>
                <h2>Our Story</h2>
                <div className="section-line" style={{ margin: '15px 0' }} />
              </div>
              <div className="panel-group">
                {accordionItems.map((item) => (
                  <div key={item.id} className="panel">
                    <div className="panel-heading">
                      <h4 className="panel-title">
                        <a onClick={() => toggleAccordion(item.id)} style={{ cursor: 'pointer' }} aria-expanded={openAccordion === item.id}>
                          <span className="icon-accor"><i className={`fa ${item.icon}`}></i></span>
                          {item.title}
                        </a>
                      </h4>
                    </div>
                    <div className={`panel-collapse ${openAccordion === item.id ? 'show' : ''}`}>
                      <div className="panel-body"><p>{item.text}</p></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ width: '50%', padding: '0 15px' }}>
              <img src="/images/about-img.jpg" alt="About VR Construction" style={{ width: '100%', borderRadius: '8px' }} />
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--c-bg)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Our Team</span>
            <h2>Team Members</h2>
            <div className="section-line" />
          </div>
          <div className="row">
            {teamMembers.map((member, idx) => (
              <div key={idx} style={{ width: '25%', padding: '0 10px' }}>
                <div className="team">
                  <img src={`/images/${member.img}`} alt={member.name} />
                  <div className="team-over"></div>
                  <div className="team-detail">
                    <h6>{member.name}</h6>
                    <p>{member.role}</p>
                    <ul className="social_icons">
                      <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                      <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                      <li><a href="#"><i className="fa fa-linkedin"></i></a></li>
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--c-bg-1)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Testimonials</span>
            <h2>Client Feedback</h2>
            <div className="section-line" />
          </div>
          <div className="row" style={{ gap: '20px' }}>
            {[
              { name: 'John Smith', role: 'Home Owner', avatar: 'avatar-1.jpg', text: 'VR Construction delivered exceptional quality on our home renovation.' },
              { name: 'Sarah Johnson', role: 'Business Owner', avatar: 'avatar-2.jpg', text: 'Outstanding commercial work! Professional team, on time, within budget.' },
              { name: 'Michael Brown', role: 'Property Developer', avatar: 'avatar-3.jpg', text: 'Unmatched expertise in civil engineering and project management.' },
            ].map((client, idx) => (
              <div key={idx} className="testimonial-card active" style={{ position: 'relative', opacity: 1, transform: 'none', pointerEvents: 'auto', flex: 1 }}>
                <p>{client.text}</p>
                <div className="testimonial-author">
                  <img src={`/images/${client.avatar}`} alt={client.name} />
                  <div><h6>{client.name}</h6><span>{client.role}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
