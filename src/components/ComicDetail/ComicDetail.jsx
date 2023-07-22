import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { fetchMarvelCharacter, fetchMarvelComic } from "../../utils/MarvilApi";

const ComicDetail = () => {
  const { resourceURI } = useParams();
  const [comic, setComic] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchComic = async () => {
      try {
        if (!resourceURI) {
          throw new Error("Resource URI is missing.");
        }

        const url = new URL(resourceURI);
        const comicId = url.pathname.split("/").pop();
        const fetchedComic = await fetchMarvelComic(comicId);
        setComic(fetchedComic);
      } catch (error) {
        console.error("Error al obtener los detalles del cómic:", error);
      }
    };

    fetchComic();
  }, [resourceURI]);

  if (!comic) {
    return <div>Cargando...</div>;
  }

  const handleCharacterClick = async (characterId) => {
    try {
      await fetchMarvelCharacter(characterId);
      // Realizar la acción deseada con los detalles del personaje
    } catch (error) {
      console.error("Error al obtener los detalles del personaje:", error);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const { title, description, thumbnail, characters } = comic;

  return (
    <div>
      <h1>{title}</h1>
      <img src={`${thumbnail?.path}.${thumbnail?.extension}`} alt={title} />
      <p>{description}</p>

      <h2>Personajes:</h2>
      {characters.available > 0 ? (
        <ul>
          {characters.items.map((character) => (
            <li key={character.resourceURI}>
              <Link
                to={`/detail/${character.resourceURI.split("/").pop()}`}
                onClick={() =>
                  handleCharacterClick(character.resourceURI.split("/").pop())
                }
              >
                {character.name}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No se encontraron personajes disponibles.</p>
      )}
      <button onClick={handleGoBack}>Volver</button>
    </div>
  );
};

export default ComicDetail;
