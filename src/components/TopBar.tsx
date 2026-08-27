import React from 'react';

const TopBar: React.FC = () => {
  return (
    <div className="top-bar">
      <div className="container">
        <ul className="left-bar-side">
          <li><p className="exo">Quick Service.</p></li>
          <li><p className="exo">Quality Work.</p></li>
          <li><p className="exo">Life Time Support.</p></li>
        </ul>
        <ul className="right-bar-side social_icons">
          <li className="facebook"><a href="#"><i className="fa fa-facebook"></i></a></li>
          <li className="twitter"><a href="#"><i className="fa fa-twitter"></i></a></li>
          <li className="linkedin"><a href="#"><i className="fa fa-linkedin"></i></a></li>
          <li className="tumblr"><a href="#"><i className="fa fa-tumblr"></i></a></li>
        </ul>
      </div>
    </div>
  );
};

export default TopBar;
