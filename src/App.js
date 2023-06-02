
import './App.css';
import 'leaflet/dist/leaflet.css';
import 'react-leaflet-markercluster/dist/styles.min.css';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import 'react-image-lightbox/style.css';
import "react-multi-carousel/lib/styles.css";
import Home from './pages/home';
import RoomDetail from './pages/roomDetail';
import SearchPage from './pages/searchPage';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/search" element={<SearchPage />} />
        <Route exact path="/room_details/:id" element={<RoomDetail />} />

      </Routes>

    </Router>

  );
}

export default App;
