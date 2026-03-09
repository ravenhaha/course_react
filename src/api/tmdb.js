import axios from 'axios';

const API_KEY = import.meta.env.VITE_KINOPOISK_API_KEY;

export const getImageUrl = (path) => {
  if (!path) return '/no-poster.png';
  return path;
};

const kp = axios.create({
  baseURL: 'https://kinopoiskapiunofficial.tech',
  headers: {
    'X-API-KEY': API_KEY,
    'Content-Type': 'application/json',
  },
});

const normalizeFilm = (film) => ({
  id: film.filmId || film.kinopoiskId,
  title: film.nameRu || film.nameEn || 'Без названия',
  poster_path: film.posterUrlPreview || film.posterUrl || null,
  vote_average: parseFloat(film.rating || film.ratingKinopoisk || 0),
  release_date: film.year ? `${film.year}-01-01` : null,
  genre_ids: (film.genres || []).map((g) => g.id).filter(Boolean),
  overview: film.description || '',
});

const normalizeDetails = (film, staff = [], similarItems = []) => ({
  id: film.kinopoiskId,
  title: film.nameRu || film.nameEn,
  tagline: film.slogan || '',
  overview: film.description || '',
  poster_path: film.posterUrl || film.posterUrlPreview || null,
  backdrop_path: null,
  vote_average: film.ratingKinopoisk || 0,
  release_date: film.year ? `${film.year}-01-01` : null,
  runtime: film.filmLength || 0,
  genres: (film.genres || []).map((g) => ({ id: g.id, name: g.genre })),
  credits: {
    cast: staff
      .filter((s) => s.professionKey === 'ACTOR')
      .slice(0, 12)
      .map((s) => ({ id: s.staffId, name: s.nameRu || s.nameEn })),
  },
  similar: {
    results: similarItems.slice(0, 4).map((m) => ({
      id: m.filmId,
      title: m.nameRu || m.nameEn,
      poster_path: m.posterUrlPreview || m.posterUrl || null,
      vote_average: parseFloat(m.rating || 0),
    })),
  },
});

export const getTrendingMovies = async () => {
  const res = await kp.get('/api/v2.2/films/top', {
    params: { type: 'TOP_AWAIT_FILMS', page: 1 },
  });
  return { data: { results: res.data.films.map(normalizeFilm) } };
};

export const getPopularMovies = async (page = 1) => {
  const res = await kp.get('/api/v2.2/films/top', {
    params: { type: 'TOP_100_POPULAR_FILMS', page },
  });
  return {
    data: {
      results: res.data.films.map(normalizeFilm),
      total_pages: res.data.pagesCount,
    },
  };
};

export const searchMovies = async (query, { genreId, year, page = 1 } = {}) => {
  if (query) {
    const res = await kp.get('/api/v2.1/films/search-by-keyword', {
      params: { keyword: query, page },
    });
    return {
      data: {
        results: res.data.films.map(normalizeFilm),
        total_pages: res.data.pagesCount,
      },
    };
  }
  const res = await kp.get('/api/v2.2/films', {
    params: {
      order: 'RATING',
      page,
      ...(genreId && { genres: genreId }),
      ...(year && { yearFrom: year, yearTo: year }),
    },
  });
  return {
    data: {
      results: res.data.items.map(normalizeFilm),
      total_pages: res.data.totalPages,
    },
  };
};

export const getMovieDetails = async (id) => {
  const [filmRes, staffRes, similarRes] = await Promise.all([
    kp.get(`/api/v2.2/films/${id}`),
    kp.get('/api/v1/staff', { params: { filmId: id } }),
    kp.get(`/api/v2.2/films/${id}/similars`),
  ]);
  return { data: normalizeDetails(filmRes.data, staffRes.data, similarRes.data.items || []) };
};

export const getGenres = async () => {
  const res = await kp.get('/api/v2.2/films/filters');
  const genres = (res.data.genres || [])
    .filter((g) => g.id && g.genre)
    .map((g) => ({ id: g.id, name: g.genre }));
  return { data: { genres } };
};
