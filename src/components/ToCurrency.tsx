import AccountsTo from "./AccountsTo";
import { option } from "./FromCurrencyCard";
export interface CurrencyProps {
  options: Array<option>;
}
export default function ToCurrencyCard(props: CurrencyProps) {
  const options = props.options;

  return (
    <div className="w-[40%]">
      <div className="bg-white w-[100%] flex flex-col px-4 pt-2 ">
        <div className="text-slate-400 ">To</div>
        <AccountsTo options={options} />
      </div>
    </div>
  );
}
