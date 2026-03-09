import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout/MainLayout.jsx';
import HomePage from './pages/HomePage/HomePage.jsx';
import SearchPage from './pages/SearchPage/SearchPage.jsx';
import MovieDetailPage from './pages/MovieDetailPage/MovieDetailPage.jsx';
import WatchlistPage from './pages/WatchlistPage/WatchlistPage.jsx';
import ProfilePage from './pages/ProfilePage/ProfilePage.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="movie/:id" element={<MovieDetailPage />} />
        <Route path="watchlist" element={<WatchlistPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>
    </Routes>
  );
}

export default App;
