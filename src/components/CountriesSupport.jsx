const CountriesSupportList = () => (
  <ul className="countries-supported__list">
    <li>
      <img src="./images/countries/australia.png" alt="Australia" />
      <p>Australia(AUD)</p>
    </li>
    <li>
      <img src="./images/countries/canada.png" alt="Canada" />
      <p>Canada(CAD)</p>
    </li>
    <li>
      <img src="./images/countries/switzerland.png" alt="Switzerland" />
      <p>Switzerland(CHF)</p>
    </li>
    <li>
      <img src="./images/countries/china.png" alt="China" />
      <p>China(CNY)</p>
    </li>
    <li>
      <img src="./images/countries/denmark.png" alt="Denmark" />
      <p>Denmark(DKK)</p>
    </li>
    <li>
      <img src="./images/countries/europe.png" alt="Euro" />
      <p>Euro(EUR)</p>
    </li>
    <li>
      <img src="./images/countries/usa.png" alt="United Kingdom" />
      <p>United Kingdom(GBP)</p>
    </li>
    <li>
      <img src="./images/countries/hongkong.png" alt="Hong Kong" />
      <p>Hong Kong(HKD)</p>
    </li>
    <li>
      <img src="./images/countries/india.png" alt="India" />
      <p>India(INR)</p>
    </li>
    <li>
      <img src="./images/countries/japan.png" alt="Japan" />
      <p>Japan(JPY)</p>
    </li>
    <li>
      <img src="./images/countries/korea.png" alt="Korea" />
      <p>Korea(KRW)</p>
    </li>
    <li>
      <img src="./images/countries/kuwait.png" alt="Kuwait" />
      <p>Kuwait(KWD)</p>
    </li>
    <li>
      <img src="./images/countries/malaysia.png" alt="Malaysia" />
      <p>Malaysia(MYR)</p>
    </li>
    <li>
      <img src="./images/countries/norway.png" alt="Norway" />
      <p>Norway(NOK)</p>
    </li>
    <li>
      <img src="./images/countries/russia.png" alt="Russia" />
      <p>Russia(RUB)</p>
    </li>
    <li>
      <img src="./images/countries/arabia.png" alt="Saudi Arabia" />
      <p>Saudi Arabia(SAR)</p>
    </li>
    <li>
      <img src="./images/countries/sweden.png" alt="Sweden" />
      <p>Sweden(SEK)</p>
    </li>
    <li>
      <img src="./images/countries/singapore.png" alt="Singapore" />
      <p>Singapore(SGD)</p>
    </li>
    <li>
      <img src="./images/countries/thailand.png" alt="Thailand" />
      <p>Thailand(THB)</p>
    </li>
    <li>
      <img src="./images/countries/united-states.png" alt="United States" />
      <p>United States(USD)</p>
    </li>
  </ul>
);

export default function CountriesSupport() {
  return (
    <section className="container">
      <div className="countries-supported">
        <h2 className="heading-secondary">
          Countries with Supported Exchange Rates
        </h2>
        <div className="countries-supported__box">
          <CountriesSupportList />
          <CountriesSupportList />
        </div>
      </div>
    </section>
  );
}
