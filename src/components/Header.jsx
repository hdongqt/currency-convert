import { useEffect, useState } from "react";
import { LIST_NAV } from "./../constants/navbar";

export default function Header() {
  const [isSticky, setIsSticky] = useState(false);
  const [isOpenNavMobile, setIsOpenNavMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`header${isSticky ? " sticky" : ""}${
        isOpenNavMobile ? " open-nav" : ""
      }`}
    >
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
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
          {LIST_NAV.map((nav) => (
            <li key={nav.section}>
              <a
                href={`#${nav.section}`}
                className="main-nav-link"
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                {nav.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <button className="btn-mobile-nav">
        {!isOpenNavMobile ? (
          <ion-icon
            class="icon-mobile-nav"
            name="menu-outline"
            onClick={() => setIsOpenNavMobile(true)}
          />
        ) : (
          <ion-icon
            class="icon-mobile-nav"
            name="close-outline"
            onClick={() => setIsOpenNavMobile(false)}
          />
        )}
      </button>
    </header>
  );
}
