import './about.css';
import Grid from '@mui/material/Grid';
import ResourceState from '../../components/ResourceState';
import useSiteContent from '../../content/useSiteContent';

export default function About() {
  const { content, loading, error } = useSiteContent();
  const highlights = Array.isArray(content?.destaquesSobre) ? content.destaquesSobre : [];

  return (
    <div id="about" className="about">
      <Grid container className="about__grid">
        <Grid size={{ xs: 1, md: 1 }} />
        <Grid size={{ xs: 10, md: 10 }} className="about__content">
          <ResourceState
            loading={loading}
            error={error}
            empty={content ? null : 'Ainda não existe conteúdo sobre a empresa.'}
          >
            <>
              {content?.tituloSobre && (
                <div className="title" data-aos="fade-in" data-aos-duration="2000" data-aos-delay="100">
                  <h2>{content.tituloSobre}</h2>
                </div>
              )}
              {content?.introducaoSobre && (
                <div className="description">
                  <p>{content.introducaoSobre}</p>
                </div>
              )}
              {highlights.length > 0 && (
                <Grid container spacing={5} className="about__cards">
                  {highlights.map((highlight, index) => (
                    <Grid
                      key={highlight.id ?? `${highlight.titulo}-${index}`}
                      data-aos="fade-in"
                      data-aos-duration="2000"
                      data-aos-delay={index * 100}
                      size={{ xs: 12, md: 4, xl: 4 }}
                    >
                      <div className="card">
                        {highlight.titulo && <h3>{highlight.titulo}</h3>}
                        {highlight.descricao && <p>{highlight.descricao}</p>}
                      </div>
                    </Grid>
                  ))}
                </Grid>
              )}
            </>
          </ResourceState>
        </Grid>
        <Grid size={{ xs: 1, md: 1 }} />
      </Grid>
    </div>
  );
}
