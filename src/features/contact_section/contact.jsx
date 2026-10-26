import './contact.css';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import ResourceState from '../../components/ResourceState';
import { getStrapiMediaUrl } from '../../api/strapi';
import useSiteContent from '../../content/useSiteContent';

export default function ContactSection() {
  const { content, loading, error } = useSiteContent();
  const image = getStrapiMediaUrl(content?.imagemContactoHome);

  return (
    <div id="contact_section0" className="contact_section">
      <Grid container className="landing__grid">
        <Grid size={{ xs: 1, md: 1 }} />
        <Grid container spacing={5} size={{ xs: 10, md: 10 }} className="landing__content">
          <Grid item size={{ xs: 12, sm: 6, md: 8 }}>
            <ResourceState
              loading={loading}
              error={error}
              empty={content?.tituloContactoHome || content?.descricaoContactoHome ? null : 'Ainda não existe conteúdo de contacto.'}
            >
              <>
                {content?.tituloContactoHome && (
                  <div className="title" data-aos="fade-in" data-aos-duration="2000">
                    <h2>{content.tituloContactoHome}</h2>
                  </div>
                )}
                {content?.descricaoContactoHome && (
                  <div className="description" data-aos="fade-in" data-aos-duration="2000" data-aos-delay="100">
                    <p>{content.descricaoContactoHome}</p>
                  </div>
                )}
                {content?.textoBotaoContactoHome && (
                  <div className="contacts_action">
                    <Button component={Link} to="/contactos" variant="contained">
                      {content.textoBotaoContactoHome}
                    </Button>
                  </div>
                )}
              </>
            </ResourceState>
          </Grid>
          {image && (
            <Grid data-aos="fade-in" data-aos-duration="2000" data-aos-delay="100" item size={{ xs: 0, sm: 6, md: 4 }}>
              <img src={image} alt={content?.tituloContactoHome || ''} className="contact__image" />
            </Grid>
          )}
        </Grid>
        <Grid size={{ xs: 1, md: 1 }} />
      </Grid>
    </div>
  );
}
