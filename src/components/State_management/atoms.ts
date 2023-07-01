import { atom } from "recoil";

export const ExchangeRateState = atom({
  key: "exchangeRate",
  default: {
    amount: 1,
    base: "GBP",
    date: "2023-06-28",
    rates: { USD: 1.2657 },
  },
});
export const TodaysChangeState = atom({
  key: "todaysChange",
  default: {
    value: 1,
    base: "GBP",
    date: "2023-06-28",
    rates: { USD: 1.2657 },
  },
});
export const AmountToConvertState = atom({
  key: "amountToConvert",
  default: {
    amount: 1,
  },
});
export const RecieveingCurrencyState = atom({
  key: "recieveingCurrency",
  default: {
    currency: "",
  },
});
