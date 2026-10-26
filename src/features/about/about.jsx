import './about.css';
import Grid from '@mui/material/Grid';

export default function About() {
  return (
    <div id="about" className="about">
      <Grid container className="about__grid">
        <Grid size={{ xs: 1, md: 1 }} />
        <Grid size={{ xs: 10, md: 10 }} className="about__content">
          <div className="title" data-aos="fade-in" data-aos-duration="2000" data-aos-delay="100">
            <h2>Sobre Nós</h2>
          </div>
          <div className="description">
            <div className="flex">
              <span className="01" data-aos="fade-in" data-aos-duration="2000">Acreditamos que a arquitetura vai além do betão e das linhas retas.</span>
              <span className="02" data-aos="fade-in" data-aos-duration="2000" data-aos-delay="200">Projetamos habitações que unem a máxima <span className="highlight">eficiência</span> construtiva a uma <span className="highlight">identidade</span> única, moldada para cada família</span>
              <span className="03" data-aos="fade-in" data-aos-duration="2000" data-aos-delay="400">Casas <span className="highlight">robustas</span>, feitas para durar, com <span className="highlight">20 anos de garantia estrutural</span> e totalmente <span className="highlight">personalizáveis</span>.</span>
            </div>
          </div>          
            <Grid container spacing={5} className="about__cards">
                <Grid data-aos="fade-in" data-aos-duration="2000" size={{ xs: 12, md: 4, xl: 4 }}>
                    <div className="card">
                      <h3>Custos controlados</h3>
                      <p>Habitações planeadas para otimizar custos sem nunca abdicar da qualidade, segurança e design contemporâneo</p>
                    </div>
                </Grid>
                <Grid data-aos="fade-in" data-aos-duration="2000" data-aos-delay="100" size={{ xs: 12, md: 4, xl: 4 }}>
                  <div className="card">
                    <h3>Prontas a Entrar</h3>
                    <p>O nosso método de construção permite-nos entregar 4 habitações por mês, prontas a habitar.</p>
                  </div>
                </Grid>
                <Grid data-aos="fade-in" data-aos-duration="2000" data-aos-delay="200" size={{ xs: 12, md: 4, xl: 4 }}>
                  <div className="card">
                    <h3>Flexibilidade</h3>
                    <p>Soluções flexíveis para todas as famílias, com projetos disponíveis nas tipologias de T1 a T5 e totalmente personalizáveis.</p>
                  </div>
                </Grid>
            </Grid>
        </Grid>
        <Grid size={{ xs: 1, md: 1 }} />
      </Grid>
    </div>
  );
}