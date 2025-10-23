import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function DashboardLayout() {
  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      
      <Sidebar />

      <main 
        style={{ 
          flex: 1, 
          overflowY: 'auto', 
          padding: '20px', 
          backgroundColor: '#f4f7f6' 
        }}
      >
        <Outlet />
      </main>
    </div>
  );
}