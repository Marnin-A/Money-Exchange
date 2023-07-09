import * as React from "react";
import {
  OriginalAmountState,
  OriginalCurrencyState,
  userBalance,
} from "./State_management/atoms";
import { doc, getDoc } from "firebase/firestore";
import { CurrencyProps, option } from "./FromCurrencyCard";
import { useRecoilState, useSetRecoilState } from "recoil";
import { db } from "../firebase/firebase";

type balanceElement = {
  [key: string]: number;
};
export type balance = {
  AUD: 10000;
  CAD: 10000;
  EUR: 10000;
  GBP: 10000;
  USD: 10000;
};

export default function Accounts(props: CurrencyProps) {
  // Prop values
  const options = props.options;
  const firstOptionLabel = options[1].label;
  const firstOptionValue = options[1].value;
  const firstOptionSign = options[1].sign;

  // States
  const [allBalances, setUserBalance] = useRecoilState(userBalance);
  const [currentBalance, setCurrentBalance] = React.useState<balanceElement>(
    {}
  );
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
  const setOriginalCurrency = useSetRecoilState(OriginalCurrencyState);
  const userID = localStorage.getItem("userID")!;

  // Fetch user account balances
  const getBalances = async () => {
    const docRef = doc(db, "User Account Details", userID);
    const docSnap = await getDoc(docRef);
    let newBalances: balanceElement;
    if (docSnap.exists()) {
      const response = docSnap.data();
      console.log({ status: "fetched", response });
      newBalances = { ...response };
      setCurrentBalance(newBalances);
      setUserBalance({
        ...allBalances,
        AUD: response.AUD,
        CAD: response.CAD,
        EUR: response.EUR,
        GBP: response.GBP,
        USD: response.USD,
      });
      console.log(response);
    } else {
      // docSnap.data() will be undefined in this case
      console.error("No such document!");
      return {
        AUD: 10000,
        CAD: 10000,
        EUR: 10000,
        GBP: 10000,
        USD: 10000,
      };
    }
  };

  // Set the currency to convert from
  React.useEffect(() => {
    getBalances();
    console.log(currentBalance);
    setOriginalCurrency({ currency: value.label });
  }, [value.label]);

  // Select an account based on currency
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

  console.log(currentBalance);
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
              <option key={index} value={option.label}>
                {option.label}
              </option>
            );
          })}
        </select>
        <div className=" absolute bottom-[25%] right-4 text-right px-1 text-slate-400">
          {value.label} {currentBalance[value.label]}
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
