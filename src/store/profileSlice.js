import { createSlice } from '@reduxjs/toolkit';

const loadFromStorage = () => {
  try {
    const data = localStorage.getItem('profile');
    return data ? JSON.parse(data) : { name: '', bio: '' };
  } catch {
    return { name: '', bio: '' };
  }
};

const profileSlice = createSlice({
  name: 'profile',
  initialState: loadFromStorage(),
  reducers: {
    updateProfile: (_, action) => {
      const next = action.payload;
      localStorage.setItem('profile', JSON.stringify(next));
      return next;
    },
  },
});

export const { updateProfile } = profileSlice.actions;
export default profileSlice.reducer;
