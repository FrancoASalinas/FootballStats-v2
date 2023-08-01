export default function useFavoriteData(
  key: string,
  type: 'retrieveKey'
): string[];
export default function useFavoriteData(key: string, type: 'remove'): void;
export default function useFavoriteData(
  key: string,
  type: 'add',
  data: string
): void;
export default function useFavoriteData(
  key: string,
  type: 'retrieveKey' | 'add' | 'remove',
  data?: string
) {
  if (type === 'add' && data !== undefined) {
    window.localStorage.setItem(key, data);
  } else if (type === 'remove') {
    window.localStorage.removeItem(key);
  } else if (type === 'retrieveKey') {
    const arr = [];
    for (let i = 0; i < window.localStorage.length; i++) {
      if (window.localStorage.key(i)?.includes(key)) {
        arr.push(window.localStorage.key(i));
      }
    }
    return arr;
  }
}

export function dataIsFavorite(key: string) {
  if (
    window.localStorage.getItem(key) !== null &&
    window.localStorage.getItem(key) !== ''
  ) {
    return true;
  } else return false;
}
