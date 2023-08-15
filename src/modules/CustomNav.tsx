interface Props {
  children: React.ReactNode;
}

function CustomNav({ children }: Props) {
  return (
    <nav className="w-full my-5">
      <ul className="flex bg-primary rounded-lg divide-x divide-dark border-dark border items-center justify-around h-10">
        {children}
      </ul>
    </nav>
  );
}

export default CustomNav;
