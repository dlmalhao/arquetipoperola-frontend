import './App.css';
import Box from '@mui/material/Box';
import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Navbar from './components/navbar.jsx';
import Footer from './components/footer.jsx';
import Landing from './features/landing/landing.jsx';
import About from './features/about/about.jsx';
import Projects from './features/projects/projects.jsx';
import ProjectsPage from './features/projects/ProjectsPage.jsx';
import ProjectDetail from './features/projects/ProjectDetail.jsx';
import Contact from './features/contact/contact.jsx';
import ContactSection from './features/contact_section/contact.jsx';
import AboutPage from './features/about/about_page.jsx';

function App() {
  useEffect(() => {
    AOS.init({ once: true, duration: 800 });
  }, []);

  return (
    <Box
      sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
      data-aos="fade-up"
      data-aos-duration="900"
    >
      <Navbar />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Landing />
                <About />
                <Projects />
                <ContactSection />
              </>
            }
          />
          <Route path="/sobre" element={<AboutPage />} />
          <Route path="/projetos" element={<ProjectsPage />} />
          <Route path="/projetos/:slug" element={<ProjectDetail />} />
          <Route path="/contactos" element={<Contact />} />
          <Route path="*" element={<Landing />} />
        </Routes>
      </Box>
      <Footer />
    </Box>
  );
}

export default App;
