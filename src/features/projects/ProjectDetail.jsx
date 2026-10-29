import { useMemo } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/image-gallery.css';
import Card from '../../components/Card';
import useStrapiResource from '../../api/useStrapiResource';
import { normalizeProject } from './projectsData';
import { filterImoveis, normalizeImovel } from './imoveisData';
import ImovelContent from './ImovelContent';
import PlansSection from './PlansSection';
import ProjectsEmptyState from './ProjectsEmptyState';
import './projects.css';
import './project_detail.css';

const availabilityOptions = [
  ['disponivel', 'Disponível'],
  ['reservado', 'Reservado'],
  ['vendido', 'Vendido'],
];

export default function ProjectDetail() {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const tipologia = searchParams.get('tipologia') || '';
  const disponibilidade = searchParams.get('disponibilidade') || '';
  const projectEndpoint = useMemo(
    () => `/api/projetos?populate=*&filters[slug][$eq]=${encodeURIComponent(slug ?? '')}`,
    [slug],
  );
  const imoveisEndpoint = useMemo(
    () => `/api/imoveis?populate=*&sort=createdAt%3Aasc&filters[projeto][slug][$eq]=${encodeURIComponent(slug ?? '')}`,
    [slug],
  );
  const { data } = useStrapiResource(projectEndpoint);
  const { data: imoveisData, loading: imoveisLoading } = useStrapiResource(imoveisEndpoint);
  const records = Array.isArray(data) ? data : [];
  const project = normalizeProject(records[0]);
  const imoveis = (Array.isArray(imoveisData) ? imoveisData : []).map(normalizeImovel).filter(Boolean);
  const allTipologies = [...new Set(imoveis.flatMap((imovel) => imovel.typologies))].sort();
  const filteredImoveis = filterImoveis(imoveis, { tipologia, disponibilidade });
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
    ['Estado', project.status],
    ['Ano de conclusão', project.completionYear],
  ].filter(([, value]) => value !== null && value !== undefined && value !== '') : [];
  const mapUrl = project?.coordinates
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(project.coordinates)}`
    : null;

  const handleFilterChange = (key, value) => {
    const nextParams = new URLSearchParams(searchParams);

    if (!value) {
      nextParams.delete(key);
    } else {
      nextParams.set(key, value);
    }

    setSearchParams(nextParams);
  };

  // Um projeto com um único imóvel (ex.: moradia) mostra o imóvel diretamente.
  if (project && !imoveisLoading && imoveis.length === 1) {
    return (
      <div className="project_detail">
        <Grid container className="landing__grid">
          <Grid size={{ xs: 1, md: 1 }} />
          <Grid size={{ xs: 10, md: 10 }} className="landing__content">
            <ImovelContent
              imovel={imoveis[0]}
              breadcrumb={[
                { label: 'Projetos', to: '/projetos' },
                { label: project.name },
              ]}
              backTo="/projetos"
              backLabel="Voltar aos projetos"
            />
          </Grid>
          <Grid size={{ xs: 1, md: 1 }} />
        </Grid>
      </div>
    );
  }

  return (
    <div className="project_detail">
      <Grid container className="landing__grid">
        <Grid size={{ xs: 1, md: 1 }} />
        <Grid size={{ xs: 10, md: 10 }} className="landing__content">
          {project && (
            <>
              <nav className="project-detail__breadcrumb" aria-label="Navegação">
                <span><Link to="/projetos">Projetos</Link></span>
                <span>{project.name}</span>
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
              <PlansSection plans={project.plans} />
              {imoveis.length > 0 && (
                <section className="project-detail__imoveis" data-aos="fade-in" data-aos-duration="2000" data-aos-delay="100">
                  <div className="project-detail__imoveis-header">
                    <div className="project-detail__imoveis-title">
                      <h3>Imóveis</h3>
                      <span className="project-detail__imoveis-count">
                        {filteredImoveis.length === imoveis.length
                          ? `${imoveis.length} ${imoveis.length === 1 ? 'imóvel' : 'imóveis'}`
                          : `${filteredImoveis.length} de ${imoveis.length} imóveis`}
                      </span>
                    </div>
                    <div className="project-detail__imoveis-filters">
                      {allTipologies.length > 0 && (
                        <div className="projects__filter">
                          <label className="projects__filter-label" htmlFor="imovel-tipologia-filter">
                            Tipologia
                          </label>
                          <select
                            className="projects__filter-select"
                            id="imovel-tipologia-filter"
                            value={tipologia}
                            onChange={(event) => handleFilterChange('tipologia', event.target.value)}
                          >
                            <option value="">Todas as tipologias</option>
                            {allTipologies.map((option) => (
                              <option key={option} value={option}>{option}</option>
                            ))}
                          </select>
                        </div>
                      )}
                      <div className="projects__filter">
                        <label className="projects__filter-label" htmlFor="imovel-disponibilidade-filter">
                          Disponibilidade
                        </label>
                        <select
                          className="projects__filter-select"
                          id="imovel-disponibilidade-filter"
                          value={disponibilidade}
                          onChange={(event) => handleFilterChange('disponibilidade', event.target.value)}
                        >
                          <option value="">Todas</option>
                          {availabilityOptions.map(([value, label]) => (
                            <option key={value} value={value}>{label}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <Grid container spacing={{ xs: 3, md: 5 }} className="projects__grid">
                    {filteredImoveis.map((imovel) => (
                      <Grid key={imovel.id} item size={{ xs: 12, sm: 6, md: 4 }}>
                        <Link to={`/projetos/${slug}/${imovel.slug}`} className="project-card__link">
                          <Card
                            name={imovel.name}
                            type={imovel.cardLabel}
                            image={imovel.images[0]}
                            badge={imovel.availabilityKey && imovel.availabilityKey !== 'disponivel' ? imovel.availability : null}
                            muted={imovel.availabilityKey === 'vendido'}
                          />
                        </Link>
                      </Grid>
                    ))}
                  </Grid>
                  {filteredImoveis.length === 0 && (
                    <ProjectsEmptyState
                      title="Não encontrámos imóveis"
                      message="Não há imóveis que correspondam aos filtros selecionados. Experimente alterar os filtros."
                    />
                  )}
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
