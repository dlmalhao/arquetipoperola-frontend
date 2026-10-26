import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/image-gallery.css';
import useStrapiResource from '../../api/useStrapiResource';
import { normalizeProject } from './projectsData';
import './project_detail.css';

export default function ProjectDetail() {
  const { slug } = useParams();
  const endpoint = useMemo(
    () => `/api/projetos?populate=*&filters[slug][$eq]=${encodeURIComponent(slug ?? '')}`,
    [slug],
  );
  const { data } = useStrapiResource(endpoint);
  const records = Array.isArray(data) ? data : [];
  const project = normalizeProject(records[0]);
  const galleryItems = (project?.images ?? []).map((image, index) => ({
    original: image,
    thumbnail: image,
    originalAlt: `${project.name} ${index + 1}`,
    thumbnailAlt: `${project.name} ${index + 1}`,
  }));
  const projectDetails = project ? [
    ['Localização', project.location],
    ['Morada', project.address],
    ['Coordenadas', project.coordinates],
    ['Área bruta', project.grossArea != null ? `${project.grossArea} m²` : null],
    ['Área útil', project.usefulArea != null ? `${project.usefulArea} m²` : null],
    ['Quartos', project.bedrooms],
    ['Casas de banho', project.bathrooms],
    ['Certificação energética', project.energyRating],
    ['Estado', project.status],
    ['Ano de conclusão', project.completionYear],
    ['Disponibilidade', project.availability],
  ].filter(([, value]) => value !== null && value !== undefined && value !== '') : [];
  const mapUrl = project?.coordinates
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(project.coordinates)}`
    : null;

  return (
    <div className="project_detail">
      <Grid container className="landing__grid">
        <Grid size={{ xs: 1, md: 1 }} />
        <Grid size={{ xs: 10, md: 10 }} className="landing__content">
          {project && (
            <>
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
                      <div className="title"><h2>{project.name}</h2></div>
                      {project.typeLabel && (
                        <div className="project-detail__type">
                          <p className="project-detail__type">{project.typeLabel}</p>
                        </div>
                      )}
                      <div className="project-detail__meta">
                        {projectDetails.map(([label, value]) => (
                          <div className="wrapper" key={label}>
                            <p className="title">{label}</p>
                            <p className="description">
                              {label === 'Coordenadas' && mapUrl ? (
                                <a href={mapUrl} target="_blank" rel="noreferrer">{value}</a>
                              ) : value}
                            </p>
                          </div>
                        ))}
                        {project.typologies.length > 0 && (
                          <div className="wrapper">
                            <p className="title">Tipologias</p>
                            <p className="description">{project.typologies.join(', ')}</p>
                          </div>
                        )}
                        {project.types.length > 0 && (
                          <div className="wrapper">
                            <p className="title">Tipos</p>
                            <p className="description">{project.types.join(', ')}</p>
                          </div>
                        )}
                      </div>
                      {project.description && (
                        <section className="project-detail__description">
                          <h3>Descrição</h3>
                          <p>{project.description}</p>
                        </section>
                      )}
                    </div>
                  </div>
                </Grid>
              </Grid>
              {project.videoTour && (
                <section className="project-detail__section" data-aos="fade-in" data-aos-duration="2000" data-aos-delay="100">
                  <h3>Vídeo</h3>
                  <Button
                    className="project-detail__action"
                    component="a"
                    href={project.videoTour}
                    target="_blank"
                    rel="noreferrer"
                    variant="contained"
                  >
                    Ver vídeo
                  </Button>
                </section>
              )}
              {project.plans.length > 0 && (
                <section className="project-detail__section project-detail__plans" data-aos="fade-in" data-aos-duration="2000" data-aos-delay="100">
                  <h3>Plantas</h3>
                  <Grid container spacing={2}>
                    {project.plans.map((plan) => (
                      <Grid item size={{ xs: 12, sm: 6, md: 3 }} key={plan.url}>
                        <a
                          className="project-detail__plan"
                          href={plan.url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {plan.name}
                        </a>
                      </Grid>
                    ))}
                  </Grid>
                </section>
              )}
              <Button
                className="project-detail__action project-detail__back"
                component={Link}
                to="/projetos"
                variant="contained"
                data-aos="fade-in" data-aos-duration="2000" data-aos-delay="100"
              >
                Voltar aos projetos
              </Button>
            </>
          )}
        </Grid>
        <Grid size={{ xs: 1, md: 1 }} />
      </Grid>
    </div>
  );
}
