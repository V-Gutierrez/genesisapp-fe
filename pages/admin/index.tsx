import type { NextPage } from 'next';
import NotFound from 'pages/404';
import dynamic from 'next/dynamic';
import { useUser } from 'context/UserContext';

const AdminDashboard = dynamic(() => import('sections/Admin'));

const AdminPage: NextPage = () => {
  const { isAdmin } = useUser();

  if (isAdmin) return <AdminDashboard />;
  return <NotFound />;
};

export default AdminPage;
