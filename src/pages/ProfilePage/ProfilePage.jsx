import { Container, Typography, Box, TextField, Button, Avatar, Paper, Alert } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import SaveIcon from '@mui/icons-material/Save';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { updateProfile } from '../../store/profileSlice';

function ProfilePage() {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);
  const [saved, setSaved] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: profile });

  const onSubmit = (data) => {
    dispatch(updateProfile(data));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 4, mt: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
          <Avatar sx={{ width: 80, height: 80, mb: 2, bgcolor: 'primary.main' }}>
            {profile.name ? (
              <Typography variant="h4">{profile.name[0].toUpperCase()}</Typography>
            ) : (
              <PersonIcon sx={{ fontSize: 48 }} />
            )}
          </Avatar>
          <Typography variant="h5" fontWeight={700}>
            Профиль
          </Typography>
        </Box>

        {saved && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Профиль сохранён!
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            label="Имя"
            {...register('name', { required: 'Введите имя' })}
            error={!!errors.name}
            helperText={errors.name?.message}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            multiline
            rows={4}
            label="О себе"
            {...register('bio', {
              maxLength: { value: 200, message: 'Не более 200 символов' },
            })}
            error={!!errors.bio}
            helperText={errors.bio?.message}
            sx={{ mb: 3 }}
          />
          <Button type="submit" variant="contained" startIcon={<SaveIcon />} fullWidth>
            Сохранить
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default ProfilePage;
