import CurrencyCard from "./CurrencyCard";
import ButtonAndRates from "./ButtonAndRates";

export default function Home() {
  const options = [
    { label: "USD", value: "1 ", sign: "$" },
    { label: "GBP", value: "0.5889", sign: "P" },
    { label: "NGN", value: "0.2223", sign: "N" },
  ];
  const options2 = [
    { label: "SA", value: "0.2223", sign: "A" },
    { label: "NZL", value: "0.5889", sign: "Z" },
    { label: "UGA", value: "1", sign: "G" },
  ];
  return (
    <div className="w-[100%] pt-4 h-screen flex flex-col items-center">
      <h1 className=" text-3xl text-center pb-[5%]">Exchange money</h1>
      <div className="w-[100%] flex gap-[5%] justify-center">
        <CurrencyCard options={options} />
        <CurrencyCard options={options2} />
      </div>
      <div className="w-full px-[10%]">
        <ButtonAndRates />
      </div>
    </div>
  );
}
