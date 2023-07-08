import * as React from "react";
import {
  OriginalAmountState,
  OriginalCurrencyState,
} from "./State_management/atoms";
// import { doc, setDoc } from "firebase/firestore";
import { CurrencyProps, option } from "./FromCurrencyCard";
import { useRecoilState, useSetRecoilState } from "recoil";

export default function Accounts(props: CurrencyProps) {
  // Prop values
  const options = props.options;
  const firstOptionLabel = options[1].label;
  const firstOptionValue = options[1].value;
  const firstOptionSign = options[1].sign;
  // States
  // const [todaysChange, setTodaysChange] = React.useState(0);
  const [originalAmount, setOriginalAmount] =
    useRecoilState(OriginalAmountState);
  const [value, setValue] = React.useState<option>(
    firstOptionLabel === "USD"
      ? { label: "USD", value: "1", sign: "$" }
      : {
          label: firstOptionLabel,
          value: firstOptionValue,
          sign: firstOptionSign,
        }
  );
  const originalCurrency = useSetRecoilState(OriginalCurrencyState);

  React.useEffect(() => {
    // getRateChange(value.label,);

    originalCurrency({ currency: value.label });
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
          {options.map((option, index) => {
            return (
              <>
                <option key={index} value={option.label}>
                  {option.label}
                </option>
              </>
            );
          })}
        </select>
        <div className=" absolute bottom-[25%] right-4 text-right px-1 text-slate-400">
          USD {value.value}
        </div>
      </div>
      <hr className="" />
      <div className="flex items-center">
        <span className="text-[350%]">{value.sign}</span>
        <input
          className="h-[20vh] w-10/12 text-[350%] outline-none overflow-hidden"
          type="number"
          pattern="^[1-9]\d*(\.\d+)?"
          value={originalAmount.amount.toString()}
          onChange={(e) => {
            setOriginalAmount({
              ...originalAmount,
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
