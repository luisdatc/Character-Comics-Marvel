import Container from "./components/Container/Container";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CharacterDetailContainer from "./components/CharacterDetailContainer/CharacterDetailContainer";
import ComicDetail from "./components/ComicDetail/ComicDetail";
import Menu from "./components/Menu/Menu";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "reset-default-style";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <BrowserRouter>
      <Menu />
      <Routes>
        <Route path="/" element={<Container />} />
        <Route
          path="/detail/:cid"
          element={<CharacterDetailContainer />}
        ></Route>
        <Route path="/comic/:resourceURI" element={<ComicDetail />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
