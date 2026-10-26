import useStrapiResource from '../api/useStrapiResource';
import { unwrapStrapiEntity } from '../api/strapi';
import SiteContentContext from './siteContentContext';

export function SiteContentProvider({ children }) {
  const { data, loading, error } = useStrapiResource('/api/conteudo-do-site?populate=*');

  return (
    <SiteContentContext.Provider
      value={{ content: unwrapStrapiEntity(data), loading, error }}
    >
      {children}
    </SiteContentContext.Provider>
  );
}
