import './contact.css';
import Grid from '@mui/material/Grid';
import contactImage from '../../assets/contact.png';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

export default function ContactSection() {
  return (
    <div id="contact_section0" className="contact_section">
        <Grid container className="landing__grid">
            <Grid size={{ xs: 1, md: 1 }} />
            <Grid container spacing={5} size={{ xs: 10, md: 10 }} className="landing__content">
                <Grid item size={{ xs: 12, sm: 6, md: 8 }}>
                    <div className="title" data-aos="fade-in" data-aos-duration="2000">
                      <h2>Contacte-nos</h2>
                    </div>
                    <div className="description" data-aos="fade-in" data-aos-duration="2000" data-aos-delay="100">
                        <p>Agende uma reunião com os nossos arquitetos. Fale connosco e descubra como podemos adaptar a nossa solução às suas necessidades.</p>
                    </div>
                    <div className="contacts_action">
                        <Button component={Link} to="/contactos" variant="contained">Contactos</Button>
                    </div>
                </Grid>
                <Grid data-aos="fade-in" data-aos-duration="2000" data-aos-delay="100" item size={{ xs: 0, sm: 6, md: 4 }}>
                    <img src={contactImage} alt="Contact" className="contact__image" />
                </Grid>
            </Grid>
            <Grid size={{ xs: 1, md: 1 }} />
        </Grid>    
    </div>
  );
}
