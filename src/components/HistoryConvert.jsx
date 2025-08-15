import { useEffect, useState } from "react";

export default function HistoryConvert({ isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isOpen]);

  const [histories, setHistories] = useState([]);

  useEffect(() => {
    let historyStorage =
      JSON.parse(localStorage.getItem("historyConvert")) ?? [];
    setHistories(historyStorage);
  }, []);
  console.log(histories);
  return (
    <div className="history-convert" onClick={onClose}>
      <div className="history-convert__content">
        <button className="history-convert__close" onClick={onClose}>
          <ion-icon name="close-outline" />
        </button>
        <div className="history-convert__header">
          <h2 className="heading-secondary">History Convert</h2>
        </div>
        <ul className="history-convert__list">
          {histories.length > 0 &&
            histories.map((history, index) => (
              <li key={index} className="history-convert__item">
                <p>
                  <span className="history-convert__type">
                    {history.typeLabel}
                  </span>
                  <span className="history-convert__time">
                    {" "}
                    - {history.createdAt}
                  </span>
                </p>
                <div className="history-convert__info">
                  <p className="history-convert__convert__description">
                    <span>
                      <span className="history-convert__amount-from">
                        {history.isToVND
                          ? history.amountForeign
                          : history.amountVND}
                      </span>{" "}
                      {history.isToVND
                        ? `${history.currencyNameForeign} (${history.codeForeign})`
                        : " VietNam (VND)"}
                    </span>{" "}
                    -{" "}
                    <span className="history-convert__amount-to">
                      {history.isToVND
                        ? history.amountVND
                        : history.amountForeign}
                    </span>{" "}
                    {history.isToVND
                      ? " VietNam (VND)"
                      : `${history.currencyNameForeign} (${history.codeForeign})`}{" "}
                  </p>
                </div>
              </li>
            ))}

          {histories.length === 0 && (
            <p>
              <span className="history-convert__type">No history</span>
            </p>
          )}
        </ul>
      </div>
    </div>
  );
}
