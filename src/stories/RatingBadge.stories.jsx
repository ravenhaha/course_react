import { Box } from '@mui/material';
import RatingBadge from '../components/RatingBadge/RatingBadge';

export default {
  title: 'UI/RatingBadge',
  component: RatingBadge,
};

export const High = { args: { rating: 8.5 } };
export const Medium = { args: { rating: 6.2 } };
export const Low = { args: { rating: 3.8 } };

export const AllVariants = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
      <RatingBadge rating={8.5} />
      <RatingBadge rating={6.2} />
      <RatingBadge rating={3.8} />
      <RatingBadge rating={8.5} size="medium" />
    </Box>
  ),
};
