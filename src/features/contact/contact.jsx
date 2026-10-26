import './contact.css';
import Grid from '@mui/material/Grid';

export default function Contact() {
  return (
    <div id="contact" className="contact">
      <Grid container className="contact__grid">
        <Grid size={{ xs: 1, md: 1 }} />
        <Grid size={{ xs: 10, md: 10 }} className="contact__content">
            <div className="title" data-aos="fade-in" data-aos-duration="2000">
                <h2>Contactos</h2>
            </div>
            <div className="description" data-aos="fade-in" data-aos-duration="2000" data-aos-delay="100">
                <p>Se procura uma solução de habitação modular e personalizada, estamos prontos para ouvir o seu projeto, esclarecer todas as dúvidas e apresentar uma proposta adaptada às suas necessidades, objetivos e espaço disponível.</p>
            </div>
            <Grid container spacing={2} sx={{ mb: 4 }}>
                <Grid item size={{ xs: 12, md: 4}}>
                    <div className="contact__details" data-aos="fade-in" data-aos-duration="2000" data-aos-delay="100">
                      <div className="contact__item">
                        <h3>Morada</h3>
                        <p>
                          Praceta Padre Diamantino Martins 22, Maximinos, 4700-438 Braga
                        </p>
                      </div>
                      <div className="contact__item">
                        <h3>Email</h3>
                        <p>
                          <a href="mailto:ruisilvaanjo@gmail.com">ruisilvaanjo@gmail.com</a>
                        </p>
                      </div>
                      <div className="contact__item">
                        <h3>Telefone</h3>
                        <p>
                          <a href="tel:+351916638614">916 638 614</a>
                        </p>
                      </div>
                    </div>
                </Grid>
                <Grid item size={{ xs: 12, md: 8}}>
                    <div className="contact__map-wrapper" data-aos="fade-in" data-aos-duration="2000" data-aos-delay="300">
                      <iframe
                        title="Localização da Arquétipo Pérola"
                        src="https://www.google.com/maps?q=Praceta%20Padre%20Diamantino%20Martins%2022%20Maximinos%204700-438%20Braga&output=embed"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        allowFullScreen
                      />
                    </div>
                </Grid>
            </Grid>
        </Grid>
        <Grid size={{ xs: 1, md: 1 }} />
      </Grid>
    </div>
  );
}
