const getLocalDate = (date) => {
  const localDate = new Date(date).toLocaleString("en-IN", {
    month: "long",
    day: "2-digit",
    year: "numeric",
    hour12: true,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  return localDate;
};

export default getLocalDate;
