import { atom, selector } from "recoil";
import { balanceElement } from "../types";

export const NewCurrencyState = atom({
  key: "newCurrency",
  default: "GBP",
});
export const ExchangeRateState = atom({
  key: "exchangeRateState",
  default: 1,
});
export const NewExchangeRateState = selector({
  key: "exchangeRate",
  get: ({ get }) => {
    return { currency: get(NewCurrencyState), rate: get(ExchangeRateState) };
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
export const OriginalAmountState = atom({
  key: "originalAmountConvert",
  default: {
    amount: 0,
  },
});
export const OriginalCurrencyState = atom({
  key: "originalCurrency",
  default: {
    currency: "USD",
  },
});
export const currentUserID = atom({
  key: "currentUser",
  default: "",
});
const balanceObj: balanceElement = {};
export const userBalance = atom({
  key: "userBalance",
  default: balanceObj,
});
export const didTransactState = atom({
  key: "didTransact",
  default: 0,
});
