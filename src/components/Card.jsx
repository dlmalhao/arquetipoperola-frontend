import './Card.css';

export default function Card({ name, type, image }) {
  return (
    <article className="card-component">
      <div
        className="card-component__image"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className="card-component__info">
        <span className="card-component__title">{name}</span>
        <span className="card-component__type">{type}</span>
      </div>
    </article>
  );
}
