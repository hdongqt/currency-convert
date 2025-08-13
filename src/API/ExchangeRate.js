export const getExchangeRate = async () => {
  return fetch(`${import.meta.env.VITE_API_URL}`);
};
