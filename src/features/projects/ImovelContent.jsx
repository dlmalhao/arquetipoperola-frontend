import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/image-gallery.css';
import PlansSection from './PlansSection';
import './project_detail.css';

export default function ImovelContent({ imovel, breadcrumb, backTo, backLabel }) {
  const galleryItems = imovel.images.map((image, index) => ({
    original: image,
    thumbnail: image,
    originalAlt: `${imovel.name} ${index + 1}`,
    thumbnailAlt: `${imovel.name} ${index + 1}`,
  }));
  const details = [
    ['Preço', imovel.price],
    ['Área bruta', imovel.grossArea != null ? `${imovel.grossArea} m²` : null],
    ['Área útil', imovel.usefulArea != null ? `${imovel.usefulArea} m²` : null],
    ['Quartos', imovel.bedrooms],
    ['Casas de banho', imovel.bathrooms],
    ['Certificação energética', imovel.energyRating],
    ['Disponibilidade', imovel.availability],
  ].filter(([, value]) => value !== null && value !== undefined && value !== '');

  return (
    <>
      <nav className="project-detail__breadcrumb" aria-label="Navegação">
        {breadcrumb.map((item) => (
          <span key={item.label}>
            {item.to ? <Link to={item.to}>{item.label}</Link> : item.label}
          </span>
        ))}
      </nav>
      <Grid container spacing={4} className="projects__grid">
        <Grid item size={{ xs: 12, md: 8 }}>
          {galleryItems.length > 0 && (
            <div className="project-detail__gallery-wrapper" data-aos="fade-in" data-aos-duration="2000" data-aos-delay="100">
              <ImageGallery
                items={galleryItems}
                showFullscreenButton
                showPlayButton={false}
                showThumbnails
                showNav
                thumbnailPosition="bottom"
                lazyLoad
                additionalClass="project-detail__gallery"
              />
            </div>
          )}
        </Grid>
        <Grid className="project-detail__container" item size={{ xs: 12, md: 4 }}>
          <div className="project-detail__info" data-aos="fade-in" data-aos-duration="2000" data-aos-delay="100">
            <div>
              <div className="title"><h2>{imovel.name}</h2></div>
              {imovel.typologies.length > 0 && (
                <div className="project-detail__type">
                  <p className="project-detail__type">{imovel.typologies.join(', ')}</p>
                </div>
              )}
              <div className="project-detail__meta">
                {details.map(([label, value]) => (
                  <div className="wrapper" key={label}>
                    <p className="title">{label}</p>
                    <p className="description">{value}</p>
                  </div>
                ))}
              </div>
              {imovel.description && (
                <section className="project-detail__description">
                  <h3>Descrição</h3>
                  <p>{imovel.description}</p>
                </section>
              )}
            </div>
          </div>
        </Grid>
      </Grid>
      {imovel.videoTour && (
        <section className="project-detail__section" data-aos="fade-in" data-aos-duration="2000" data-aos-delay="100">
          <h3>Vídeo</h3>
          <Button
            className="project-detail__action"
            component="a"
            href={imovel.videoTour}
            target="_blank"
            rel="noreferrer"
            variant="contained"
          >
            Ver vídeo
          </Button>
        </section>
      )}
      <PlansSection plans={imovel.plans} />
      <Button
        className="project-detail__action project-detail__back"
        component={Link}
        to={backTo}
        variant="contained"
        data-aos="fade-in" data-aos-duration="2000" data-aos-delay="100"
      >
        {backLabel}
      </Button>
    </>
  );
}
