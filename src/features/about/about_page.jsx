import './about_page.css';
import Grid from '@mui/material/Grid';
import profileImage from '../../assets/profile.png';

export default function AboutPage() {
  return (
    <div id="about" className="about_page">
      <Grid container className="about__grid">
        <Grid size={{ xs: 1, md: 1 }} />
        <Grid size={{ xs: 10, md: 10 }} className="about__content">
            <div className="title" data-aos="fade-in" data-aos-duration="2000">
                <h2>Sobre Nós</h2>
            </div>
            <div className="description" data-aos="fade-in" data-aos-duration="2000" data-aos-delay="100">
                <p>A ArquétipoPérola nasce da vontade de transformar espaços com rigor, sensibilidade e proximidade ao cliente. Trabalhamos lado a lado com arquitetos, construtoras e investidores.</p>
            </div>
            <Grid size={{ xs: 12, md: 12 }} className="about__content">
                <div className="banner">
                    <div className="profileImage">
                        <img src={profileImage} alt="Profile" />
                    </div>
                    <div className="info">
                        <div className="name">
                            <p>Rui Jorge Silva Anjo</p>
                        </div>
                        <div className="role">
                            <p>Fundador</p>
                        </div>
                        <div className="description">
                            • Natural de Angola, tendo vindo viver para Braga desde tenra idade, onde ainda reside.<br />
                            • Homem de paixões e com um enorme espírito empreendedor.<br />
                            • Desde cedo iniciou a sua actividade profissional sempre ligada à área comercial, consultoria financeira e imobiliária.<br />
                            • Recentemente viu a necessidade de constituir a sua própria empresa: Arquetipopérola.
                        </div>
                    </div>
                </div>
            </Grid>
        </Grid>
        <Grid size={{ xs: 1, md: 1 }} />
      </Grid>
    </div>
  );
}