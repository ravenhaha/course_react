import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Container,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import SearchIcon from '@mui/icons-material/Search';
import { searchMovies, getGenres } from '../../api/tmdb';
import MovieCard from '../../components/MovieCard/MovieCard';
import SearchBar from '../../components/SearchBar/SearchBar';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [query, setQuery] = useState('');
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(searchParams.get('genre') || '');
  const [year, setYear] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    getGenres()
      .then((res) => setGenres(res.data.genres))
      .catch(() => {});
  }, []);

  const handleSearch = useCallback(
    async (newPage = 1) => {
      try {
        setLoading(true);
        setError(null);
        const res = await searchMovies(query, {
          genreId: selectedGenre,
          year,
          page: newPage,
        });
        if (newPage === 1) {
          setMovies(res.data.results);
        } else {
          setMovies((prev) => [...prev, ...res.data.results]);
        }
        setTotalPages(res.data.total_pages);
        setPage(newPage);
      } catch {
        setError('Ошибка при поиске. Попробуйте позже.');
      } finally {
        setLoading(false);
      }
    },
    [query, selectedGenre, year]
  );

  useEffect(() => {
    handleSearch(1);
  }, [selectedGenre]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchParams(selectedGenre ? { genre: selectedGenre } : {});
    handleSearch(1);
  };

  return (
    <Container>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
        Поиск фильмов
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap' }}>
        <Box sx={{ flexGrow: 1, minWidth: 200 }}>
          <SearchBar value={query} onChange={setQuery} onSearch={() => handleSearch(1)} />
        </Box>

        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Жанр</InputLabel>
          <Select
            value={selectedGenre}
            label="Жанр"
            onChange={(e) => setSelectedGenre(e.target.value)}
          >
            <MenuItem value="">Все жанры</MenuItem>
            {genres.map((g) => (
              <MenuItem key={g.id} value={g.id}>
                {g.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Год"
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          sx={{ width: 110 }}
          inputProps={{ min: 1900, max: 2026 }}
        />

        <Button type="submit" variant="contained" startIcon={<SearchIcon />}>
          Найти
        </Button>
      </Box>

      {error && <ErrorMessage message={error} />}

      {!loading && movies.length === 0 && !error && (
        <Typography color="text.secondary" sx={{ textAlign: 'center', mt: 6 }}>
          Ничего не найдено
        </Typography>
      )}

      <Grid container spacing={2}>
        {movies.map((movie) => (
          <Grid key={movie.id} size={{ xs: 6, sm: 4, md: 3 }}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>

      {loading && <Loader count={4} />}

      {page < totalPages && !loading && (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button variant="outlined" onClick={() => handleSearch(page + 1)}>
            Загрузить ещё
          </Button>
        </Box>
      )}
    </Container>
  );
}

export default SearchPage;
