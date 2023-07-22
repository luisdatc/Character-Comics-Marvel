import "reset-default-style";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "./components/Container/Container";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CharacterDetailContainer from "./components/CharacterDetailContainer/CharacterDetailContainer";
import ComicDetail from "./components/ComicDetail/ComicDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Container />} />
        <Route
          path="/detail/:cid"
          element={<CharacterDetailContainer />}
        ></Route>
        <Route path="/comic/:resourceURI" element={<ComicDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
