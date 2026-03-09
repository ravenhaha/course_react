import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Box, Chip, Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useDispatch, useSelector } from 'react-redux';
import { addToWatchlist, removeFromWatchlist } from '../../store/watchlistSlice';
import { getMovieDetails, getImageUrl } from '../../api/tmdb';
import MovieCard from '../../components/MovieCard/MovieCard';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import GenreChip from '../../components/GenreChip/GenreChip';
import RatingBadge from '../../components/RatingBadge/RatingBadge';
import styles from './MovieDetailPage.module.css';

function MovieDetailPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const watchlist = useSelector((state) => state.watchlist);
  const isInWatchlist = watchlist.some((m) => m.id === movie?.id);

  useEffect(() => {
    setLoading(true);
    setMovie(null);
    getMovieDetails(id)
      .then((res) => setMovie(res.data))
      .catch(() => setError('Не удалось загрузить информацию о фильме'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleWatchlist = () => {
    if (isInWatchlist) {
      dispatch(removeFromWatchlist(movie.id));
    } else {
      dispatch(
        addToWatchlist({
          id: movie.id,
          title: movie.title,
          poster_path: movie.poster_path,
          vote_average: movie.vote_average,
        })
      );
    }
  };

  if (loading) return <Loader count={4} />;
  if (error) return <ErrorMessage message={error} />;
  if (!movie) return null;

  return (
    <Box>
      {movie.backdrop_path && (
        <Box
          className={styles.backdrop}
          style={{ backgroundImage: `url(${getImageUrl(movie.backdrop_path)})` }}
        />
      )}

      <Container>
        <Box className={styles.hero}>
          <Box className={styles.posterWrap}>
            <img
              src={getImageUrl(movie.poster_path)}
              alt={movie.title}
              className={styles.poster}
            />
          </Box>

          <Box className={styles.info}>
            <Typography variant="h4" fontWeight={700} gutterBottom>
              {movie.title}
            </Typography>

            {movie.tagline && (
              <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 1 }}>
                {movie.tagline}
              </Typography>
            )}

            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
              <RatingBadge rating={movie.vote_average} size="medium" />
              {movie.release_date && (
                <Chip
                  icon={<CalendarMonthIcon />}
                  label={movie.release_date.slice(0, 4)}
                  size="small"
                  variant="outlined"
                />
              )}
              {movie.runtime > 0 && (
                <Chip
                  icon={<AccessTimeIcon />}
                  label={`${movie.runtime} мин`}
                  size="small"
                  variant="outlined"
                />
              )}
            </Box>

            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
              {movie.genres?.map((g) => (
                <GenreChip key={g.id} genre={g} />
              ))}
            </Box>

            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              {movie.overview || 'Описание отсутствует'}
            </Typography>

            <Button
              variant="contained"
              startIcon={isInWatchlist ? <BookmarkRemoveIcon /> : <BookmarkAddIcon />}
              onClick={handleWatchlist}
              color={isInWatchlist ? 'error' : 'primary'}
            >
              {isInWatchlist ? 'Удалить из вишлиста' : 'В вишлист'}
            </Button>
          </Box>
        </Box>

        {movie.credits?.cast?.length > 0 && (
          <Box sx={{ mt: 5 }}>
            <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
              В ролях
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {movie.credits.cast.slice(0, 12).map((actor) => (
                <Chip key={actor.id} label={actor.name} variant="outlined" size="small" />
              ))}
            </Box>
          </Box>
        )}

        {movie.similar?.results?.length > 0 && (
          <Box sx={{ mt: 5, mb: 4 }}>
            <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
              Похожие фильмы
            </Typography>
            <Grid container spacing={2}>
              {movie.similar.results.slice(0, 4).map((m) => (
                <Grid key={m.id} size={{ xs: 6, sm: 3 }}>
                  <MovieCard movie={m} />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default MovieDetailPage;
