import { useContext, useEffect, useState } from "react";
import { RatesContext } from "../context/RatesContext";
import HistoryConvert from "./HistoryConvert";
import { getLocalDateTimeString } from "../utils/timeUtils";
import useDebounce from "../hooks/useDebounce";

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
  num = +`${num}`.replaceAll(",", "");
  return isNaN(num) ? 0 : num.toLocaleString("en-US");
};

export default function Convert() {
  const { rates, lastUpdated, sectionRefs, isLoadingPage } =
    useContext(RatesContext);

  const [typeTransaction, setTypeTransaction] = useState(
    OPTIONS_TRANSACTION[0]
  );
  const [isAllowConvert, setIsAllowConvert] = useState(true);

  const [isOpenHistory, setIsOpenHistory] = useState(false);

  const [convertData, setConvertData] = useState({
    codeForeign: "USD",
    isToVND: true,
    amountForeign: "0",
    amountVND: "0",
  });

  const saveHistory = (data) => {
    let historyStorage =
      JSON.parse(localStorage.getItem("historyConvert")) ?? [];
    if (historyStorage.length > 5) historyStorage = historyStorage.slice(0, 10);
    localStorage.setItem(
      "historyConvert",
      JSON.stringify([data, ...historyStorage])
    );
  };

  const handleConvert = (amountFrom, isSwap = false) => {
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
    let newConvertData = {};

    if ((convertData.isToVND && !isSwap) || (!convertData.isToVND && isSwap)) {
      newConvertData = {
        ...convertData,
        amountForeign: formatCurrency(amount),
        amountVND: formatCurrency(amount * rateHandled),
      };
      setConvertData(newConvertData);
      saveHistory({
        ...newConvertData,
        currencyNameForeign: currency.currencyName,
        createdAt: getLocalDateTimeString(),
        typeLabel: typeTransaction.label,
      });
    } else {
      newConvertData = {
        ...convertData,
        amountVND: formatCurrency(amount),
        amountForeign: formatCurrency(amount / rateHandled),
      };
      setConvertData(newConvertData);
      saveHistory({
        ...newConvertData,
        currencyNameForeign: currency.currencyName,
        createdAt: getLocalDateTimeString(),
        typeLabel: typeTransaction.label,
      });
    }
  };

  const debounceHandleConvert = useDebounce(handleConvert, 500);

  const handleSwap = () => {
    setConvertData({
      ...convertData,
      isToVND: !convertData.isToVND,
    });
  };

  const onChangeAmount = (key, e) => {
    let value = e.target.value;
    if (value.length >= 24) value = value.slice(0, 23);
    value = formatCurrency(value);
    if (key === "amountForeign") {
      setConvertData({ ...convertData, amountForeign: value });
      debounceHandleConvert(value, !convertData.isToVND);
    } else {
      setConvertData({ ...convertData, amountVND: value });
      debounceHandleConvert(value, convertData.isToVND);
    }
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
    <>
      <section
        className="container section-convert"
        ref={sectionRefs.current["convert"]}
      >
        <div className="convert-header">
          <h2 className="heading-secondary">Currency Converter</h2>
          <button
            className="convert-history-btn"
            onClick={() => setIsOpenHistory(true)}
          >
            <ion-icon name="time-outline"></ion-icon>
            History Convert
          </button>
        </div>
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
                      {rate.currencyCode}{" "}
                      <img src={rate.flag} alt={rate.currencyCode} />
                    </option>
                  ))}
              </select>
              <input
                type="text"
                className="convert-form__input convert-form__input--foreign"
                onChange={(e) => onChangeAmount("amountForeign", e)}
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
                onChange={(e) => onChangeAmount("amountVND", e)}
                onKeyDown={disableSpecialCharacter}
              />
            </div>
          </div>
        </div>
        {!isAllowConvert && (
          <p className="convert-info-error">
            {typeTransaction.label} for{" "}
            <strong>{convertData.codeForeign}</strong> is not support convert
          </p>
        )}
        <p className="convert-info-text">
          The exchange rates were updated at <strong>{lastUpdated}</strong>, and
          are for reference only
        </p>
        {isLoadingPage && <div class="loader-overlay active"></div>}
      </section>
      {isOpenHistory && (
        <HistoryConvert
          onClose={() => setIsOpenHistory(false)}
          isOpen={isOpenHistory}
        />
      )}
    </>
  );
}
