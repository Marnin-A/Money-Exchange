import Dropdown from "./Dropdown";
import * as React from "react";
type option = {
  label: string;
  value: string;
};
interface props {
  options: Array<option>;
}
export default function CurrencyCard(props: props) {
  const [sign, setSign] = React.useState("$");
  const options = props.options;
  const setNewSign = (currenySign: string) => {
    setSign(currenySign);
    console.log(currenySign);
  };
  return (
    <div className="  w-[40%] border">
      <div className=" bg-white w-[100%] flex flex-col px-4 pt-2 ">
        <div className=" text-slate-400 ">From</div>
        <Dropdown options={options} setSign={setNewSign} />
        <hr className="" />
      </div>
      <div>
        <span className="text-[400%]">{sign}</span>
        <input className="h-[30vh] w-10/12 text-[400%] outline-none" type="" />
      </div>
    </div>
  );
}
