import './contact.css';
import Grid from '@mui/material/Grid';
import ResourceState from '../../components/ResourceState';
import useSiteContent from '../../content/useSiteContent';

export default function Contact() {
  const { content, loading, error } = useSiteContent();
  const hasContactInfo = Boolean(
    content?.morada || content?.email || content?.telefone || content?.urlMapa,
  );

  return (
    <div id="contact" className="contact">
      <Grid container className="contact__grid">
        <Grid size={{ xs: 1, md: 1 }} />
        <Grid size={{ xs: 10, md: 10 }} className="contact__content">
          <ResourceState
            loading={loading}
            error={error}
            empty={hasContactInfo || content?.descricaoContacto ? null : 'Ainda não existem contactos publicados.'}
          >
            <>
              {content?.tituloContacto && (
                <div className="title" data-aos="fade-in" data-aos-duration="2000">
                  <h2>{content.tituloContacto}</h2>
                </div>
              )}
              {content?.descricaoContacto && (
                <div className="description" data-aos="fade-in" data-aos-duration="2000" data-aos-delay="100">
                  <p>{content.descricaoContacto}</p>
                </div>
              )}
              <Grid container spacing={2} sx={{ mb: 4 }}>
                <Grid item size={{ xs: 12, md: 4 }}>
                  <div className="contact__details" data-aos="fade-in" data-aos-duration="2000" data-aos-delay="100">
                    {content?.morada && (
                      <div className="contact__item">
                        <h3>Morada</h3>
                        <p>{content.morada}</p>
                      </div>
                    )}
                    {content?.email && (
                      <div className="contact__item">
                        <h3>Email</h3>
                        <p><a href={`mailto:${content.email}`}>{content.email}</a></p>
                      </div>
                    )}
                    {content?.telefone && (
                      <div className="contact__item">
                        <h3>Telefone</h3>
                        <p><a href={`tel:${content.telefone}`}>{content.telefone}</a></p>
                      </div>
                    )}
                  </div>
                </Grid>
                {content?.urlMapa && (
                  <Grid item size={{ xs: 12, md: 8 }}>
                    <div className="contact__map-wrapper" data-aos="fade-in" data-aos-duration="2000" data-aos-delay="300">
                      <iframe
                        title={content.tituloMapa || content.tituloContacto || 'Mapa de localização'}
                        src={content.urlMapa}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        allowFullScreen
                      />
                    </div>
                  </Grid>
                )}
              </Grid>
            </>
          </ResourceState>
        </Grid>
        <Grid size={{ xs: 1, md: 1 }} />
      </Grid>
    </div>
  );
}
