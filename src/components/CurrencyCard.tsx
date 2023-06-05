import Dropdown from "./Dropdown";
type option = {
  label: string;
  value: string;
};
interface props {
  options: Array<option>;
}
export default function CurrencyCard(props: props) {
  const options = props.options;
  return (
    <div className=" bg-white w-[40%] flex flex-col p-4 border">
      <div className=" text-slate-400">From</div>
      <Dropdown options={options} />
      <hr className="bg-black self-center m-4 w-[100%]" />
    </div>
  );
}
