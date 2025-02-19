import { ReactNode } from 'react';
import { useAuth } from '../hooks/useauth';

interface AuthGuardProps {
  children: ReactNode;
}

const allowedUIDs = ['HUD7XNKKzxcHz1Lh7HSXngcJlXn1', 'eJLs6IzcKmUbkWGYJkrAMYcHTgN2'];

export default function AuthGuard({ children }: AuthGuardProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!user || !allowedUIDs.includes(user.uid)) {
    return null;
  }

  return <>{children}</>;
}