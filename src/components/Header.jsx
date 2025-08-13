import React from "react";

export default function Header() {
  return (
    <header className="header">
      <a href="#">
        <img
          src="./images/bronze-logo.png"
          alt="Bronze logo"
          className="logo"
        />
      </a>
      <nav className="main-nav">
        <ul className="main-nav-list">
          <li>
            <a href="#" className="main-nav-link main-nav-link-logo">
              <img
                src="./images/bronze-logo.png"
                alt="BronzeMagic logo"
                className="logo-mobile"
              />
            </a>
          </li>
          <li>
            <a href="#converter" className="main-nav-link">
              Converter
            </a>
          </li>
          <li>
            <a href="#exchange" className="main-nav-link">
              Exchange rate
            </a>
          </li>
        </ul>
      </nav>
      <button className="btn-mobile-nav">
        <ion-icon className="icon-mobile-nav" name="menu-outline" />
        <ion-icon className="icon-mobile-nav" name="close-outline" />
      </button>
    </header>
  );
}
