const apiBaseUrl = import.meta.env.VITE_API_URL;

function getApiBaseUrl() {
  if (!apiBaseUrl) {
    throw new Error('A variável VITE_API_URL não está configurada.');
  }

  return apiBaseUrl.replace(/\/+$/, '');
}

export async function fetchStrapiResource(path, signal) {
  const response = await fetch(`${getApiBaseUrl()}${path}`, { signal });

  if (!response.ok) {
    throw new Error(`O backend respondeu com o estado ${response.status}.`);
  }

  const body = await response.json();
  return body?.data ?? null;
}

export function unwrapStrapiEntity(entity) {
  if (!entity) return null;
  return entity.attributes ? { id: entity.id, ...entity.attributes } : entity;
}

export function unwrapStrapiRelation(relation) {
  const value = relation?.data ?? relation;
  if (Array.isArray(value)) return value.map(unwrapStrapiEntity).filter(Boolean);
  const entity = unwrapStrapiEntity(value);
  return entity ? [entity] : [];
}

export function getStrapiMediaUrl(media) {
  const entity = unwrapStrapiEntity(media?.data ?? media);
  const url = entity?.url;

  if (!url) return '';
  if (/^https?:\/\//i.test(url)) return url;

  const apiUrl = new URL(getApiBaseUrl(), window.location.origin);
  return `${apiUrl.origin}${url.startsWith('/') ? '' : '/'}${url}`;
}
