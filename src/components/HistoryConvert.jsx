import { useEffect, useState } from "react";

export default function HistoryConvert({ isOpen, onClose }) {
  const [histories, setHistories] = useState([]);

  const handleClearHistory = () => {
    localStorage.removeItem("historyConvert");
    setHistories([]);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    const handelEscClose = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handelEscClose);
    return () => {
      document.body.classList.remove("no-scroll");
      document.removeEventListener("keydown", handelEscClose);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    const historyStorage =
      JSON.parse(localStorage.getItem("historyConvert")) ?? [];
    setHistories(historyStorage);
  }, []);

  return (
    <div
      className="history-convert"
      onClick={(e) => {
        if (e.target.classList.contains("history-convert")) onClose();
      }}
    >
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
                    <span className="history-convert__amount-wrap">
                      <span className="history-convert__amount-from">
                        {history.isToVND
                          ? history.amountForeign
                          : history.amountVND}
                      </span>{" "}
                      {history.isToVND
                        ? `${history.currencyNameForeign} (${history.codeForeign})`
                        : " VietNam (VND)"}
                    </span>{" "}
                    <span className="history-convert__symbol">-</span>{" "}
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
            <div className="history-convert__empty">
              <p className="history-convert__empty__text">
                No history convert...{" "}
              </p>
              <span className="history-convert__empty__icon">
                <ion-icon name="pulse"></ion-icon>
              </span>
            </div>
          )}
        </ul>
        {histories.length > 0 && (
          <div className="history-convert__clear">
            <button
              className="history-convert__btn"
              onClick={handleClearHistory}
            >
              <span className="history-convert__btn-icon">
                <ion-icon name="trash-outline" />
              </span>
              Clear history
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
