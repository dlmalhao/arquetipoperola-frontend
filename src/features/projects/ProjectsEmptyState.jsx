import ApartmentOutlinedIcon from '@mui/icons-material/ApartmentOutlined';

export default function ProjectsEmptyState({ variant = 'page', title, message }) {
  return (
    <div className={`projects__empty-state projects__empty-state--${variant}`} role="status">
      <div className="projects__empty-icon" aria-hidden="true">
        <ApartmentOutlinedIcon />
      </div>
      <h3>{title}</h3>
      <p>{message}</p>
    </div>
  );
}
