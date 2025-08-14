import { RatesContext } from "../context/RatesContext";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-content">
          <img
            src="./images/bronze-logo.png"
            alt="Omnifood logo"
            className="logo"
          />
          <ul className="footer-social">
            <li>
              <a href="#" className="footer-social-link">
                <ion-icon name="logo-facebook" />
              </a>
            </li>
            <li>
              <a href="#" className="footer-social-link">
                <ion-icon name="logo-twitter" />
              </a>
            </li>
            <li>
              <a href="#" className="footer-social-link">
                <ion-icon name="logo-instagram" />
              </a>
            </li>
          </ul>
        </div>
        <p className="footer-about">
          This project uses real-time data from the Vietnamese banking system to
          provide accurate and up-to-date currency exchange rates. The API can
          be used to convert Vietnamese Dong to other currencies and vice versa.
        </p>
        <p className="footer-about">
          <strong>
            Copyright &copy; 2027 by BronzeMagic, Inc. All rights reserved.
          </strong>
        </p>
      </div>
    </footer>
  );
}
