import { useState } from 'react';
import { Box } from '@mui/material';
import SearchBar from '../components/SearchBar/SearchBar';

export default {
  title: 'UI/SearchBar',
  component: SearchBar,
  decorators: [
    (Story) => (
      <Box sx={{ p: 2, maxWidth: 500 }}>
        <Story />
      </Box>
    ),
  ],
};

export const Empty = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <SearchBar
        value={value}
        onChange={setValue}
        onSearch={() => console.log('Search:', value)}
      />
    );
  },
};

export const WithValue = {
  render: () => {
    const [value, setValue] = useState('Batman');
    return <SearchBar value={value} onChange={setValue} />;
  },
};

export const CustomPlaceholder = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <SearchBar value={value} onChange={setValue} placeholder="Введите название фильма..." />
    );
  },
};
