import Dropdown from "./Dropdown";
type option = {
  label: string;
  value: number;
};
interface props {
  options: Array<option>;
}
export default function CurrencyCard(props: props) {
  const options = props.options;
  return (
    <div className=" bg-white w-[40%] rounded-xl p-4 border">
      <div className=" text-slate-400">From</div>
      <Dropdown options={options} />
    </div>
  );
}
