import { useContext } from "react";
import { RatesContext } from "../context/RatesContext";

export default function ExchangeRate() {
  const { rates, lastUpdated, sectionRefs } = useContext(RatesContext);
  return (
    <section className="container" ref={sectionRefs.current["exchange-rate"]}>
      <h2 className="heading-secondary">Exchange rate</h2>
      <div className="exchange-rate">
        <table id="table-rate">
          <thead>
            <tr>
              <th scope="col" className="table-rate__currency">
                Currency code
              </th>
              <th scope="col">Currency name</th>
              <th scope="col">Cash buying rate</th>
              <th scope="col">Transfer buying rate</th>
              <th scope="col">Selling rate</th>
            </tr>
          </thead>
          <tbody>
            {rates &&
              rates.length > 0 &&
              rates.map((rate) => (
                <tr key={rate?.currencyCode}>
                  <td>
                    <span className="table-rate__currency">
                      {" "}
                      {rate?.flag && (
                        <img src={rate?.flag} alt={rate?.currencyCode} />
                      )}
                      {rate?.currencyCode}
                    </span>
                  </td>
                  <td>{rate?.currencyName}</td>
                  <td>{rate?.buy}</td>
                  <td>{rate?.transfer}</td>
                  <td>{rate?.sell}</td>
                </tr>
              ))}
          </tbody>
        </table>
        <ul className="exchange-rate__note">
          <li className="exchange-rate__note-update__time">
            Exchange rates are last updated at <strong>{lastUpdated}</strong>
          </li>
          <li>The data is updated every 2 minutes.</li>
          <li>The information is for reference only</li>
        </ul>
      </div>
    </section>
  );
}
