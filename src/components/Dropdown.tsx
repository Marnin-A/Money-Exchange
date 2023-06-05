import * as React from "react";
type option = {
  label: string;
  value: string;
};
interface props {
  options: Array<option>;
}

export default function Dropdown(props: props) {
  const options = props.options;
  const firstOptionLabel = options[0].label;
  const firstOptionValue = options[0].value;

  const [value, setValue] = React.useState(
    firstOptionLabel === "USD" ? "1" : firstOptionValue
  );

  const handleChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setValue(e.target.value);
  };

  return (
    <div className="relative pb-2 hover:border-b-black border-b-[1px]">
      <select
        className="w-[100%] outline-none"
        value={value}
        onChange={handleChange}
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className=" absolute bottom-[25%] right-4 text-right px-1 text-slate-400">
        USD {value}
      </div>
    </div>
  );
}
