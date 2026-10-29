import './Card.css';

export default function Card({ name, type, image, badge, muted = false }) {
  return (
    <article className={`card-component${muted ? ' card-component--muted' : ''}`}>
      <div
        className="card-component__image"
        style={image ? { backgroundImage: `url("${image}")` } : undefined}
      >
        {badge && <span className="card-component__badge">{badge}</span>}
      </div>
      <div className="card-component__info">
        <span className="card-component__title">{name}</span>
        <span className="card-component__type">{type}</span>
      </div>
    </article>
  );
}
