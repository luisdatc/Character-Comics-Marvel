import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchMarvelCharacters } from "../../utils/MarvilApi";
import { Card, Col, Row } from "react-bootstrap";
import Pagination from "react-bootstrap/Pagination";

import "./Container.scss";

const Container = () => {
  const totalPages = 30;
  const charactersPerPage = 32;
  const [characters, setCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchCharacters = async () => {
      const offset = (currentPage - 1) * charactersPerPage;
      const charactersData = await fetchMarvelCharacters(
        offset,
        charactersPerPage
      );
      setCharacters(charactersData);
    };
    fetchCharacters();
  }, [currentPage]);

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const renderPagination = () => {
    const items = [];
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 2 && i <= currentPage + 4)
      ) {
        items.push(
          <Pagination.Item
            key={i}
            active={i === currentPage}
            onClick={() => goToPage(i)}
          >
            {i}
          </Pagination.Item>
        );
      } else if (
        (i === currentPage - 5 && i !== 1) ||
        (i === currentPage + 5 && i !== totalPages)
      ) {
        items.push(<Pagination.Ellipsis key={i} />);
      }
    }

    return (
      <Pagination>
        <Pagination.Prev onClick={() => goToPage(currentPage - 1)} />
        {items}
        <Pagination.Next onClick={() => goToPage(currentPage + 1)} />
      </Pagination>
    );
  };

  return (
    <div className="container">
      <h1 className="m-1">Personajes</h1>
      <Row xs={2} md={3} lg={4} className="g-4 m-0">
        {characters.length === 0 ? (
          <div className="loading-message">Cargando personajes...</div>
        ) : (
          characters.map((personaje) => {
            return (
              <Col key={personaje.id}>
                <Card className="carddd">
                  <Link to={`/detail/${personaje.id}`}>
                    <Card.Img
                      variant="top"
                      src={`${personaje.thumbnail.path}.${personaje.thumbnail.extension}`}
                      className="prueba"
                    />
                    <Card.Body className="bodyy">
                      <Card.Title>{personaje.name}</Card.Title>
                    </Card.Body>
                  </Link>
                </Card>
              </Col>
            );
          })
        )}
      </Row>
      <div className="d-flex justify-content-center mt-4">
        {characters.length !== 0 && renderPagination()}
      </div>
    </div>
  );
};

export default Container;
