import React from "react";

type Props = {
  id: string;
  type: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputBox = ({ id, type = "text", label, value, onChange }: Props) => {
  return (
    <div className="relative mt-2 w-full">
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        className="border peer block w-full rounded-lg border-gray-300 bg-transparent px-2.5 pt-4 pb-2.5 text-sm focus:border-blue-900 focus:outline-none focus:ring-0"
        placeholder=" "
        autoComplete="off"
      />
      <span className="absolute left-1 top-2 -translate-y-4 scale-75 transform cursor-text select-none px-2 text-sm duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-0 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-900">
        {label}
      </span>
    </div>
  );
};

export default InputBox;
