import { useEffect, useState } from 'react';
import { Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { getTrendingMovies, getPopularMovies } from '../../api/tmdb';
import MovieCard from '../../components/MovieCard/MovieCard';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

function HomePage() {
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const [trendingRes, popularRes] = await Promise.all([
          getTrendingMovies(),
          getPopularMovies(),
        ]);
        setTrending(trendingRes.data.results.slice(0, 6));
        setPopular(popularRes.data.results);
      } catch {
        setError('Не удалось загрузить фильмы. Убедитесь, что API ключ указан в файле .env');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <Container>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
        В тренде на этой неделе
      </Typography>
      <Grid container spacing={2} sx={{ mb: 5 }}>
        {trending.map((movie) => (
          <Grid key={movie.id} size={{ xs: 6, sm: 4, md: 2 }}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>

      <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
        Популярное
      </Typography>
      <Grid container spacing={2}>
        {popular.map((movie) => (
          <Grid key={movie.id} size={{ xs: 6, sm: 4, md: 3 }}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default HomePage;
