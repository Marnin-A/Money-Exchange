import * as React from "react";
import { setCurrentSign, setCurrentValueInDollar } from "./AccountsFrom";

import { CurrencyProps, option } from "./FromCurrencyCard";
import { useRecoilValue } from "recoil";
import {
  AmountToConvertState,
  ExchangeRateState,
} from "./State_management/atoms";

export default function Accounts(props: CurrencyProps) {
  // Prop values
  const options = props.options;
  const firstOptionLabel = options[0].label;
  const firstOptionValue = options[0].value;
  const firstOptionSign = options[0].sign;

  // States
  const { amount } = useRecoilValue(AmountToConvertState);
  const { rates } = useRecoilValue(ExchangeRateState);
  const [value, setValue] = React.useState<option>(
    firstOptionLabel === "USD"
      ? { label: "USD", value: "1", sign: "$" }
      : {
          label: firstOptionLabel,
          value: firstOptionValue,
          sign: firstOptionSign,
        }
  );
  const convertionRate = rates.USD;
  const finalAmount = (amount * convertionRate).toString();
  const handleChange = (e: {
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
          onChange={handleChange}
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
      <div className="flex">
        <span className="text-[400%] w-min">{value.sign}</span>
        <div className="h-[20vh] w-10/12 text-[400%] outline-none overflow-hidden">
          {finalAmount}
        </div>
      </div>
    </div>
  );
}
