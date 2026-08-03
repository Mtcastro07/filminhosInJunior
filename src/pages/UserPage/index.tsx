import { useProfile } from "../../hooks/useProfile";

export default function UserPage() {
  const { data: user, isLoading, isError } = useProfile();

  if (isLoading) {
    return <p>Carregando...</p>;
  }

  if (isError) {
    return <p>Erro ao carregar perfil.</p>;
  }

  return (
    <div>
      <h1>Perfil</h1>

      <p>{user?.fullName}</p>
      <p>{user?.email}</p>
      <p>{user?.initials}</p>
    </div>
  );
}
