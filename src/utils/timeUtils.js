export const convertTimestampToDateTime = (timestamp) => {
  const date = new Date(timestamp);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // months are 0-based
  const year = date.getFullYear();

  return `${hours}:${minutes}:${seconds} on ${day}/${month}/${year}`;
};
