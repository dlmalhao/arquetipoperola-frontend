import './contact.css';
import Grid from '@mui/material/Grid';
import useStrapiResource from '../../api/useStrapiResource';
import { unwrapStrapiEntity } from '../../api/strapi';

function getMapEmbedUrl(value) {
  if (!value) return '';

  let query = value;
  try {
    query = new URL(value).searchParams.get('q') || value;
  } catch {
    // Plain coordinates or an address can be used directly as the map query.
  }

  return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
}

export default function Contact() {
  const { data } = useStrapiResource('/api/contacto?populate=*');
  const contact = unwrapStrapiEntity(data);
  const mapUrl = getMapEmbedUrl(contact?.coordenadas);
  const phoneUrl = contact?.telefone?.replace(/[^\d+]/g, '');

  return (
    <div id="contact" className="contact">
      <Grid container className="contact__grid">
        <Grid size={{ xs: 1, md: 1 }} />
        <Grid size={{ xs: 10, md: 10 }} className="contact__content">
          {contact?.titulo && (
            <div className="title" data-aos="fade-in" data-aos-duration="2000">
              <h2>{contact.titulo}</h2>
            </div>
          )}
          {contact?.subtitulo && (
            <div className="description" data-aos="fade-in" data-aos-duration="2000" data-aos-delay="100">
              <p>{contact.subtitulo}</p>
            </div>
          )}
          <Grid container spacing={2} sx={{ mb: 4 }}>
            {(contact?.morada || contact?.email || contact?.telefone) && (
              <Grid item size={{ xs: 12, md: mapUrl ? 4 : 12 }}>
                <div className="contact__details" data-aos="fade-in" data-aos-duration="2000" data-aos-delay="100">
                  {contact.morada && (
                    <div className="contact__item">
                      <h3>Morada</h3>
                      <p>{contact.morada}</p>
                    </div>
                  )}
                  {contact.email && (
                    <div className="contact__item">
                      <h3>Email</h3>
                      <p><a href={`mailto:${contact.email}`}>{contact.email}</a></p>
                    </div>
                  )}
                  {contact.telefone && (
                    <div className="contact__item">
                      <h3>Telefone</h3>
                      <p><a href={`tel:${phoneUrl}`}>{contact.telefone}</a></p>
                    </div>
                  )}
                </div>
              </Grid>
            )}
            {mapUrl && (
              <Grid item size={{ xs: 12, md: contact?.morada || contact?.email || contact?.telefone ? 8 : 12 }}>
                <div className="contact__map-wrapper" data-aos="fade-in" data-aos-duration="2000" data-aos-delay="300">
                  <iframe
                    title="Localização"
                    src={mapUrl}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>
              </Grid>
            )}
          </Grid>
        </Grid>
        <Grid size={{ xs: 1, md: 1 }} />
      </Grid>
    </div>
  );
}
