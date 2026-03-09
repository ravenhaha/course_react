import { AppBar, Toolbar, Typography, Box, IconButton, Badge } from '@mui/material';
import { NavLink } from 'react-router-dom';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import MovieIcon from '@mui/icons-material/Movie';
import { useSelector } from 'react-redux';
import styles from './Header.module.css';

function Header() {
  const watchlistCount = useSelector((state) => state.watchlist.length);

  const navLinks = [
    { name: 'Главная', path: '/' },
    { name: 'Поиск', path: '/search' },
    { name: 'Профиль', path: '/profile' },
  ];

  return (
    <AppBar position="sticky" className={styles.appBar}>
      <Toolbar>
        <MovieIcon sx={{ mr: 1 }} />
        <Typography variant="h6" sx={{ mr: 4, fontWeight: 700 }}>
          CineTrack
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexGrow: 1 }}>
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === '/'}
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
            >
              {link.name}
            </NavLink>
          ))}
        </Box>
        <IconButton component={NavLink} to="/watchlist" color="inherit">
          <Badge badgeContent={watchlistCount} color="error">
            <BookmarkIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
