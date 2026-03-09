import { Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function GenreChip({ genre }) {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.stopPropagation();
    navigate(`/search?genre=${genre.id}`);
  };

  return (
    <Chip
      label={genre.name}
      size="small"
      variant="outlined"
      onClick={handleClick}
      clickable
    />
  );
}

export default GenreChip;
