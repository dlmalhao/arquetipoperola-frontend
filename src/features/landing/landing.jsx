import './_landing.css';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div id="home" className="landing">
      <Grid container className="landing__grid">
        <Grid size={{ xs: 1, md: 1 }} />
        <Grid size={{ xs: 10, md: 10 }} className="landing__content">
          <div className="text-component">
            <h1 data-aos="fade-in" data-aos-duration="2000" data-aos-delay="100">A evolução da habitação é <span className="break-line">industrial</span></h1>
            <div className="description" data-aos="fade-in" data-aos-duration="2000" data-aos-delay="200">
              <h3>Projetamos e construímos casas <span className="highlight">modulares</span> de alta <span className="highlight">performance</span> com custos rigidamente controlados.</h3>
              <h3>Arquitetura <span className="highlight">inteligente</span>, produzida dentro de portas e entregue <span className="highlight">pronta a habitar</span>.</h3>
            </div>
            <Button component={Link} to="/projetos" variant="contained" data-aos="fade-in" data-aos-duration="2000" data-aos-delay="300">
              Ver projetos
            </Button>
          </div>
        </Grid>
        <Grid size={{ xs: 1, md: 1 }} />
      </Grid>
    </div>
  );
}