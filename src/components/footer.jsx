import './footer.css';
import Grid from '@mui/material/Grid';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getStrapiMediaUrl } from '../api/strapi';
import useSiteContent from '../content/useSiteContent';

export default function Footer() {
  const location = useLocation();
  const navigate = useNavigate();
  const { content } = useSiteContent();
  const logo = getStrapiMediaUrl(content?.logotipo);

  const handleAnchorClick = (event, hash) => {
    event.preventDefault();

    if (location.pathname !== '/') {
      navigate(`/${hash}`);
      return;
    }

    const id = hash.replace('#', '');
    const target = document.getElementById(id);

    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.replaceState(null, '', hash);
    } else {
      window.location.hash = hash;
    }
  };
  return (
    <footer className="footer">
      <Grid container className="footer__grid">
        <Grid size={{ xs: 1, md: 1 }} />
        <Grid container size={{ xs: 10, md: 10 }} className="footer__content">
          <Grid item size={{ xs: 12, md: 6 }} className="footer__brand">
            <Link to="/">
              {logo && <img src={logo} alt={content?.nomeEmpresa || ''} className="footer__logo" />}
            </Link>
          </Grid>
          <Grid item size={{ xs: 12, md: 6 }} className="footer__links">
            <Link to="/">Início</Link>
            <Link to="#about" onClick={(event) => handleAnchorClick(event, '#about')}>Sobre Nós</Link>
            <Link to="/projetos">Projetos</Link>
            <Link to="#contact" onClick={(event) => handleAnchorClick(event, '#contact')}>Contacto</Link>
            {content?.nomeEmpresa && (
              <p className="footer__copyright">© {new Date().getFullYear()} {content.nomeEmpresa}</p>
            )}
          </Grid>
        </Grid>
        <Grid size={{ xs: 1, md: 1 }} />
      </Grid>
    </footer>
  );
}
