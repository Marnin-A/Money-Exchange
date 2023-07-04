import * as React from "react";
import { setCurrentSign, setCurrentValueInDollar } from "./AccountsFrom";
import { CurrencyProps, option } from "./FromCurrencyCard";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  ExchangeRateState,
  OriginalCurrencyState,
  OriginalAmountState,
  NewCurrencyState,
} from "./State_management/atoms";

// Determine how the rate data fetched should look
interface rateObj {
  [key: string]: number;
}

export default function Accounts(props: CurrencyProps) {
  // Prop values
  const options = props.options;
  const firstOptionLabel = options[0].label;
  const firstOptionValue = options[0].value;
  const firstOptionSign = options[0].sign;

  // States;
  const originalCurrency = useRecoilValue(OriginalCurrencyState);
  const { amount } = useRecoilValue(OriginalAmountState);
  const setNewCurrency = useSetRecoilState(NewCurrencyState);
  const [conversionRate, setConversionRate] = useRecoilState(ExchangeRateState);
  const [finalAmount, setFinalAmount] = React.useState(1);
  const [value, setValue] = React.useState<option>(
    firstOptionLabel === "USD"
      ? { label: "USD", value: "1", sign: "$" }
      : {
          label: firstOptionLabel,
          value: firstOptionValue,
          sign: firstOptionSign,
        }
  );

  const handleCurrencyChange = (e: {
    target: { value: React.SetStateAction<any> };
  }) => {
    setValue({
      ...value,
      label: e.target.value,
      value: setCurrentValueInDollar(e.target.value),
      sign: setCurrentSign(e.target.value),
    });
  };
  // Fetch and set rate information
  const getRate = async () => {
    const currency = value.label;
    const rateObj = await convertCurrency(
      originalCurrency.currency,
      value.label,
      1
    );
    const rate = rateObj[currency];
    setConversionRate(rate);
  };

  React.useEffect(() => {
    setNewCurrency(value.label);
    getRate();
    setFinalAmount(amount * conversionRate);
  }, [value.label, amount]);

  return (
    <div className="">
      <div className="relative pb-2 hover:border-b-black border-b-[1px]">
        <select
          className="w-[100%] outline-none"
          value={value.label}
          onChange={handleCurrencyChange}
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
const host = "api.frankfurter.app";
const convertCurrency = (
  initialCurrency: string,
  destinationCurrency: string,
  amount: number
): Promise<rateObj> => {
  return fetch(
    `https://${host}/latest?amount=${amount}&from=${initialCurrency}&to=${destinationCurrency}`
  )
    .then((res) => res.json())
    .then((data) => {
      const rate = data.rates;
      console.log(rate);
      console.log(data);
      return rate;
    })
    .catch((error) => console.error(error));
};
