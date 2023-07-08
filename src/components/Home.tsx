import ButtonAndRates from "./ButtonAndRates";
import FromCurrencyCard from "./FromCurrencyCard";
import AustralianFlag from "../assets/au.svg";
import CanadianFlag from "../assets/ca.svg";
import EU_Flag from "../assets/eu.svg";
import BritishFlag from "../assets/gb.svg";
import US_Flag from "../assets/us.svg";
import ToCurrencyCard from "./ToCurrency";

export default function Home() {
  const options = [
    { label: "Select Account" },
    { flag: US_Flag, label: "USD", value: "0.5889", sign: "$" },
    { flag: BritishFlag, label: "GBP", value: "1 ", sign: "£" },
    { flag: EU_Flag, label: "EUR", value: "0.2223", sign: "€" },
    { flag: AustralianFlag, label: "AUD", value: "0.5889", sign: "AU$" },
    { flag: CanadianFlag, label: "CAD", value: "0.2223", sign: "CA$" },
  ];
  const options2 = [
    { label: "Select Account" },
    { flag: BritishFlag, label: "GBP", value: "1 ", sign: "£" },
    { flag: US_Flag, label: "USD", value: "0.5889", sign: "$" },
    { flag: EU_Flag, label: "EUR", value: "0.2223", sign: "€" },
    { flag: AustralianFlag, label: "AUD", value: "0.5889", sign: "AU$" },
    { flag: CanadianFlag, label: "CAD", value: "0.2223", sign: "CA$" },
  ];

  return (
    <div className="w-[100%] pt-4 h-screen flex flex-col items-center">
      <h1 className=" text-3xl text-center pb-[5%]">Exchange money</h1>
      <div className="w-[100%] flex gap-[5%] justify-center">
        <FromCurrencyCard options={options} />
        <ToCurrencyCard options={options2} />
      </div>
      <div className="w-full px-[10%]">
        <ButtonAndRates />
      </div>
    </div>
  );
}
