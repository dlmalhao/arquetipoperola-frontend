import './_landing.css';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import ResourceState from '../../components/ResourceState';
import { getStrapiMediaUrl } from '../../api/strapi';
import useSiteContent from '../../content/useSiteContent';

export default function Landing() {
  const { content, loading, error } = useSiteContent();
  const heroImage = getStrapiMediaUrl(content?.imagemHeroi);

  return (
    <div
      id="home"
      className="landing"
      style={heroImage ? {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("${heroImage}")`,
      } : undefined}
    >
      <Grid container className="landing__grid">
        <Grid size={{ xs: 1, md: 1 }} />
        <Grid size={{ xs: 10, md: 10 }} className="landing__content">
          <ResourceState loading={loading} error={error} empty={content ? null : 'Ainda não existe conteúdo para a página inicial.'}>
            <div className="text-component">
              {content?.tituloHeroi && (
                <h1 data-aos="fade-in" data-aos-duration="2000" data-aos-delay="100">
                  {content.tituloHeroi}
                </h1>
              )}
              {content?.descricaoHeroi && (
                <div className="description" data-aos="fade-in" data-aos-duration="2000" data-aos-delay="200">
                  <h3>{content.descricaoHeroi}</h3>
                </div>
              )}
              {content?.textoBotaoProjetos && (
                <Button component={Link} to="/projetos" variant="contained" data-aos="fade-in" data-aos-duration="2000" data-aos-delay="300">
                  {content.textoBotaoProjetos}
                </Button>
              )}
            </div>
          </ResourceState>
        </Grid>
        <Grid size={{ xs: 1, md: 1 }} />
      </Grid>
    </div>
  );
}
