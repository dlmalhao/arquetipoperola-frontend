import './projects.css';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import { Link, useSearchParams } from 'react-router-dom';
import Card from '../../components/Card';
import useStrapiResource from '../../api/useStrapiResource';
import { unwrapStrapiRelation } from '../../api/strapi';
import { filterProjects, normalizeProject } from './projectsData';
import ProjectsEmptyState from './ProjectsEmptyState';

const projectsEndpoint = '/api/projetos?populate=*&sort=publishedAt%3Adesc';
const projectsPerPage = 20;

export default function ProjectsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const tipologia = searchParams.get('tipologia') || '';
  const tipo = searchParams.get('tipo') || '';
  const requestedPage = Number(searchParams.get('pagina')) || 1;
  const { data, loading, error } = useStrapiResource(projectsEndpoint);
  const records = Array.isArray(data) ? data : [];
  const projects = records.map(normalizeProject).filter(Boolean);
  const allTipologies = [...new Set(records.flatMap((project) =>
    unwrapStrapiRelation(project.tipologias).map((item) => item.nome).filter(Boolean),
  ))].sort();
  const allProjectTypes = [...new Set(records.flatMap((project) =>
    unwrapStrapiRelation(project.tipos ?? project.tipo_de_projetos).map((item) => item.nome).filter(Boolean),
  ))].sort();
  const filteredProjects = filterProjects(projects, { tipologia, tipo });
  const pageCount = Math.ceil(filteredProjects.length / projectsPerPage);
  const currentPage = Math.min(
    Number.isInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1,
    Math.max(pageCount, 1),
  );
  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * projectsPerPage,
    currentPage * projectsPerPage,
  );

  const handleFilterChange = (key, value) => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete('pagina');

    if (!value) {
      nextParams.delete(key);
    } else {
      nextParams.set(key, value);
    }

    setSearchParams(nextParams);
  };

  const handlePageChange = (_event, nextPage) => {
    const nextParams = new URLSearchParams(searchParams);

    if (nextPage === 1) {
      nextParams.delete('pagina');
    } else {
      nextParams.set('pagina', String(nextPage));
    }

    setSearchParams(nextParams);
  };

  return (
    <div className="projects projects-page">
      <Grid container className="landing__grid">
        <Grid size={{ xs: 1, md: 1 }} />
        <Grid size={{ xs: 10, md: 10 }} className="landing__content">
          <div className="title" data-aos="fade-in" data-aos-duration="2000">
            <h2>Todos os projetos</h2>
          </div>
          <hr data-aos="fade-in" data-aos-duration="2000" data-aos-delay="100" />
          <div className="filters" data-aos="fade-in" data-aos-duration="2000" data-aos-delay="200">
            <Grid container spacing={2} sx={{ mb: 4 }}>
              <Grid item size={{ xs: 12, sm: 6, md: 3 }} className="projects__filter">
                <label className="projects__filter-label" htmlFor="tipologia-filter">
                  Tipologia
                </label>
                <select
                  className="projects__filter-select"
                  id="tipologia-filter"
                  value={tipologia}
                  onChange={(event) => handleFilterChange('tipologia', event.target.value)}
                >
                  <option value="">Todas as tipologias</option>
                  {allTipologies.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </Grid>
              <Grid item size={{ xs: 12, sm: 6, md: 3 }} className="projects__filter">
                <label className="projects__filter-label" htmlFor="type-filter">
                  Tipo de projeto
                </label>
                <select
                  className="projects__filter-select"
                  id="type-filter"
                  value={tipo}
                  onChange={(event) => handleFilterChange('tipo', event.target.value)}
                >
                  <option value="">Todos os tipos</option>
                  {allProjectTypes.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </Grid>
            </Grid>
          </div>
          <Grid container spacing={5} className="projects__grid">
            {paginatedProjects.map((project) => (
              <Grid
                key={project.id}
                item
                size={{ xs: 12, sm: 6, md: 4 }}
                data-aos="fade-in"
                data-aos-duration="2000"
                data-aos-delay="200"
              >
                <Link to={`/projetos/${project.slug}`} className="project-card__link">
                  <Card
                    name={project.name}
                    type={project.typeLabel}
                    image={project.images[0]}
                  />
                </Link>
              </Grid>
            ))}
          </Grid>
          {pageCount > 1 && (
            <div className="projects__pagination">
              <p className="projects__pagination-summary">
                A mostrar {((currentPage - 1) * projectsPerPage) + 1}–
                {Math.min(currentPage * projectsPerPage, filteredProjects.length)} de {filteredProjects.length} projetos
              </p>
              <Pagination
                count={pageCount}
                page={currentPage}
                onChange={handlePageChange}
                color="standard"
                aria-label="Paginação dos projetos"
              />
            </div>
          )}
          {error && (
            <p className="projects__error" role="alert">
              Não foi possível carregar os projetos. Tente novamente mais tarde.
            </p>
          )}
          {!loading && !error && filteredProjects.length === 0 && (
            <ProjectsEmptyState
              title={projects.length === 0 ? 'Ainda não há projetos disponíveis' : 'Não encontrámos projetos'}
              message={
                projects.length === 0
                  ? 'Os novos projetos estarão disponíveis aqui em breve.'
                  : 'Não há projetos que correspondam aos filtros selecionados. Experimente alterar os filtros.'
              }
            />
          )}
        </Grid>
        <Grid size={{ xs: 1, md: 1 }} />
      </Grid>
    </div>
  );
}
