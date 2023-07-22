//key privada: b1ee851ee8dc6f9333af3e5fa0c8834d1be997ce
//key publica: ca69e0760fe675bb8f52b4613201b2d8

//ts:1

//1b1ee851ee8dc6f9333af3e5fa0c8834d1be997ceca69e0760fe675bb8f52b4613201b2d8

//hash 72b6c75d977c0ff39000deb612e5355a

//utl: https://gateway.marvel.com:443/v1/public/comics?ts=1&apikey=ca69e0760fe675bb8f52b4613201b2d8&hash=72b6c75d977c0ff39000deb612e5355a

//si quiero usar otro link de la api de marvel agregarle despues del /comic o /character esto =>?ts=1&apikey=ca69e0760fe675bb8f52b4613201b2d8&hash=72b6c75d977c0ff39000deb612e5355a

/* import { useEffect, useState } from "react";
import { fetchMarvelCharacters } from "../../utils/MarvilApi";
import { Link, useParams } from "react-router-dom";

const Container = () => {
  const [comics, setComics] = useState([]);
  const [characters, setCharacters] = useState([]);

  /* useEffect(() => {
    const getMarvelComics = async () => {
      const comicsData = await fetchMarvelComics();
      setComics(comicsData);
    };
    getMarvelComics();
  }, []) */

/* useEffect(() => {
    const getMarvelCharacters = async () => {
      const charactersData = await fetchMarvelCharacters();
      setCharacters(charactersData);
    };
    getMarvelCharacters();
  }, []); */

/* return (
    <>
      <div>
        <h1>cperosnajes</h1>
        <ul>
          {characters.map((personaje) => (
            <div key={personaje.id} className="text-center">
              <li>{personaje.name}</li>
              <Link to={`/detail/${personaje.id}`}>
                <img
                  src={`${personaje.thumbnail.path.replace(
                    "http://",
                    "https://"
                  )}.${personaje.thumbnail.extension}`}
                  className="img-fluid w-25"
                />
              </Link>
            </div>
          ))}
        </ul>
      </div>
    </>
  );
}; */

/* export default Container;  */

//si quiero ver los characters del comic usar esta link de la api http://gateway.marvel.com/v1/public/characters/1009271?ts=1&apikey=ca69e0760fe675bb8f52b4613201b2d8&hash=72b6c75d977c0ff39000deb612e5355a despues del id del personaje ja el ? y el resto

//hacer una funcion que tome el id del personaje e ingresarlo en la url https://gateway.marvel.com/v1/public/characters/{characterId}/series?ts=1&apikey=ca69e0760fe675bb8f52b4613201b2d8&hash=72b6c75d977c0ff39000deb612e5355a

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchMarvelCharacters } from "../../utils/MarvilApi";
import Pagination from "react-bootstrap/Pagination";

const Container = () => {
  const totalPages = 30;
  const charactersPerPage = 30;
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
        (i >= currentPage - 2 && i <= currentPage + 2)
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
        <Pagination.First onClick={() => goToPage(1)} />
        <Pagination.Prev onClick={() => goToPage(currentPage - 1)} />
        {items}
        <Pagination.Next onClick={() => goToPage(currentPage + 1)} />
        <Pagination.Last onClick={() => goToPage(totalPages)} />
      </Pagination>
    );
  };

  return (
    <div className="container">
      <h1>Personajes</h1>
      <ul>
        {characters.map((personaje) => (
          <div key={personaje.id} className="text-center">
            <li>{personaje.name}</li>
            <Link to={`/detail/${personaje.id}`}>
              <img
                src={`${personaje.thumbnail.path.replace(
                  "http://",
                  "https://"
                )}.${personaje.thumbnail.extension}`}
                className="img-fluid w-25"
              />
            </Link>
          </div>
        ))}
      </ul>
      <div className="d-flex justify-content-center mt-4">
        {renderPagination()}
      </div>
    </div>
  );
};

export default Container;
