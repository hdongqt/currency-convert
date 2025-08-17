import { useContext } from "react";
import { RatesContext } from "./../context/RatesContext";

export default function PageLoading() {
  const { isLoadingPage } = useContext(RatesContext);
  if (!isLoadingPage) return null;
  return (
    <div className="page-loading__container">
      <div className="page-loading__icon"></div>
    </div>
  );
}
