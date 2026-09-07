import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer>
      <div className="container">
        <ul className="row">
          <li className="col-sm-3">
            <img className="img-responsive" src="/images/footer-img.png" alt="VR Construction" />
          </li>

          <li className="col-sm-3">
            <div className="counters">
              <i className="fa fa-heart-o"></i>
              <p>Happy Clients</p>
              <span className="count1">350+</span>
            </div>
            <h5>Site Links</h5>
            <hr />
            <div className="links">
              <ul>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/services">Our Services</Link></li>
                <li><Link to="/gallery">Recent Projects</Link></li>
                <li><Link to="/blog">Latest News</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
              </ul>
            </div>
          </li>

          <li className="col-sm-3">
            <div className="counters">
              <i className="fa fa-rocket"></i>
              <p>Years of Service</p>
              <span className="count2">25+</span>
            </div>
            <h5>Services</h5>
            <hr />
            <div className="links">
              <ul>
                <li><Link to="/services">Construction</Link></li>
                <li><Link to="/services">Renovation</Link></li>
                <li><Link to="/services">Interior Design</Link></li>
                <li><Link to="/services">Civil Engineering</Link></li>
                <li><Link to="/services">Project Management</Link></li>
              </ul>
            </div>
          </li>

          <li className="col-sm-3">
            <div className="counters">
              <i className="fa fa-trophy"></i>
              <p>Awards Won</p>
              <span className="count3">15+</span>
            </div>
            <h5>Contact</h5>
            <hr />
            <p>Address: 44 New Design Street,<br />Melbourne 005</p>
            <p>Phone: +61 (123) 456 789</p>
            <p>Fax: +91 5464 213</p>
            <p>Email: info@vrconstruction.com</p>
            <ul className="social_icons">
              <li className="facebook"><a href="#"><i className="fa fa-facebook"></i></a></li>
              <li className="twitter"><a href="#"><i className="fa fa-twitter"></i></a></li>
              <li className="linkedin"><a href="#"><i className="fa fa-linkedin"></i></a></li>
              <li className="tumblr"><a href="#"><i className="fa fa-tumblr"></i></a></li>
            </ul>
          </li>
        </ul>
      </div>
      <div className="rights">
        <p>&copy; {new Date().getFullYear()} VR Construction. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
