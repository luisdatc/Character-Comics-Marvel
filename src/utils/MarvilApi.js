import axios from "axios";

const BASE_URL = "https://gateway.marvel.com:443/v1/public/";
const API_KEY =
  "ca69e0760fe675bb8f52b4613201b2d8&hash=72b6c75d977c0ff39000deb612e5355a";

export const fetchMarvelCharacters = async (offset, limit) => {
  try {
    const response = await axios.get(
      `${BASE_URL}characters?orderBy=-modified&limit=${limit}&offset=${offset}&ts=1&apikey=${API_KEY}`
    );

    return response.data.data.results;
  } catch (error) {
    console.error("Error al obtener los personajes de Marvel:", error);
    return [];
  }
};

export const fetchMarvelCharacter = async (cid) => {
  try {
    const response = await axios.get(
      `${BASE_URL}characters/${cid}?ts=1&apikey=${API_KEY}`
    );

    return response.data.data.results[0];
  } catch (error) {
    console.error("Error al obtener el personaje de Marvel:", error);
    return [];
  }
};

export const fetchMarvelComic = async (id) => {
  try {
    const response = await axios.get(
      `${BASE_URL}comics/${id}?ts=1&apikey=${API_KEY}`
    );

    return response.data.data.results[0];
  } catch (error) {
    console.error("Error al obtener el comic de Marvel:", error);
    return [];
  }
};

//hacer una funcioon para el personaje y colcoar el id

//http://gateway.marvel.com/v1/public/series/21942?ts=1&apikey=ca69e0760fe675bb8f52b4613201b2d8&hash=72b6c75d977c0ff39000deb612e5355a
