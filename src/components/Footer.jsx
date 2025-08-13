export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <img
          src="./images/bronze-logo.png"
          alt="Omnifood logo"
          className="logo"
        />
        <ul className="footer-nav">
          <li>
            <a href="#" className="footer-link">
              Convert currency
            </a>
          </li>
          <li>
            <a href="#" className="footer-link">
              Exchange rate
            </a>
          </li>
        </ul>
        <ul className="footer-social">
          <li>
            <span>© 2025 BronzeCurrency</span>
          </li>
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
    </footer>
  );
}
