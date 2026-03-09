import { Chip } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

function RatingBadge({ rating, size = 'small' }) {
  const color = rating >= 7 ? 'success' : rating >= 5 ? 'warning' : 'error';

  return (
    <Chip
      icon={<StarIcon />}
      label={rating ? rating.toFixed(1) : 'N/A'}
      size={size}
      color={color}
    />
  );
}

export default RatingBadge;
