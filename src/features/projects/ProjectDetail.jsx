import { useParams, Link } from 'react-router-dom';
import { useMemo } from 'react';
import Grid from '@mui/material/Grid';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/image-gallery.css';
import { getProjectBySlug } from './projectsData';
import './project_detail.css';

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = useMemo(() => getProjectBySlug(slug), [slug]);

  if (!project) {
    return (
      <div className="project">
        <Grid container className="landing__grid">
          <Grid size={{ xs: 12, md: 1 }} />
          <Grid size={{ xs: 12, md: 10 }} className="landing__content">
            <p>Projeto não encontrado.</p>
            <Link to="/projetos">Voltar aos projetos</Link>
          </Grid>
          <Grid size={{ xs: 12, md: 1 }} />
        </Grid>
      </div>
    );
  }

  const galleryItems = (project.images || []).map((image, index) => ({
    original: image,
    thumbnail: image,
    originalAlt: `${project.name} ${index + 1}`,
    thumbnailAlt: `${project.name} ${index + 1}`,
  }));

  return (
    <div className="project_detail">
      <Grid container className="landing__grid">
        <Grid size={{ xs: 1, md: 1 }} />
        <Grid size={{ xs: 10, md: 10 }} className="landing__content">
          <Grid container spacing={4} className="projects__grid">
            <Grid item size={{ xs: 12, md: 8 }}>
              <div className="project-detail__gallery-wrapper">
                <ImageGallery
                  items={galleryItems}
                  showFullscreenButton={true}
                  showPlayButton={false}
                  showThumbnails={true}
                  showNav={true}
                  thumbnailPosition="bottom"
                  lazyLoad={true}
                  additionalClass="project-detail__gallery"
                />
              </div>
            </Grid>
            <Grid className="project-detail__container" item size={{ xs: 12, md: 4 }}>
              <div className="project-detail__info">
                <div>
                  <div className="title">
                    <h2>{project.name}</h2>
                  </div>
                  <div className="project-detail__type">
                    <p className="project-detail__type">{project.typeLabel}</p>
                  </div>
                  <div className="project-detail__meta">
                    <div className="wrapper">
                      <p className="title">Localização</p>
                      <p className="description">{project.location}</p>
                    </div>
                    <div className="wrapper">
                      <p className="title">Tipologias</p>
                      <p className="description">{project.typologies.join(', ')}</p>
                    </div>
                    <div className="wrapper">
                      <p className="title">Tipos</p>
                      <p className="description">{project.types.join(', ')}</p>
                    </div>
                  </div>
                  <div className="project-detail__description">
                    <p>{project.description}</p>
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid size={{ xs: 1, md: 1 }} />
      </Grid>
    </div>
  );
}
