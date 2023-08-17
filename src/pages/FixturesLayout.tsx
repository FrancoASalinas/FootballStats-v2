import { Outlet, useNavigation } from 'react-router-dom';
import Spinner from '../modules/Spinner';

function FixturesLayout() {
  const navigation = useNavigation();

  return (
  navigation.state === 'loading' ? <Spinner/> : <Outlet />
  );
}

export default FixturesLayout;
