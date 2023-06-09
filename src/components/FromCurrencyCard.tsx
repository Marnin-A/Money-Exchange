import Accounts from "./AccountsFrom";
export type option = {
  flag?: string;
  label: string;
  value?: string;
  sign?: string;
};
export interface CurrencyProps {
  options: Array<option>;
}
export default function FromCurrencyCard(props: CurrencyProps) {
  const options = props.options;

  return (
    <div className="w-[40%]">
      <div className="bg-white w-[100%] flex flex-col px-4 pt-2 ">
        <div className="text-slate-400 ">From</div>
        <Accounts options={options} />
      </div>
    </div>
  );
}
