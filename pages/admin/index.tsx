import AdminDashboard from 'sections/Admin';
import type { NextPage } from 'next';
import NotFound from 'pages/404';
import { useUser } from 'context/UserContext';

const AdminPage: NextPage = () => {
  const { isAdmin } = useUser();

  if (isAdmin) return <AdminDashboard />;
  return <NotFound />;
};

export default AdminPage;
