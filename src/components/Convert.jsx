import { useContext, useEffect, useState } from "react";
import { RatesContext } from "../context/RatesContext";

const OPTIONS_TRANSACTION = [
  {
    label: "Cash buying",
    value: "buy",
  },
  {
    label: "Telegraphic Buying",
    value: "transfer",
  },
  {
    label: "Selling",
    value: "sell",
  },
];

const formatCurrency = (num) => {
  return isNaN(num) ? 0 : num.toLocaleString("en-US");
};

export default function Convert() {
  const { rates, lastUpdated, sectionRefs } = useContext(RatesContext);

  const [typeTransaction, setTypeTransaction] = useState(
    OPTIONS_TRANSACTION[0]
  );
  const [isAllowConvert, setIsAllowConvert] = useState(true);

  const [convertData, setConvertData] = useState({
    codeForeign: "USD",
    isToVND: true,
    amountForeign: 0,
    amountVND: 0,
  });

  const handleConvert = (amountFrom) => {
    if (!rates.length) return;
    amountFrom =
      amountFrom ??
      (convertData.isToVND ? convertData.amountForeign : convertData.amountVND);

    const currency = rates.find(
      (item) => item.currencyCode === convertData.codeForeign
    );
    if (!currency) return;

    if (currency?.[typeTransaction.value] === "-") {
      setIsAllowConvert(false);
      setConvertData({ ...convertData, amountForeign: 0, amountVND: 0 });
      return;
    }
    if (!isAllowConvert) setIsAllowConvert(true);
    const rateHandled = +currency[typeTransaction.value].replaceAll(",", "");
    const amount = +`${amountFrom}`.replaceAll(",", "");
    if (convertData.isToVND) {
      setConvertData({
        ...convertData,
        amountForeign: formatCurrency(amount),
        amountVND: formatCurrency(amount * rateHandled),
      });
    } else {
      setConvertData({
        ...convertData,
        amountVND: formatCurrency(amount),
        amountForeign: formatCurrency(amount / rateHandled),
      });
    }
  };

  const handleSwap = () => {
    setConvertData({
      ...convertData,
      isToVND: !convertData.isToVND,
    });
  };

  const onChangeAmount = (e) => {
    let value = e.target.value;
    if (value.length >= 24) value = value.slice(0, 23);
    handleConvert(value);
  };

  const handleChangeOptionCurrency = (e) => {
    const value = e.target.value;
    setConvertData({ ...convertData, codeForeign: value });
  };

  const disableSpecialCharacter = (e) => {
    if (
      [
        "Backspace",
        "Delete",
        "Tab",
        "Escape",
        "Enter",
        "ArrowLeft",
        "ArrowRight",
      ].includes(e.key) ||
      (e.ctrlKey && ["a", "c", "v", "x"].includes(e.key.toLowerCase()))
      // Ctrl + A/C/V/X
    )
      return;

    if (!/^\d$/.test(e.key)) {
      e.preventDefault();
    }
  };

  useEffect(() => {
    handleConvert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeTransaction, convertData.codeForeign]);

  return (
    <section className="container section-convert">
      <h2 className="heading-secondary">Currency Converter</h2>
      <div className="convert-transaction">
        <p className="convert-transaction-text">Transaction</p>
        <div className="convert-transaction-box">
          {OPTIONS_TRANSACTION.map((item) => (
            <button
              key={item.value}
              className={`convert-transaction-btn ${
                typeTransaction.value === item.value ? "active" : ""
              }`}
              onClick={() => setTypeTransaction(item)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
      <div
        className={`transfer ${convertData.isToVND ? "" : "transfer--swap"}`}
      >
        <form action="" className="convert-form">
          <label>{convertData.isToVND ? "Currency" : "Convert to"}</label>
          <div className="convert-form-select">
            <select
              id="convert-select"
              value={convertData.codeForeign}
              onChange={handleChangeOptionCurrency}
            >
              {rates &&
                rates.map((rate) => (
                  <option key={rate.currencyCode} value={rate.currencyCode}>
                    {rate.currencyCode}
                  </option>
                ))}
            </select>
            <input
              type="text"
              className="convert-form__input convert-form__input--foreign"
              onChange={onChangeAmount}
              value={convertData.amountForeign}
              onKeyDown={disableSpecialCharacter}
            />
          </div>
        </form>
        <div className="convert-swap">
          <button className="convert-swap-btn" onClick={handleSwap}>
            <ion-icon name="swap-horizontal"></ion-icon>
          </button>
        </div>
        <div className="convert-to">
          <label> {convertData.isToVND ? "Convert to" : "VND"}</label>
          <div className="convert-to__wrap-input">
            <input
              type="text"
              className="convert-form__input convert-form__input--vnd"
              value={convertData.amountVND}
              onChange={onChangeAmount}
              onKeyDown={disableSpecialCharacter}
            />
          </div>
        </div>
      </div>
      {!isAllowConvert && (
        <p className="convert-info-error">
          {typeTransaction.label} for <strong>{convertData.codeForeign}</strong>{" "}
          is not support convert
        </p>
      )}
      <p className="convert-info-text">
        The exchange rates were updated at <strong>{lastUpdated}</strong>, and
        are for reference only
      </p>
    </section>
  );
}
