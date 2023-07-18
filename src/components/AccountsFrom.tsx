import * as React from "react";
import {
  OriginalAmountState,
  OriginalCurrencyState,
  didTransactState,
  userBalance,
} from "./State_management/atoms";
import { doc, getDoc } from "firebase/firestore";
import { CurrencyProps, option } from "./FromCurrencyCard";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { db } from "../firebase/firebase";
import { Box, Modal, Typography } from "@mui/material";
import { style } from "./Login";

export type balanceElement = {
  [key: string]: number;
};
//TODO: Add account balance updates

export default function Accounts(props: CurrencyProps) {
  // Prop values
  const options = props.options;
  const firstOptionLabel = options[1].label;
  const firstOptionValue = options[1].value;
  const firstOptionSign = options[1].sign;

  // States
  // globalBalance and currentBalance hold the same value with the difference
  // being that global balance is globally accessible
  const [globalBalance, setGlobalBalance] = useRecoilState(userBalance);
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
  const [modalInfo, setModalInfo] = React.useState({
    open: false,
    errorMessage: "",
  });
  const setOriginalCurrency = useSetRecoilState(OriginalCurrencyState);
  const didTransact = useRecoilValue(didTransactState);
  const userID = localStorage.getItem("userID")!;
  const errorMessage = modalInfo.errorMessage;

  // Fetch user account balances
  const getAccountBalances = async () => {
    const docRef = doc(db, "User Account Details", userID);
    const docSnap = await getDoc(docRef);
    let newBalances: balanceElement;
    if (docSnap.exists()) {
      const response = docSnap.data();
      newBalances = { ...response };
      console.log(newBalances);
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

  // Set the currency to convert from
  React.useEffect(() => {
    getAccountBalances();
    setOriginalCurrency({ currency: value.label });
  }, [value.label, didTransact]);

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
  const handleClose = () => setModalInfo({ ...modalInfo, open: false });
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
