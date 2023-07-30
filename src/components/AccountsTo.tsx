import * as React from "react";
import { setCurrentSign, setCurrentValueInDollar } from "./AccountsFrom";
import { balanceElement } from "../types";
import { CurrencyProps, option } from "../types";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  ExchangeRateState,
  OriginalCurrencyState,
  OriginalAmountState,
  NewCurrencyState,
  userBalance,
} from "../State_management/atoms";
import { db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { Box, Modal, Typography } from "@mui/material";
import { style } from "../pages/Login";

// Determine how the rate data fetched should look
interface rateObj {
  [key: string]: number;
}

export default function Accounts(props: CurrencyProps) {
  // Prop values
  const options = props.options;
  const firstOptionLabel = options[1].label;
  const firstOptionValue = options[1].value;
  const firstOptionSign = options[1].sign;

  // States;
  const originalCurrency = useRecoilValue(OriginalCurrencyState);
  const { amount } = useRecoilValue(OriginalAmountState);
  const setNewCurrency = useSetRecoilState(NewCurrencyState);
  const [conversionRate, setConversionRate] = useRecoilState(ExchangeRateState);
  // globalBalance and currentBalance hold the same value with the difference
  // being that global balance is globally accessible
  const [globalBalance, setGlobalBalance] = useRecoilState(userBalance);
  const [currentBalance, setCurrentBalance] = React.useState<balanceElement>(
    {}
  );
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
  const [modalInfo, setModalInfo] = React.useState({
    open: false,
    errorMessage: "",
  });
  const errorMessage = modalInfo.errorMessage;

  // Update the values of the currency properties
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
  const getConversionRate = async () => {
    const currency = value.label;
    const rateObj = await convertCurrency(
      originalCurrency.currency,
      value.label,
      1
    );
    const rate = rateObj[currency];
    setConversionRate(rate);
  };
  // Fetch user account balances
  const getBalances = async () => {
    const userID = localStorage.getItem("userID")!; // Store userID locally
    const docRef = doc(db, "User Account Details", userID);
    const docSnap = await getDoc(docRef);
    let newBalances: balanceElement;
    if (docSnap.exists()) {
      const response = docSnap.data();
      newBalances = { ...response };
      setCurrentBalance(newBalances);
      setGlobalBalance({
        ...globalBalance,
        AUD: currentBalance.AUD,
        CAD: currentBalance.CAD,
        EUR: currentBalance.EUR,
        GBP: currentBalance.GBP,
        USD: currentBalance.USD,
      });
    } else {
      // docSnap.data() will be undefined in this case
      setModalInfo({ ...modalInfo, errorMessage: "No such document" });
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
  const handleClose = () => setModalInfo({ ...modalInfo, open: false });

  React.useEffect(() => {
    setNewCurrency(value.label);
    getConversionRate();
    setFinalAmount(amount * conversionRate);
    getBalances();
  }, [value.label, amount, originalCurrency]);

  return (
    <div className=" max-md:text-xs">
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
          {value.label} {currentBalance[value.label]}
        </div>
      </div>
      <hr className="" />
      <div className="flex mt-4 max-md:-mt-4 items-center">
        <span className="text-[350%] w-min">{value.sign}</span>
        <div className="h-[20vh] w-10/12 text-[350%] outline-none flex items-center overflow-hidden">
          {finalAmount.toFixed(2)}
        </div>
      </div>
      <Modal
        open={modalInfo.open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            className=" flex justify-center"
            variant="h6"
            component="h2"
          >
            <span className=" text-lg font-semibold text-center">
              {errorMessage == "Firebase: Error (auth/wrong-password)."
                ? "Invalid Password"
                : errorMessage == "Firebase: Error (auth/user-not-found)."
                ? "Invalid email"
                : errorMessage == "Firebase: Error (auth/popup-blocked)."
                ? "Popup Blocked"
                : errorMessage ==
                  "Firebase: Error (auth/network-request-failed)."
                ? "Network Request Failed"
                : errorMessage}
            </span>
          </Typography>
        </Box>
      </Modal>
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
