import * as React from "react";
import {
  AmountToConvertState,
  ExchangeRateState,
} from "./State_management/atoms";
import { doc, setDoc } from "firebase/firestore";

import { CurrencyProps, option } from "./FromCurrencyCard";
import { useRecoilState, useSetRecoilState } from "recoil";
const date = new Date();
const year = date.getFullYear();
const month = date.getMonth();
const day = date.getDate();
const todaysDate: string = `${year}-${month}-${day}`;
const yesterdaysDate: string = `${year}-${month}-${day - 1}`;

export default function Accounts(props: CurrencyProps) {
  // Prop values
  const options = props.options;
  const firstOptionLabel = options[0].label;
  const firstOptionValue = options[0].value;
  const firstOptionSign = options[0].sign;
  // States
  const [todaysChange, setTodaysChange] = React.useState(0);
  const [amountToConvert, setAmountToConvert] =
    useRecoilState(AmountToConvertState);
  const [value, setValue] = React.useState<option>(
    firstOptionLabel === "USD"
      ? { label: "USD", value: "1", sign: "$" }
      : {
          label: firstOptionLabel,
          value: firstOptionValue,
          sign: firstOptionSign,
        }
  );
  const setExchangeRate = useSetRecoilState(ExchangeRateState);

  const host = "api.frankfurter.app";
  const convertCurrency = async (
    initialCurrency: string,
    destinationCurrency: string,
    amount: number
  ) => {
    await fetch(
      `https://${host}/latest?amount=${amount}&from=${initialCurrency}&to=${destinationCurrency}`
    )
      .then((res) => res.json())
      .then((data) => {
        setExchangeRate(data);
      });
  };

  const getTodaysChange = async (
    amount: number,
    initialCurrency: string,
    destinationCurrency: string
  ) => {
    await fetch(
      `https://${host}/${yesterdaysDate}..${todaysDate}?amount=${amount}&from=${initialCurrency}&to=${destinationCurrency}`
    )
      .then((res) => res.json())
      .then((data) => {
        setTodaysChange(data);
      });
  };

  React.useEffect(() => {
    convertCurrency(value.label, "USD", 1);
    // getRateChange(value.label,);
  }, [value.label]);

  const handleAccountSelect = (e: {
    target: { value: React.SetStateAction<any> };
  }) => {
    setValue({
      ...value,
      label: e.target.value,
      value: setCurrentValueInDollar(e.target.value),
      sign: setCurrentSign(e.target.value),
    });
  };

  return (
    <div className="">
      <div className="relative pb-2 hover:border-b-black border-b-[1px]">
        <select
          className="w-[100%] outline-none"
          value={value.label}
          onChange={handleAccountSelect}
        >
          {options.map((option, index) => (
            <option key={index} value={option.label}>
              {option.label}
            </option>
          ))}
        </select>
        <div className=" absolute bottom-[25%] right-4 text-right px-1 text-slate-400">
          USD {value.value}
        </div>
      </div>
      <hr className="" />
      <div>
        <span className="text-[400%]">{value.sign}</span>
        <input
          className="h-[20vh] w-10/12 text-[400%] outline-none"
          value={amountToConvert.amount!}
          onChange={(e) => {
            setAmountToConvert({
              ...amountToConvert,
              amount: Number(e.target.value),
            });
          }}
        />
      </div>
    </div>
  );
}
export function setCurrentSign(label: string) {
  switch (label) {
    case "GBP":
      return "£";
    case "EUR":
      return "€";
    case "AUD":
      return "AU$";
    case "CAD":
      return "CA$";
    default:
      return "$";
  }
}
export function setCurrentValueInDollar(label: string) {
  switch (label) {
    case "GBP":
      return "0.5889";
    case "NGN":
      return "0.2223";
    case "SA":
      return "0.2223";
    case "NZL":
      return "0.5889";
    case "UGA":
      return "1";
    default:
      return "1";
  }
}
