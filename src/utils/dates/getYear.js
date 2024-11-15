const getYears = (startingYear = 2015) => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let year = startingYear; year <= currentYear; year++) {
    years.push(year);
  }
  return years;
};

export default getYears;
