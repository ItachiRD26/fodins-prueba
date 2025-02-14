import { ReactNode } from 'react';
import { useAuth } from '../hooks/useauth';

interface AuthGuardProps {
  children: ReactNode;
}

// Lista de UIDs autorizados
const allowedUIDs = ['HUD7XNKKzxcHz1Lh7HSXngcJlXn1', 'eJLs6IzcKmUbkWGYJkrAMYcHTgN2'];

export default function AuthGuard({ children }: AuthGuardProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Cargando...</div>; // Muestra un mensaje de carga mientras se verifica la autenticación
  }

  if (!user || !allowedUIDs.includes(user.uid)) {
    return null; // No renderiza nada si el usuario no está autorizado
  }

  return <>{children}</>; // Renderiza el contenido si el usuario está autenticado
}
