import React from 'react';
import '../footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faYoutube, faTwitter } from '@fortawesome/free-brands-svg-icons';

function Footer() {
  return (
    <footer className="footer">
      <div className="row">
      <ul>
        <a href="#"><FontAwesomeIcon icon={faFacebook} /></a>
        <a href="#"><FontAwesomeIcon icon={faInstagram} /></a>
        <a href="#"><FontAwesomeIcon icon={faYoutube} /></a>
        <a href="#"><FontAwesomeIcon icon={faTwitter} /></a>
        </ul>
      </div>

      <div className="row">
        <ul>
          <li><a href="#">Contact us</a></li>
          <li><a href="#">Our Services</a></li>
          <li><a href="#">Privacy Policy</a></li>
          <li><a href="#">Terms & Conditions</a></li>
          <li><a href="#">Career</a></li>
        </ul>
      </div>

      <div className="row text-center mx-auto">
        Vitality Network Copyright © 2021 - All rights
        reserved
      </div>
    </footer>
  );
}

export default Footer;
