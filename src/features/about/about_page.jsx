import './about_page.css';
import Grid from '@mui/material/Grid';
import useStrapiResource from '../../api/useStrapiResource';
import { getStrapiMediaUrl, unwrapStrapiEntity } from '../../api/strapi';

function getContentParagraphs(content) {
  if (!Array.isArray(content)) return [];

  return content
    .map((block) => (block.children ?? []).map((child) => child.text ?? '').join(''))
    .filter(Boolean);
}

export default function AboutPage() {
  const { data: aboutData } = useStrapiResource('/api/about?populate=*');
  const { data: partnerData } = useStrapiResource('/api/parceiros?populate=*&sort=nome%3Aasc');
  const about = unwrapStrapiEntity(aboutData);
  const institutionalText = getContentParagraphs(about?.texto_institucional);
  const founderBio = getContentParagraphs(about?.bio_fundador);
  const founderImage = getStrapiMediaUrl(about?.foto_fundador);
  const partners = Array.isArray(partnerData)
    ? partnerData.map(unwrapStrapiEntity).filter(Boolean)
    : [];

  return (
    <div id="about" className="about_page">
      <Grid container className="about__grid">
        <Grid size={{ xs: 1, md: 1 }} />
        <Grid size={{ xs: 10, md: 10 }} className="about__content">
          {about?.titulo && (
            <div className="title" data-aos="fade-in" data-aos-duration="2000">
              <h2>{about.titulo}</h2>
            </div>
          )}
          {institutionalText.length > 0 && (
            <div className="description" data-aos="fade-in" data-aos-duration="2000" data-aos-delay="100">
              {institutionalText.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
            </div>
          )}
          {(about?.nome_fundador || founderImage || founderBio.length > 0) && (
            <Grid size={{ xs: 12, md: 12 }} className="about__content">
              <div className="banner" data-aos="fade-in" data-aos-duration="2000" data-aos-delay="100">
                {founderImage && (
                  <div className="profileImage">
                    <img src={founderImage} alt={about.nome_fundador || ''} />
                  </div>
                )}
                <div className="info">
                  {about.nome_fundador && (
                    <div className="name"><p>{about.nome_fundador}</p></div>
                  )}
                  {founderBio.length > 0 && (
                    <div className="description">
                      {founderBio.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
                    </div>
                  )}
                </div>
              </div>
            </Grid>
          )}
          {partners.length > 0 && (
            <>
              <div className="title" data-aos="fade-in" data-aos-duration="2000">
                <h2>Parceiros</h2>
              </div>
              <div className="about__partners" data-aos="fade-in" data-aos-duration="2000" data-aos-delay="100">
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
            </>
          )}
        </Grid>
        <Grid size={{ xs: 1, md: 1 }} />
      </Grid>
    </div>
  );
}
