interface Props {
  onChange: React.ChangeEventHandler;
  checked: any;
  children: React.ReactNode;
}

export default function Slider({ onChange, checked, children }: Props) {
  return (
    <label className="relative inline-block w-[60px] h-[34px]">
      <input
        type="checkbox"
        className="opacity-0 w-0 h-0 peer"
        onChange={onChange}
        checked={checked}
      />
      {children}
    </label>
  );
}
