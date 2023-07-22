import { Link } from "react-router-dom";

const CharacterDetail = ({ personaje }) => {
  const { name, thumbnail, description, comics } = personaje;

  return (
    <div>
      <h1>{name}</h1>
      <img
        src={
          thumbnail
            ? `${thumbnail.path}.${thumbnail.extension}`
            : `El personaje ${name} no tiene imagen disponible`
        }
        alt={name}
      />
      {description === "" ? (
        <h5>El personaje {name} no tiene descripción disponible</h5>
      ) : (
        <p>{description}</p>
      )}

      {comics?.items.map((comic) => (
        <div key={comic.resourceURI}>
          <Link to={`/comic/${encodeURIComponent(comic.resourceURI)}`}>
            <h1>{comic.name}</h1>
          </Link>
        </div>
      ))}
      <Link to={"/"}>
        <button>volver</button>
      </Link>
    </div>
  );
};

export default CharacterDetail;
