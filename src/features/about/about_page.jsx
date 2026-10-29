import './about_page.css';
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
  const hasFounder = about?.nome_fundador || founderImage || founderBio.length > 0;

  return (
    <div className="about_page">
      {(about?.titulo || institutionalText.length > 0) && (
        <section className="about-hero">
          <div className="about-page__inner">
            <span className="about-page__eyebrow" data-aos="fade-in" data-aos-duration="1500">
              Sobre nós
            </span>
            {about?.titulo && (
              <h1 className="about-hero__title" data-aos="fade-up" data-aos-duration="1500" data-aos-delay="100">
                {about.titulo}
              </h1>
            )}
            {institutionalText.length > 0 && (
              <div className="about-hero__text" data-aos="fade-up" data-aos-duration="1500" data-aos-delay="200">
                {institutionalText.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
              </div>
            )}
          </div>
        </section>
      )}

      {hasFounder && (
        <section className="about-founder">
          <div className="about-page__inner about-founder__layout">
            {founderImage && (
              <div className="about-founder__photo" data-aos="fade-in" data-aos-duration="1800">
                <img src={founderImage} alt={about.nome_fundador || ''} />
              </div>
            )}
            <div className="about-founder__info" data-aos="fade-in" data-aos-duration="1800" data-aos-delay="150">
              <span className="about-page__eyebrow about-page__eyebrow--dark">Fundador</span>
              {about.nome_fundador && <h2>{about.nome_fundador}</h2>}
              {founderBio.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
            </div>
          </div>
        </section>
      )}

      {partners.length > 0 && (
        <section className="about-partners">
          <div className="about-page__inner">
            <span className="about-page__eyebrow about-page__eyebrow--dark" data-aos="fade-in" data-aos-duration="1500">
              Quem trabalha connosco
            </span>
            <h2 className="about-partners__title" data-aos="fade-in" data-aos-duration="1500" data-aos-delay="100">
              Parceiros
            </h2>
            <div className="about__partners" data-aos="fade-in" data-aos-duration="1800" data-aos-delay="150">
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
          </div>
        </section>
      )}
    </div>
  );
}
