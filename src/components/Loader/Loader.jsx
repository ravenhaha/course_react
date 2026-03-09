import { Box, Skeleton } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Container } from '@mui/material';

function Loader({ count = 8 }) {
  return (
    <Container>
      <Skeleton variant="text" width={200} height={40} sx={{ mb: 2 }} />
      <Grid container spacing={2}>
        {Array.from({ length: count }).map((_, i) => (
          <Grid key={i} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Skeleton variant="rectangular" sx={{ aspectRatio: '2/3', borderRadius: 1 }} />
            <Box sx={{ pt: 0.5 }}>
              <Skeleton />
              <Skeleton width="60%" />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Loader;
