import { atom } from "recoil";

export const exchangeRateState = atom({
  key: "exchangeRate", // unique ID (with respect to other atoms/selectors)
  default: {
    amount: 1,
    base: "GBP",
    date: "2023-06-28",
    rates: { USD: 1.2657 },
  }, // default value (aka initial value)
});
export const todaysChangeState = atom({
  key: "todaysChange", // unique ID (with respect to other atoms/selectors)
  default: {
    value: 1,
    base: "GBP",
    date: "2023-06-28",
    rates: { USD: 1.2657 },
  }, // default value (aka initial value)
});
