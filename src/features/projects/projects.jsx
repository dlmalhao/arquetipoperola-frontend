import './projects.css';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';
import Card from '../../components/Card';
import useStrapiResource from '../../api/useStrapiResource';
import { normalizeProject } from './projectsData';
import ProjectsEmptyState from './ProjectsEmptyState';

const projectsEndpoint = '/api/projetos?populate=*&sort=publishedAt%3Adesc';

export default function Projects() {
  const isMobile = useMediaQuery('(max-width:600px)');
  const { data, loading, error } = useStrapiResource(projectsEndpoint);
  const projects = Array.isArray(data) ? data.map(normalizeProject).filter(Boolean) : [];
  const latestProjects = projects.slice(0, isMobile ? 3 : 6);

  return (
    <div className="projects">
      <Grid container className="landing__grid">
        <Grid size={{ xs: 1, md: 1 }} />
        <Grid size={{ xs: 10, md: 10 }} className="landing__content">
          <div className="title"><h2>Os nossos projectos</h2></div>
          <Grid container spacing={5} className="projects__grid">
            {latestProjects.map((project) => (
              <Grid
                data-aos="fade-in"
                data-aos-duration="2000"
                data-aos-delay="100"
                key={project.id}
                item
                size={{ xs: 12, sm: 6, md: 4 }}
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
          {error && (
            <p className="projects__error" role="alert">
              Não foi possível carregar os projetos. Tente novamente mais tarde.
            </p>
          )}
          {!loading && !error && latestProjects.length === 0 && (
            <ProjectsEmptyState
              variant="landing"
              title="Ainda não há projetos disponíveis"
              message="Estamos a preparar novos projetos para partilhar consigo."
            />
          )}
          {latestProjects.length > 0 && (
            <div className="projects__action">
              <Button component={Link} to="/projetos" variant="contained">
                Ver todos os projectos
              </Button>
            </div>
          )}
        </Grid>
        <Grid size={{ xs: 1, md: 1 }} />
      </Grid>
    </div>
  );
}
