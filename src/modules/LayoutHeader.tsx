import { FavoriteButton } from './FavoriteButton';

function LayoutHeader({
  name,
  src,
  favorite,
  isFavorite,
  onClick,
}: {
  name: string;
  src?: string;
  favorite?: boolean;
  isFavorite?: boolean;
  onClick?: any;
}) {
  return (
    <div className="flex justify-between">
      <div>
        <h1 className="text-3xl ">{name}</h1>
        {favorite && (
          <FavoriteButton
            isFavorite={isFavorite as boolean}
            onClick={onClick}
          />
        )}
      </div>
      <img src={src} className="w-20" />
    </div>
  );
}

export default LayoutHeader;
