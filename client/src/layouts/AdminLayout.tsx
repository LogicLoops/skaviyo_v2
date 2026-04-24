import { Outlet } from 'react-router-dom';
import Sidebar from '../admin/components/Sidebar';

const AdminLayout = () => (
  <div className="flex h-screen bg-[#EAF4F1]">
    <Sidebar />
    <div className="flex-1 flex flex-col overflow-hidden ml-64">
      <Outlet />
    </div>
  </div>
);

export default AdminLayout;
