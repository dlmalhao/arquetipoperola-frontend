import { useEffect, useState } from 'react';
import { fetchStrapiResource } from './strapi';

export default function useStrapiResource(path) {
  const [resource, setResource] = useState({
    path: null,
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const controller = new AbortController();

    fetchStrapiResource(path, controller.signal)
      .then((data) => setResource({ path, data, loading: false, error: null }))
      .catch((error) => {
        if (error.name !== 'AbortError') {
          setResource({ path, data: null, loading: false, error });
        }
      });

    return () => controller.abort();
  }, [path]);

  return resource.path === path
    ? resource
    : { data: null, loading: true, error: null };
}
