import { useEffect, useState } from "react";
import { LIST_NAV } from "./../constants/navbar";
import { useContext } from "react";
import { RatesContext } from "./../context/RatesContext";

export default function Header() {
  const { sectionRefs } = useContext(RatesContext);
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

  const handleClickNav = (section) => {
    const sectionEl = sectionRefs?.current[section]?.current;
    if (sectionEl) {
      const top =
        sectionEl.getBoundingClientRect().top + window.pageYOffset - 120;
      window.scrollTo({ top, behavior: "smooth" });
    }
    if (isOpenNavMobile) {
      setIsOpenNavMobile(false);
    }
  };

  const handleClickLogo = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (isOpenNavMobile) {
      setIsOpenNavMobile(false);
    }
  };

  return (
    <header
      className={`header${isSticky ? " sticky" : ""}${
        isOpenNavMobile ? " open-nav" : ""
      }`}
    >
      <a href="#" onClick={handleClickLogo}>
        <img
          src="./images/bronze-logo.png"
          alt="Bronze logo"
          className="logo"
        />
      </a>
      <nav className="main-nav">
        <ul className="main-nav-list">
          {LIST_NAV.map((nav) => (
            <li key={nav.section} className="main-nav-item">
              <a
                href={`#${nav.section}`}
                className="main-nav-link"
                onClick={(e) => {
                  e.preventDefault();
                  handleClickNav(nav.section);
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
      {isOpenNavMobile && (
        <div
          className="header-overlay"
          onClick={() => setIsOpenNavMobile(false)}
        ></div>
      )}
    </header>
  );
}
