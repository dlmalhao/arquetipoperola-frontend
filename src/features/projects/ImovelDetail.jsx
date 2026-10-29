import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import useStrapiResource from '../../api/useStrapiResource';
import { normalizeImovel } from './imoveisData';
import ImovelContent from './ImovelContent';
import './project_detail.css';

export default function ImovelDetail() {
  const { slug, imovelSlug } = useParams();
  const endpoint = useMemo(
    () => `/api/imoveis?populate=*&filters[slug][$eq]=${encodeURIComponent(imovelSlug ?? '')}`
      + `&filters[projeto][slug][$eq]=${encodeURIComponent(slug ?? '')}`,
    [slug, imovelSlug],
  );
  const { data } = useStrapiResource(endpoint);
  const records = Array.isArray(data) ? data : [];
  const imovel = normalizeImovel(records[0]);
  const projectPath = `/projetos/${slug}`;

  return (
    <div className="project_detail">
      <Grid container className="landing__grid">
        <Grid size={{ xs: 1, md: 1 }} />
        <Grid size={{ xs: 10, md: 10 }} className="landing__content">
          {imovel && (
            <ImovelContent
              imovel={imovel}
              breadcrumb={[
                { label: 'Projetos', to: '/projetos' },
                { label: imovel.project?.name ?? 'Projeto', to: projectPath },
                { label: imovel.name },
              ]}
              backTo={projectPath}
              backLabel="Voltar ao empreendimento"
            />
          )}
        </Grid>
        <Grid size={{ xs: 1, md: 1 }} />
      </Grid>
    </div>
  );
}
