import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-top">
          <div className="footer-brand">
            <span className="nav-logo">DUALSENSE</span>
            <p className="footer-tagline">Experience a new dimension of control.</p>
          </div>
          <div className="footer-links">
            <div className="footer-column">
              <h4>Product</h4>
              <ul>
                <li>Features</li>
                <li>Design</li>
                <li>Specs</li>
                <li>Accessories</li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>Support</h4>
              <ul>
                <li>Manuals</li>
                <li>Safety Guide</li>
                <li>Warranty</li>
                <li>Contact Us</li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>Social</h4>
              <ul>
                <li>Twitter</li>
                <li>Instagram</li>
                <li>YouTube</li>
                <li>Discord</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-copyright">
            <p>&copy; 2026 sauravedu.official@gmail.com  All rights reserved.</p>
          </div>
          <div className="footer-legal">
            <ul>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Cookie Settings</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="footer-glow"></div>
    </footer>
  );
};

export default Footer;
