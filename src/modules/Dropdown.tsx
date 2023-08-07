import { useState } from 'react';

interface Props {
  key?: string | number;
  title: string;
  children: React.ReactNode;
}

function Dropdown({ key, title, children }: Props) {
  const [toggle, setToggle] = useState(false);

  return (
    <div
      key={key}
      className="p-3 border rounded-xl border-dark my-3 dark:border-light"
    >
      <div className="flex justify-between">
        <h3>{title}</h3>
        <button onClick={() => setToggle((prev) => !prev)}>
          {toggle ? 'Close' : 'Details'}
        </button>
      </div>
      <div className={`${toggle ? 'block' : 'hidden'}`}>{children}</div>
    </div>
  );
}

export default Dropdown;
