import "./App.css";
import "./queries.css";
import Header from "./components/Header";
import Convert from "./components/Convert";
import ExchangeRate from "./components/ExchangeRate";
import Footer from "./components/Footer";
import CountriesSupport from "./components/CountriesSupport";
import { useContext, useEffect, useState } from "react";
import { getExchangeRate } from "./API/ExchangeRate";
import { RatesContext } from "./context/RatesContext";
import { convertTimestampToDateTime } from "./utils/timeUtils";
import { FLAG_CURRENCY } from "./data/flag";
import Toast from "./components/Toast";

function App() {
  const { setRates, setLastUpdated, setLoadingPage } = useContext(RatesContext);
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    const getData = async () => {
      // api can pending 5 seconds, so we need to show loading page
      // if the api response is faster than 500ms, we will clear the timer and not show loading page
      let timer = setTimeout(() => {
        setLoadingPage(true);
      }, 500);
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
        setErrorMessage("");
        setRates(dataHandled);
        setLastUpdated(convertTimestampToDateTime(data.lastUpdated));
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        clearTimeout(timer);
        setLoadingPage(false);
      }
    };
    getData();
  }, [setLastUpdated, setLoadingPage, setRates]);

  return (
    <div className="App">
      <Header />
      <main>
        <section className="section-hero">
          <div className="hero">
            <div className="hero-text-box">
              <h1 className="heading-primary">Exchange Rates</h1>
              <p className="hero-description">
                Get the current exchange rate of different currencies against
                the Viet Nam
              </p>
            </div>
          </div>
        </section>
        <Convert />
        <ExchangeRate />
        <CountriesSupport />
      </main>
      <Footer />
      {errorMessage && <Toast message={errorMessage} type="error" />}
    </div>
  );
}

export default App;
