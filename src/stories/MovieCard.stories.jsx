import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { Box } from '@mui/material';
import MovieCard from '../components/MovieCard/MovieCard';
import { store } from '../store';

const mockMovie = {
  id: 550,
  title: 'Fight Club',
  poster_path: '/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg',
  vote_average: 8.4,
};

export default {
  title: 'UI/MovieCard',
  component: MovieCard,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <MemoryRouter>
          <Box sx={{ width: 200 }}>
            <Story />
          </Box>
        </MemoryRouter>
      </Provider>
    ),
  ],
};

export const Default = {
  args: { movie: mockMovie },
};

export const HighRating = {
  args: {
    movie: { ...mockMovie, id: 278, vote_average: 9.3, title: 'The Shawshank Redemption' },
  },
};

export const LowRating = {
  args: {
    movie: { ...mockMovie, id: 999, vote_average: 3.5, title: 'Bad Movie' },
  },
};

export const NoPoster = {
  args: {
    movie: { ...mockMovie, id: 998, poster_path: null, title: 'No Poster Movie' },
  },
};
