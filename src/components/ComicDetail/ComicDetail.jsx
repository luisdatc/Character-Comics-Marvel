import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { fetchMarvelCharacter, fetchMarvelComic } from "../../utils/MarvilApi";
import { Col, Container, Row } from "react-bootstrap";

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
    setTimeout(fetchComic(), 2000);
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
    <Container className="mt-lg-4 mt-md-2 mt-2">
      <Row>
        <Col sm={12} md={6} lg={6} xl={6} className="text-center">
          <img
            src={`${thumbnail?.path}.${thumbnail?.extension}`}
            alt={title}
            className="img-fluid"
          />
        </Col>
        <Col sm={12} md={6} lg={6} xl={6} className="text-center">
          <h1>{title}</h1>
          <p>{description}</p>
        </Col>
      </Row>

      <Row>
        <Col sm={12} md={12} lg={12} xl={12} className="text-center mt-3 mb-3">
          <h2>Personajes con apareiciones en {title}:</h2>
        </Col>
        <Col sm={12} md={12} lg={12} xl={12} className="text-center">
          {characters.available > 0 ? (
            <div>
              {characters.items.map((character) => (
                <p key={character.resourceURI}>
                  <Link
                    to={`/detail/${character.resourceURI.split("/").pop()}`}
                    onClick={() =>
                      handleCharacterClick(
                        character.resourceURI.split("/").pop()
                      )
                    }
                  >
                    {character.name}
                  </Link>
                </p>
              ))}
            </div>
          ) : (
            <p>No se encontraron personajes disponibles.</p>
          )}
        </Col>
      </Row>

      <Col className="text-center mt-4">
        <button onClick={handleGoBack}>Volver</button>
      </Col>
    </Container>
  );
};

export default ComicDetail;
