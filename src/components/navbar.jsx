import { useEffect, useState } from 'react';
import './navbar.css';
import Grid from '@mui/material/Grid';
import { Link, NavLink, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const handleToggle = () => setOpen((current) => !current);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (location.pathname !== '/' || !location.hash) return;

    const id = location.hash.replace('#', '');
    const target = document.getElementById(id);

    if (target) {
      requestAnimationFrame(() => {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  }, [location]);

  // const handleAnchorClick = (event, hash) => {
  //   event.preventDefault();
  //   handleClose();

  //   if (location.pathname !== '/') {
  //     navigate(`/${hash}`);
  //     return;
  //   }

  //   const id = hash.replace('#', '');
  //   const target = document.getElementById(id);

  //   if (target) {
  //     target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  //     window.history.replaceState(null, '', hash);
  //   } else {
  //     window.location.hash = hash;
  //   }
  // };

  return (
    <Grid container className="navbar" component="nav" aria-label="Navegação principal">
      <Grid size={{ xs: 1, md: 1 }} />
      <Grid item size={{ xs: 10, md: 10 }} className="navbar__inner">
        <div className="navbar__brand">
          <Link to="/" onClick={handleClose}>
            <img src={logo} alt="Logo do site" className="navbar__logo" />
          </Link>
        </div>
        <button
          type="button"
          className={`navbar__burger ${open ? 'is-open' : ''}`}
          aria-controls="navbar-links"
          aria-expanded={open}
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          onClick={handleToggle}
        >
          <span />
          <span />
          <span />
        </button>
        <div id="navbar-links" className={`navbar__links ${open ? 'navbar__links--open' : ''}`}>
          <NavLink to="/" end onClick={handleClose}>Início</NavLink>
          <NavLink to="/sobre" onClick={handleClose}>Sobre Nós</NavLink>
          <NavLink to="/projetos" onClick={handleClose}>Projetos</NavLink>
          <NavLink to="/contactos" onClick={handleClose}>Contacto</NavLink>
        </div>
      </Grid>
      <Grid size={{ xs: 1, md: 1 }} />
    </Grid>
  );
}
