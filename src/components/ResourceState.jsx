export default function ResourceState({ loading, error, empty, children }) {
  if (loading) {
    return <p role="status">A carregar conteúdo…</p>;
  }

  if (error) {
    return <p role="alert">Não foi possível carregar o conteúdo. {error.message}</p>;
  }

  if (empty) {
    return <p role="status">{empty}</p>;
  }

  return children;
}
