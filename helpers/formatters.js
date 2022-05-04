export const currencyFormat = (num) => {
  return "$" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};

export const standardThousandsFormatter = Intl.NumberFormat("en-US");

export const internationalFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
