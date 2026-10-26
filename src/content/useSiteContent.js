import { useContext } from 'react';
import SiteContentContext from './siteContentContext';

export default function useSiteContent() {
  const context = useContext(SiteContentContext);

  if (!context) {
    throw new Error('useSiteContent deve ser usado dentro de SiteContentProvider.');
  }

  return context;
}
