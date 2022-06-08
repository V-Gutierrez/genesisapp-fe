import Events from 'sections/Admin/Events';
import type { NextPage } from 'next';
import NotFound from 'pages/404';
import { useUser } from 'context/UserContext';

const DevotionalsPage: NextPage = () => {
  const { isAdmin } = useUser();

  if (isAdmin) return <Events />;
  return <NotFound />;
};

export default DevotionalsPage;
