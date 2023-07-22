import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CharacterDetail from "../CharacterDetail/CharacterDetail";
import { fetchMarvelCharacter } from "../../utils/MarvilApi";

const CharacterDetailContainer = () => {
  const [personaje, setPersonaje] = useState({});
  const { cid } = useParams();

  useEffect(() => {
    const getMarvelCharacter = async () => {
      const characterData = await fetchMarvelCharacter(cid);
      setPersonaje(characterData);
    };
    getMarvelCharacter();
  }, [cid]);

  return (
    <div>
      <CharacterDetail personaje={personaje} />
    </div>
  );
};

export default CharacterDetailContainer;
