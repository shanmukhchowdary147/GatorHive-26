import React from 'react';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faYoutube,
  faFacebook,
  faTwitter,
  faInstagram,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons';

import { SocialIcon } from 'react-social-icons';

import { FaFacebook } from 'react-icons/fa';
import { IconContext } from 'react-icons';

function Footer() {
  return (
    <div className="footer-container">
      <div className="social-container">
        <a
          href="https://www.youtube.com"
          className="youtube social"
          target={'_blank'}
        >
          <FontAwesomeIcon icon={faYoutube} size="2x" />
        </a>
        <a
          href="https://www.facebook.com"
          className="facebook social"
          target={'_blank'}
        >
          <FontAwesomeIcon icon={faFacebook} size="2x" />
        </a>
        <a
          href="http://www.instagram.com"
          className="instagram social"
          target={'_blank'}
        >
          <FontAwesomeIcon icon={faInstagram} size="2x" />
        </a>
        <a
          href="https://wwww.twitter.com"
          className="twitter social"
          target={'_blank'}
        >
          <FontAwesomeIcon icon={faTwitter} size="2x" />
        </a>
        <a
          href="https://wwww.linkedin.com"
          className="linkedIn social"
          target={'_blank'}
        >
          <FontAwesomeIcon icon={faLinkedin} size="2x" />
        </a>
      </div>
      <div className="footer-options">
        <a href="/about-us">About Us</a>
        <a
          href="https://shanmukhchowdary20.wixsite.com/my-site-1/"
          target={'_blank'}
        >
          Project Overview
        </a>
      </div>
      <div className="footer-content">
        <div>Copyright 2023 © GatorHive Team. All Rights Reserved.</div>
        <div>
          The content and images used on this site are copyright protected and
          copyrights vests with the respective owners.
        </div>
      </div>
    </div>
  );
}

export default Footer;
