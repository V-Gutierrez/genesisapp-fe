import type { NextPage } from 'next';
import NotFound from 'pages/404';
import Users from 'sections/Admin/Users';
import { useUser } from 'context/UserContext';

const DevotionalsPage: NextPage = () => {
  const { isAdmin } = useUser();

  if (isAdmin) return <Users />;
  return <NotFound />;
};

export default DevotionalsPage;
