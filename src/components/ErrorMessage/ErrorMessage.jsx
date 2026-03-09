import { Alert, Container, Box } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

function ErrorMessage({ message }) {
  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Alert severity="error" icon={<ErrorOutlineIcon />}>
          {message}
        </Alert>
      </Box>
    </Container>
  );
}

export default ErrorMessage;
