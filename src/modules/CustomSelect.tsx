interface Props {
  children: React.ReactNode;
  onChange: any;
  defaultValue?: string | number;
}

function CustomSelect({ children, onChange, defaultValue }: Props) {
  return (
    <select
      className="dark:text-black scroll-auto"
      onChange={onChange}
      defaultValue={defaultValue}
    >
      {children}
    </select>
  );
}

export default CustomSelect;
