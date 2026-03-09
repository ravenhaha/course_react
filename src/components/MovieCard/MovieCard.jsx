import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Box,
} from '@mui/material';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToWatchlist, removeFromWatchlist } from '../../store/watchlistSlice';
import { getImageUrl } from '../../api/tmdb';
import RatingBadge from '../RatingBadge/RatingBadge';
import styles from './MovieCard.module.css';

function MovieCard({ movie }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const watchlist = useSelector((state) => state.watchlist);
  const isInWatchlist = watchlist.some((m) => m.id === movie.id);

  const handleWatchlist = (e) => {
    e.stopPropagation();
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

  return (
    <Card className={styles.card} onClick={() => navigate(`/movie/${movie.id}`)}>
      <CardMedia
        component="img"
        image={getImageUrl(movie.poster_path)}
        alt={movie.title}
        className={styles.poster}
      />
      <CardContent className={styles.content}>
        <Typography variant="subtitle2" noWrap title={movie.title}>
          {movie.title}
        </Typography>
        <Box sx={{ mt: 0.5 }}>
          <RatingBadge rating={movie.vote_average} />
        </Box>
      </CardContent>
      <CardActions disableSpacing className={styles.actions}>
        <IconButton
          size="small"
          onClick={handleWatchlist}
          color={isInWatchlist ? 'primary' : 'default'}
          title={isInWatchlist ? 'Удалить из вишлиста' : 'Добавить в вишлист'}
        >
          {isInWatchlist ? <BookmarkRemoveIcon /> : <BookmarkAddIcon />}
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default MovieCard;
