import './about_page.css';
import Grid from '@mui/material/Grid';
import useStrapiResource from '../../api/useStrapiResource';
import { getStrapiMediaUrl, unwrapStrapiEntity } from '../../api/strapi';
import ResourceState from '../../components/ResourceState';
import useSiteContent from '../../content/useSiteContent';

export default function AboutPage() {
  const { content, loading, error } = useSiteContent();
  const {
    data: partnerData,
    loading: partnersLoading,
    error: partnersError,
  } = useStrapiResource('/api/parceiros?populate=*&sort=nome%3Aasc');
  const partners = Array.isArray(partnerData)
    ? partnerData.map(unwrapStrapiEntity).filter(Boolean)
    : [];
  const founderImage = getStrapiMediaUrl(content?.imagemFundador);

  return (
    <div id="about" className="about_page">
      <Grid container className="about__grid">
        <Grid size={{ xs: 1, md: 1 }} />
        <Grid size={{ xs: 10, md: 10 }} className="about__content">
          <ResourceState
            loading={loading}
            error={error}
            empty={content ? null : 'Ainda não existe conteúdo sobre a empresa.'}
          >
            <>
              {content?.tituloPaginaSobre && (
                <div className="title" data-aos="fade-in" data-aos-duration="2000">
                  <h2>{content.tituloPaginaSobre}</h2>
                </div>
              )}
              {content?.descricaoPaginaSobre && (
                <div className="description" data-aos="fade-in" data-aos-duration="2000" data-aos-delay="100">
                  <p>{content.descricaoPaginaSobre}</p>
                </div>
              )}
              {(content?.nomeFundador || content?.biografiaFundador || founderImage) && (
                <Grid size={{ xs: 12, md: 12 }} className="about__content">
                  <div className="banner">
                    {founderImage && (
                      <div className="profileImage">
                        <img src={founderImage} alt={content.nomeFundador || ''} />
                      </div>
                    )}
                    <div className="info">
                      {content?.nomeFundador && (
                        <div className="name"><p>{content.nomeFundador}</p></div>
                      )}
                      {content?.cargoFundador && (
                        <div className="role"><p>{content.cargoFundador}</p></div>
                      )}
                      {content?.biografiaFundador && (
                        <div className="description">
                          <p>{content.biografiaFundador}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </Grid>
              )}
              {content?.tituloParceiros && (
                <div className="title" data-aos="fade-in" data-aos-duration="2000">
                  <h2>{content.tituloParceiros}</h2>
                </div>
              )}
              <ResourceState
                loading={partnersLoading}
                error={partnersError}
                empty={partners.length === 0 ? 'Ainda não existem parceiros publicados.' : null}
              >
                <div className="about__partners">
                  {partners.map((partner) => {
                    const logo = getStrapiMediaUrl(partner.logotipo);
                    return (
                      <div className="about__partner" key={partner.id}>
                        {logo && <img src={logo} alt={partner.nome || ''} />}
                        {partner.nome && <p>{partner.nome}</p>}
                      </div>
                    );
                  })}
                </div>
              </ResourceState>
            </>
          </ResourceState>
        </Grid>
        <Grid size={{ xs: 1, md: 1 }} />
      </Grid>
    </div>
  );
}
