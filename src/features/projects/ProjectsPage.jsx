import './projects.css';
import Grid from '@mui/material/Grid';
import { Link, useSearchParams } from 'react-router-dom';
import Card from '../../components/Card';
import { allProjectTypes, allTipologies, filterProjects } from './projectsData';

export default function ProjectsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const tipologia = searchParams.get('tipologia') || '';
  const tipo = searchParams.get('tipo') || '';

  const filteredProjects = filterProjects({ tipologia, tipo });

  const handleFilterChange = (key, value) => {
    const nextParams = new URLSearchParams(searchParams);

    if (!value) {
      nextParams.delete(key);
    } else {
      nextParams.set(key, value);
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
              <Grid item size={{ xs: 12, sm: 6, md: 3 }}>

                  <label htmlFor="tipologia-filter" style={{ display: 'block', marginBottom: 8 }}>
                    Tipologia
                  </label>
                  <select
                    id="tipologia-filter"
                    value={tipologia}
                    onChange={(event) => handleFilterChange('tipologia', event.target.value)}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: 8 }}
                  >
                    <option value="">Todas</option>
                    {allTipologies.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
              </Grid>

              <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
                <label htmlFor="type-filter" style={{ display: 'block', marginBottom: 8 }}>
                  Tipo de projeto
                </label>
                <select
                  id="type-filter"
                  value={tipo}
                  onChange={(event) => handleFilterChange('tipo', event.target.value)}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: 8 }}
                >
                  <option value="">Todos</option>
                  {allProjectTypes.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </Grid>
                
            </Grid>
          </div>
          <p style={{ marginBottom: '1.5rem' }} data-aos="fade-in" data-aos-duration="2000" data-aos-delay="200">
            {filteredProjects.length} projeto{filteredProjects.length === 1 ? '' : 's'} encontrado{filteredProjects.length === 1 ? '' : 's'}
          </p>

          {filteredProjects.length === 0 ? (
            <div className="project-detail__empty">
              <p>Sem resultados para os filtros selecionados.</p>
            </div>
          ) : (
            <Grid container spacing={5} className="projects__grid">
              {filteredProjects.map((project) => (
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
                      image={project.images?.[0]}
                    />
                  </Link>
                </Grid>
              ))}
            </Grid>
          )}
        </Grid>
        <Grid size={{ xs: 1, md: 1 }} />
      </Grid>
    </div>
  );
}
