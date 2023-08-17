interface Props {
  children: React.ReactNode;
  onChange: any;
  defaultValue?: string | number;
}

function CustomSelect({ children, onChange, defaultValue }: Props) {
  return (
    <select
      className="scroll-auto px-2 py-1 bg-light dark:bg-dark dark:text-light "
      onChange={onChange}
      defaultValue={defaultValue}
    >
      {children}
    </select>
  );
}

export default CustomSelect;
