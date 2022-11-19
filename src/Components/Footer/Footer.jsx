import React from "react";
import "./Footer.scss";
const Footer = () => {
  return (
    <footer>
      <div className="container-f">
        <div>
          <h6 className="footer-heading text-uppercase text-whiter">
            Information
          </h6>
          <ul className="footer-link mt-4">
            <li>
              <a href="#!">Sitemap</a>
            </li>
            <li>
              <a href="#!">Our team</a>
            </li>
            <li>
              <a href="#!">Terms of Services</a>
            </li>
          </ul>
        </div>

        <div className="footer-link">
          <h6 className="footer-heading text-uppercase text-whiter">
            Contact us
          </h6>
          <p className="contact-info mt-4">Need help ?</p>
          <p className="contact-info">+7 (777) 014 6776</p>
          <div>
            <ul className="list-inline">
              <li className="list-inline-item">
                <a href="#!">
                  <i className="fab facebook footer-social-icon fa-facebook-f"></i>
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#!">
                  <i className="fab twitter footer-social-icon fa-twitter"></i>
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#!">
                  <i className="fab instagram footer-social-icon fa-instagram"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="text-center mt-5">
        <p className="footer-alt">
          2022 © Nazarbayev University, All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
