import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./CharacterDetail.scss";

const CharacterDetail = ({ personaje }) => {
  const { name, thumbnail, description, comics } = personaje;

  return (
    <Container className="mt-lg-4 mt-md-2 mt-2">
      <Row>
        <Col sm={12} md={6} lg={6} xl={6} className="text-center">
          <img
            src={
              thumbnail
                ? `${thumbnail.path}.${thumbnail.extension}`
                : `El personaje ${name} no tiene imagen disponible`
            }
            alt={name}
            className="img-fluid"
          />
        </Col>
        <Col sm={12} md={6} lg={6} xl={6}>
          <h1>{name}</h1>
          {description === "" ? (
            <h5 className="">
              El personaje {name} no tiene descripción disponible
            </h5>
          ) : (
            <p>{description}</p>
          )}
        </Col>
      </Row>

      <Row>
        <Col sm={12} md={12} lg={12} xl={12} className="mt-3 mb-3">
          <h2 className="text-center">Apariciones de {name} en los comics: </h2>
        </Col>
        <Col sm={12} md={12} lg={12} xl={12} className="comics text-center">
          {comics?.items.map((comic) => (
            <div key={comic.resourceURI}>
              <Link to={`/comic/${encodeURIComponent(comic.resourceURI)}`}>
                <span>{comic.name}</span>
              </Link>
            </div>
          ))}
        </Col>
      </Row>

      <Col className="text-center">
        <Link to={"/"}>
          <button>volver</button>
        </Link>
      </Col>
    </Container>

    /*  <div>

    </div> */
  );
};

export default CharacterDetail;
