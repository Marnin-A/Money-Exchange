import { useRecoilState, useRecoilValue } from "recoil";
import { doc, updateDoc } from "firebase/firestore";
import {
  ExchangeRateState,
  NewCurrencyState,
  OriginalAmountState,
  OriginalCurrencyState,
  didTransactState,
  userBalance,
} from "./State_management/atoms";
import React from "react";
import { db } from "../firebase/firebase";
import { balanceElement } from "./AccountsFrom";
export default function ButtonAndRates() {
  const rate = useRecoilValue(ExchangeRateState);
  const [currentRate, setCurrentRate] = React.useState(1);
  // const [rateChange, setRateChange] = React.useState({});
  const originalCurrency = useRecoilValue(OriginalCurrencyState);
  const newCurrency = useRecoilValue(NewCurrencyState);
  const originalAmount = useRecoilValue(OriginalAmountState);
  const [userBalances, setUserBalances] = useRecoilState(userBalance);
  const [didTransact, setDidTransact] = useRecoilState(didTransactState);
  React.useEffect(() => {
    setCurrentRate(rate);
    // setRateChange(
    //   getTodaysChange(
    //     originalCurrency.currency,
    //     newCurrency,
    //     todaysDate,
    //     yesterdaysDate
    //   )
    // );
  }, [rate]);
  const transferAmount = async () => {
    const userID = localStorage.getItem("userID")!;
    const accountDocRef = doc(db, "User Account Details", userID);
    const key1 = originalCurrency.currency;
    const key2 = newCurrency;
    const userAccount: balanceElement = { ...userBalances };
    const newValue1 = userAccount[key1] - originalAmount.amount; // Subtract from original account
    const newValue2 = userAccount[key2] + originalAmount.amount; // Add to second account
    await updateDoc(accountDocRef, {
      [key1]: newValue1,
      [key2]: newValue2,
    });
    setUserBalances({ ...userBalances, [key1]: newValue1, [key2]: newValue2 });
    setDidTransact(didTransact + 1);
  };

  return (
    <div className=" w-[100%] grid grid-cols-2 gap-[12%] items-center">
      <div>
        <button
          onClick={transferAmount}
          className=" bg-[#FDDAEF] text-white hover:bg-[#E70083] w-full p-2 rounded-3xl font-semibold"
        >
          Continue
        </button>
      </div>
      <div className="grid grid-cols-4">
        <div className="grid grid-rows-1">
          <span className=" text-xs text-zinc-500">Current Rate</span>
          <div>{currentRate}</div>
        </div>
        <div className="grid grid-rows-1">
          <span className=" text-xs text-zinc-500">Today's Change</span>
          <div>0.000058</div>
        </div>
      </div>
    </div>
  );
}
// Add a leading zero to the month of day if its a single digit
// const addLeadingZero = (number: number): string => {
//   return number.toString().padStart(2, "0");
// };
// Get date value
// const date = new Date();
// const day = date.getDate();
// const year = date.getFullYear();
// const month = addLeadingZero(date.getMonth());
// const todaysDate: string = `${year}-${month}-${addLeadingZero(day)}`;
// const yesterdaysDate: string = `${year}-${month}-${addLeadingZero(day - 1)}`;
// // console.log({ st: todaysDate, nd: yesterdaysDate });
// const number = 10;

// console.log(number.toString().padStart(2, "0"));

// // Define function to get change in currency values in 1 day
// const host = "api.frankfurter.app";
// const getTodaysChange = (
//   initialCurrency: string,
//   destinationCurrency: string,
//   yesterdaysDate: string,
//   todaysDate: string
// ): any => {
//   return fetch(`https://${host}/currencies`)
//     .then((res) => res.json())
//     .then((data) => {
//       return data;
//     })
//     .catch((error) => console.error(error));
// };
