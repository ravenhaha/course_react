import { Container, Typography, Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useSelector } from 'react-redux';
import MovieCard from '../../components/MovieCard/MovieCard';

function WatchlistPage() {
  const watchlist = useSelector((state) => state.watchlist);

  if (watchlist.length === 0) {
    return (
      <Container>
        <Box sx={{ textAlign: 'center', mt: 10 }}>
          <BookmarkIcon sx={{ fontSize: 80, color: 'text.disabled' }} />
          <Typography variant="h5" color="text.secondary" sx={{ mt: 2 }}>
            Ваш вишлист пуст
          </Typography>
          <Typography variant="body2" color="text.disabled" sx={{ mt: 1 }}>
            Добавляйте фильмы, нажимая на иконку закладки
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h5" fontWeight={700} sx={{ mb: 3 }}>
        Мой вишлист ({watchlist.length})
      </Typography>
      <Grid container spacing={2}>
        {watchlist.map((movie) => (
          <Grid key={movie.id} size={{ xs: 6, sm: 4, md: 3 }}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default WatchlistPage;
