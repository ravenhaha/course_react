import { MemoryRouter } from 'react-router-dom';
import { Box } from '@mui/material';
import GenreChip from '../components/GenreChip/GenreChip';

const genres = [
  { id: 28, name: 'Боевик' },
  { id: 35, name: 'Комедия' },
  { id: 18, name: 'Драма' },
  { id: 878, name: 'Фантастика' },
  { id: 27, name: 'Ужасы' },
  { id: 10749, name: 'Мелодрама' },
];

export default {
  title: 'UI/GenreChip',
  component: GenreChip,
  decorators: [(Story) => <MemoryRouter><Story /></MemoryRouter>],
};

export const Default = {
  args: { genre: genres[0] },
};

export const AllGenres = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
      {genres.map((g) => (
        <GenreChip key={g.id} genre={g} />
      ))}
    </Box>
  ),
};
