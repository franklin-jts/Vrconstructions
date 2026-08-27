import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  const [openAccordion, setOpenAccordion] = useState('collapseOne');

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? '' : id);
  };

  const teamMembers = [
    { name: 'Nissan Waser', role: 'Construction Engineer', img: 'team-1.jpg' },
    { name: 'Benjamin Thomas', role: 'Project Manager', img: 'team-2.jpg' },
    { name: 'Isabella', role: 'Interior Designer', img: 'team-3.jpg' },
    { name: 'Alexander', role: 'Site Supervisor', img: 'team-4.jpg' },
  ];

  const accordionItems = [
    { id: 'collapseOne', icon: 'fa-gear', title: 'Awards & Recognition', text: 'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.' },
    { id: 'collapseTwo', icon: 'fa-bell', title: 'Our Company History', text: 'Founded in 2000, VR Construction has grown from a small construction firm to one of the most trusted names in the industry. Our journey has been marked by continuous innovation and commitment to excellence.' },
    { id: 'collapseThree', icon: 'fa-gear', title: 'Future Plans', text: 'We are committed to expanding our services into sustainable building practices, smart home technology integration, and green construction solutions that benefit both our clients and the environment.' },
  ];

  return (
    <>
      {/* Sub Banner */}
      <div className="sub-banner">
        <div className="container">
          <h1>About Us</h1>
          <p className="exo">We have 25 years experience in construction</p>
        </div>
        <ol className="breadcrumb">
          <li><Link to="/">Home</Link></li>
          <li className="active">About Us</li>
        </ol>
      </div>

      {/* Services Strip */}
      <section className="services">
        <div className="container">
          <ul className="row">
            <li className="col-4 padding-r-80">
              <div className="tittle">
                <h2 className="text-left">We Build All Your Construction Dreams</h2>
              </div>
              <p>Sed quis viverra enim. Vivamus aliquet rutrum dui a varius. Mauris ornare tortor in eleifend blandit ullam ut ligula et neque.</p>
              <Link to="/about" className="btn">About More</Link>
            </li>
            <li className="col-4">
              <div className="sec-in">
                <i className="fa fa-clock-o"></i>
                <h6>24/7 Availability</h6>
                <p>Vivamus aliquet rutrum dui a varius. Mauris ornare tortor.</p>
                <Link to="/services" className="go-right"><i className="fa fa-angle-right"></i></Link>
              </div>
            </li>
            <li className="col-4">
              <div className="sec-in">
                <i className="fa fa-user"></i>
                <h6>Expert Workers</h6>
                <p>Vivamus aliquet rutrum dui a varius. Mauris ornare tortor.</p>
                <Link to="/services" className="go-right"><i className="fa fa-angle-right"></i></Link>
              </div>
            </li>
            <li className="col-4">
              <div className="sec-in">
                <i className="fa fa-usd"></i>
                <h6>Low Pricing</h6>
                <p>Vivamus aliquet rutrum dui a varius. Mauris ornare tortor.</p>
                <Link to="/services" className="go-right"><i className="fa fa-angle-right"></i></Link>
              </div>
            </li>
            <li className="col-4">
              <div className="sec-in">
                <i className="fa fa-thumbs-o-up"></i>
                <h6>Free Estimation</h6>
                <p>Vivamus aliquet rutrum dui a varius. Mauris ornare tortor.</p>
                <Link to="/services" className="go-right"><i className="fa fa-angle-right"></i></Link>
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* Who We Are */}
      <div className="who-we-are">
        <div className="container">
          <div className="row">
            <div style={{ width: '50%', padding: '0 15px' }}>
              <div className="tittle">
                <h2>Who We Are</h2>
              </div>
              <div className="panel-group" id="accordion">
                {accordionItems.map((item) => (
                  <div key={item.id} className="panel panel-default">
                    <div className="panel-heading">
                      <h4 className="panel-title">
                        <a
                          onClick={() => toggleAccordion(item.id)}
                          style={{ cursor: 'pointer' }}
                          aria-expanded={openAccordion === item.id}
                        >
                          <span className="icon-accor"><i className={`fa ${item.icon}`}></i></span>
                          {item.title}
                        </a>
                      </h4>
                    </div>
                    <div className={`panel-collapse ${openAccordion === item.id ? 'show' : ''}`}>
                      <div className="panel-body">
                        <p>{item.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ width: '50%', padding: '0 15px' }}>
              <div className="testi">
                <img className="img-responsive" src="/images/about-img.jpg" alt="About VR Construction" />
                <img className="img-responsive" src="/images/about-img-1.jpg" alt="About VR Construction" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Members */}
      <section id="team">
        <div className="container">
          <div className="tittle">
            <h2>Team Members</h2>
          </div>
          <div className="row">
            {teamMembers.map((member, idx) => (
              <div key={idx} style={{ width: '25%', padding: '0 15px' }}>
                <div className="team">
                  <img className="img-responsive" src={`/images/${member.img}`} alt={member.name} />
                  <a className="team-over" href="#"></a>
                  <div className="team-detail">
                    <h6>{member.name.toLowerCase()}</h6>
                    <p>{member.role}</p>
                    <ul className="social_icons">
                      <li className="facebook"><a href="#"><i className="fa fa-facebook"></i></a></li>
                      <li className="twitter"><a href="#"><i className="fa fa-twitter"></i></a></li>
                      <li className="googleplus"><a href="#"><i className="fa fa-google-plus"></i></a></li>
                      <li className="linkedin"><a href="#"><i className="fa fa-linkedin"></i></a></li>
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clients Feedback */}
      <section className="clients with-gray">
        <div className="container">
          <div className="tittle">
            <h2>Feedback From Clients</h2>
          </div>
          <ul className="row">
            {[
              { name: 'John Smith', role: 'Home Owner', avatar: 'avatar-1.jpg', text: 'VR Construction delivered exceptional quality on our home renovation. Their attention to detail and professional approach exceeded our expectations.' },
              { name: 'Sarah Johnson', role: 'Business Owner', avatar: 'avatar-2.jpg', text: 'Outstanding commercial construction work! The team was professional, on time, and within budget. Highly recommended for any construction project.' },
              { name: 'Michael Brown', role: 'Property Developer', avatar: 'avatar-3.jpg', text: 'Working with VR Construction has been a pleasure. Their expertise in civil engineering and project management is unmatched in the industry.' },
            ].map((client, idx) => (
              <li key={idx} style={{ flex: 1 }}>
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

      {/* Partners */}
      <section className="parthner">
        <div className="container">
          <div className="tittle">
            <h2>Partners / Clients</h2>
          </div>
          <div className="parthner-slide">
            {[1, 2, 3, 4, 5].map((num) => (
              <div key={num} className="part">
                <a href="#"><img src={`/images/parthner-img-${num}.png`} alt={`Partner ${num}`} /></a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
