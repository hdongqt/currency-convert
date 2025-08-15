import "./App.css";
import "./queries.css";
import Header from "./components/Header";
import Convert from "./components/Convert";
import ExchangeRate from "./components/ExchangeRate";
import Footer from "./components/Footer";
import CountriesSupport from "./components/CountriesSupport";
import { useContext, useEffect } from "react";
import { getExchangeRate } from "./API/ExchangeRate";
import { RatesContext } from "./context/RatesContext";
import { convertTimestampToDateTime } from "./utils/timeUtils";
import { FLAG_CURRENCY } from "./data/flag";

function App() {
  const { setRates, setLastUpdated } = useContext(RatesContext);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await getExchangeRate();
        if (!res.ok) throw new Error("Failed to fetch data");
        const { data } = await res.json();
        const dataHandled = data
          ? data.payload.map((item) => {
              return {
                ...item,
                flag: FLAG_CURRENCY?.[item.currencyCode] || "",
              };
            })
          : [];
        setRates(dataHandled);
        setLastUpdated(convertTimestampToDateTime(data.lastUpdated));
      } catch (error) {
        console.log(error.message);
      }
    };
    getData();
  }, [setLastUpdated, setRates]);

  return (
    <div className="App">
      <Header />
      <main>
        <section className="section-hero">
          <div className="">
            <div className="hero">
              <div className="hero-text-box">
                <h1 className="heading-primary">Exchange Rates</h1>
                <p className="hero-description">
                  Get the current exchange rate of different currencies against
                  the Viet Nam
                </p>
              </div>
            </div>
          </div>
        </section>
        <Convert />
        <ExchangeRate />
        <CountriesSupport />
      </main>
      <Footer />
    </div>
  );
}

export default App;
