import * as React from "react";
type option = {
  label: string;
  value: number;
};
interface props {
  options: Array<option>;
}

export default function Dropdown(props: props) {
  const [value, setValue] = React.useState(String);

  const handleChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setValue(e.target.value);
  };

  const options = props.options;

  return (
    <div>
      <select className="w-[100%]" value={value} onChange={handleChange}>
        {options.map((option) => (
          <option value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  );
}
