function LayoutHeader({ name, src }: { name: string; src: string }) {
  return (
    <div className="flex justify-between">
      <h1 className="text-3xl ">{name}</h1>
      <img src={src} className="w-20" />
    </div>
  );
}

export default LayoutHeader;
