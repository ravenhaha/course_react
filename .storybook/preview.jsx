import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from '../src/theme';

export default {
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Story />
      </ThemeProvider>
    ),
  ],
};
