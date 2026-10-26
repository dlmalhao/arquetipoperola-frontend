import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/image-gallery.css';
import useStrapiResource from '../../api/useStrapiResource';
import ResourceState from '../../components/ResourceState';
import { normalizeProject } from './projectsData';
import './project_detail.css';

export default function ProjectDetail() {
  const { slug } = useParams();
  const endpoint = useMemo(
    () => `/api/projetos?populate=*&filters[slug][$eq]=${encodeURIComponent(slug ?? '')}`,
    [slug],
  );
  const { data, loading, error } = useStrapiResource(endpoint);
  const records = Array.isArray(data) ? data : [];
  const project = normalizeProject(records[0]);
  const galleryItems = (project?.images ?? []).map((image, index) => ({
    original: image,
    thumbnail: image,
    originalAlt: `${project.name} ${index + 1}`,
    thumbnailAlt: `${project.name} ${index + 1}`,
  }));

  return (
    <div className="project">
      <Grid container className="landing__grid">
        <Grid size={{ xs: 12, md: 1 }} />
        <Grid size={{ xs: 12, md: 10 }} className="landing__content">
          <ResourceState
            loading={loading}
            error={error}
            empty={project ? null : 'Projeto não encontrado.'}
          >
            <>
              <Grid container spacing={4} className="projects__grid">
                <Grid item size={{ xs: 12, md: 8 }}>
                  {galleryItems.length ? (
                    <div className="project-detail__gallery-wrapper">
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
                  ) : (
                    <p role="status">Este projeto ainda não tem imagens.</p>
                  )}
                </Grid>
                <Grid className="project-detail__container" item size={{ xs: 12, md: 4 }}>
                  <div className="project-detail__info">
                    <div>
                      <div className="title"><h2>{project.name}</h2></div>
                      {project.typeLabel && (
                        <div className="project-detail__type">
                          <p className="project-detail__type">{project.typeLabel}</p>
                        </div>
                      )}
                      <div className="project-detail__meta">
                        {project.location && (
                          <div className="wrapper">
                            <p className="title">Localização</p>
                            <p className="description">{project.location}</p>
                          </div>
                        )}
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
                        <div className="project-detail__description">
                          <p>{project.description}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </Grid>
              </Grid>
              <Link to="/projetos">Voltar aos projetos</Link>
            </>
          </ResourceState>
        </Grid>
        <Grid size={{ xs: 12, md: 1 }} />
      </Grid>
    </div>
  );
}
