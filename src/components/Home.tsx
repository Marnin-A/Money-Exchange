import ButtonAndRates from "./ButtonAndRates";
import FromCurrencyCard from "./FromCurrencyCard";
import ToCurrencyCard from "./ToCurrency";

export default function Home() {
  const options = [
    { label: "GBP", value: "1 ", sign: "£" },
    { label: "USD", value: "0.5889", sign: "$" },
    { label: "EUR", value: "0.2223", sign: "€" },
    { label: "AUD", value: "0.5889", sign: "AU$" },
    { label: "CAD", value: "0.2223", sign: "CA$" },
  ];
  const options2 = [
    { label: "GBP", value: "1 ", sign: "£" },
    { label: "USD", value: "0.5889", sign: "$" },
    { label: "EUR", value: "0.2223", sign: "€" },
    { label: "AUD", value: "0.5889", sign: "AU$" },
    { label: "CAD", value: "0.2223", sign: "CA$" },
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
