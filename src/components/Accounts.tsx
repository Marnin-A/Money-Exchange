import * as React from "react";
import { CurrencyProps, option } from "./CurrencyCard";

export default function Accounts(props: CurrencyProps) {
  const options = props.options;
  const firstOptionLabel = options[0].label;
  const firstOptionValue = options[0].value;
  const firstOptionSign = options[0].sign;
  //Change value to label
  const [value, setValue] = React.useState<option>(
    firstOptionLabel === "USD"
      ? { label: "USD", value: "1", sign: "$" }
      : {
          label: firstOptionLabel,
          value: firstOptionValue,
          sign: firstOptionSign,
        }
  );

  function setCurrentValueInDollar(label: string) {
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
  function setCurrentSign(label: string) {
    switch (label) {
      case "GBP":
        return "P";
      case "NGN":
        return "N";
      case "SA":
        return "A";
      case "NZL":
        return "Z";
      case "UGA":
        return "G";
      default:
        return "$";
    }
  }
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
      <div>
        <span className="text-[400%]">{value.sign}</span>
        <input className="h-[30vh] w-10/12 text-[400%] outline-none" type="" />
      </div>
    </div>
  );
}
