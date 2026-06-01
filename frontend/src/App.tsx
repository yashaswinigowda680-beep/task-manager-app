import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './store/AuthContext';
import AuthPage from './pages/AuthPage';
import BoardPage from './pages/BoardPage';

function AppContent() {
  const { user, loading } = useAuth();
  if (loading) return <div className="loading">Loading…</div>;
  return user ? <BoardPage /> : <AuthPage />;
}

export default function App() {
  return (
    <AuthProvider>
      <Toaster position="top-right" toastOptions={{ style: { fontFamily: 'inherit', fontSize: '13px', borderRadius: '8px' } }} />
      <AppContent />
    </AuthProvider>
  );
}
