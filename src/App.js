import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./components/Navigation/Nav";
import AnimeDetails from "./pages/AnimeDetails";
import FavouriteAnime from "./pages/FavouriteAnime";
import Home from "./pages/Home";
import MalAnimeDetails from "./pages/MalAnimeDetails";
import PopularAnime from "./pages/PopularAnime";
import PopularMovies from "./pages/PopularMovies";
import SearchResults from "./pages/SearchResults";
import Top100Anime from "./pages/Top100Anime";
import TrendingAnime from "./pages/TrendingAnime";
import WatchAnime from "./pages/WatchAnime";
import WatchAnimeV2 from "./pages/WatchAnimeV2";
import GlobalStyle from "./styles/globalStyles";

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/popular" element={<PopularAnime />} />
        <Route path="/trending" element={<TrendingAnime />} />
        <Route path="/favourites" element={<FavouriteAnime />} />
        <Route path="/top100" element={<Top100Anime />} />
        <Route path="/movies" element={<PopularMovies />} />
        <Route path="/search/:name" element={<SearchResults />} />
        <Route path="/category/:slug" element={<AnimeDetails />} />
        <Route path="/watch/:episode" element={<WatchAnime />} />
        <Route path="/id/:id" element={<MalAnimeDetails />} />
        <Route path="/play/:slug/:episode" element={<WatchAnimeV2 />} />
      </Routes>
    </Router>
  );
}

export default App;
