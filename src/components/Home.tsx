import CurrencyCard from "./CurrencyCard";

export default function Home() {
  const options = [
    { label: "USD", value: "1 " },
    { label: "GBP", value: "0.5889" },
    { label: "NGN", value: "0.2223" },
  ];
  const options2 = [
    { label: "SA", value: "0.2223" },
    { label: "NZL", value: "0.5889" },
    { label: "UGA", value: "1" },
  ];
  return (
    <div className="w-[100%] py-[5%] h-screen flex flex-col items-center">
      <h1 className=" text-3xl text-center pb-[8%]">Exchange money</h1>
      <div className="w-[100%] flex gap-[5%] justify-center">
        <CurrencyCard options={options} />
        <CurrencyCard options={options2} />
      </div>
    </div>
  );
}
