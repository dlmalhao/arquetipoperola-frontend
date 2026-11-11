import './about.css';
import Grid from '@mui/material/Grid';

const services = [
  {
    title: 'Soluções personalizadas',
    text: 'Cada cliente e cada projeto são únicos. Desenvolvemos soluções imobiliárias adaptadas às necessidades, objetivos e expectativas de cada investimento.',
  },
  {
    title: 'Construção e remodelação',
    text: 'Transformamos espaços e damos nova vida a imóveis existentes. Desenvolvemos projetos de construção e remodelação, combinando funcionalidade, qualidade e soluções adaptadas às necessidades de cada cliente.',
  },
  {
    title: 'Visão e valorização',
    text: 'Identificamos o potencial de cada imóvel e projeto, procurando criar valor através de decisões estratégicas, conhecimento do mercado e uma visão de longo prazo.',
  },
];

export default function About() {
  return (
    <div id="about" className="about">
      <Grid container className="about__grid">
        <Grid size={{ xs: 1, md: 1 }} />
        <Grid size={{ xs: 10, md: 10 }} className="about__content">
          <div className="title" data-aos="fade-in" data-aos-duration="2000" data-aos-delay="100">
            <h2>Sobre Nós</h2>
          </div>
          <div className="about__intro">
            <p className="about__tagline" data-aos="fade-in" data-aos-duration="2000">
              Mais do que imóveis, ajudamos a <strong>construir sonhos</strong>.
            </p>
            <div className="about__text">
              <p data-aos="fade-in" data-aos-duration="2000" data-aos-delay="100">
                Acreditamos que cada projeto começa com uma visão e que cada espaço tem o potencial
                de se transformar em algo extraordinário.
              </p>
              <p data-aos="fade-in" data-aos-duration="2000" data-aos-delay="200">
                Combinamos <span className="highlight">experiência, conhecimento do mercado imobiliário
                e soluções personalizadas</span> para transformar oportunidades em projetos de valor.
              </p>
              <p data-aos="fade-in" data-aos-duration="2000" data-aos-delay="300">
                Acompanhamos cada etapa com <span className="highlight">profissionalismo, dedicação e
                compromisso</span>, porque construir o futuro começa com as escolhas certas.
              </p>
            </div>
          </div>
          <Grid container spacing={{ xs: 2, md: 4 }} className="about__cards">
            {services.map((service, index) => (
              <Grid
                key={service.title}
                data-aos="fade-in"
                data-aos-duration="2000"
                data-aos-delay={index * 100}
                size={{ xs: 12, md: 4 }}
              >
                <div className="card">
                  <span className="card__number">{String(index + 1).padStart(2, '0')}</span>
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                </div>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid size={{ xs: 1, md: 1 }} />
      </Grid>
    </div>
  );
}
