import { useRecoilValue } from "recoil";
import {
  ExchangeRateState,
  NewCurrencyState,
  OriginalCurrencyState,
} from "./State_management/atoms";
import React from "react";
export default function ButtonAndRates() {
  const rate = useRecoilValue(ExchangeRateState);
  const [currentRate, setCurrentRate] = React.useState(1);
  const [rateChange, setRateChange] = React.useState({});
  const originalCurrency = useRecoilValue(OriginalCurrencyState);
  const newCurrency = useRecoilValue(NewCurrencyState);
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
  // const transferAmount = (originalAmount, transferedAmount) =>{

  // }

  return (
    <div className=" w-[100%] grid grid-cols-2 gap-[12%] items-center">
      <div>
        <button className=" bg-[#FDDAEF] text-white hover:bg-[#E70083] w-full p-2 rounded-3xl font-semibold">
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
const addLeadingZero = (number: number): string => {
  return number.toString().padStart(2, "0");
};
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
