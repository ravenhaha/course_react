# CineTrack

Приложение для поиска и отслеживания фильмов на основе Kinopoisk Unofficial API.

## Стек

- **React 19** — компоненты, состояние, жизненный цикл, события
- **React Router v7** — маршрутизация, параметры роута, активные ссылки
- **Redux Toolkit** — глобальный стейт, сохранение в localStorage
- **Material UI v7** — UI компоненты и иконки
- **Axios** — запросы к API
- **React Hook Form** — обработка форм
- **Storybook 10** — UI-kit
- **ESLint + Prettier** — линтинг и форматирование

## Страницы

| Путь | Страница |
|---|---|
| `/` | Главная — тренды и популярные фильмы |
| `/search` | Поиск по названию, жанру и году |
| `/movie/:id` | Детальная страница фильма |
| `/watchlist` | Личный вишлист |
| `/profile` | Профиль пользователя |

## Запуск

```bash
npm install
```

Создай файл `.env` в корне проекта:

```
VITE_KINOPOISK_API_KEY=твой_ключ
```

Получить ключ можно бесплатно на [kinopoiskapiunofficial.tech](https://kinopoiskapiunofficial.tech).

```bash
npm run dev
```

## Команды

```bash
npm run dev            # запуск dev сервера
npm run build          # сборка
npm run lint           # проверка ESLint
npm run format         # форматирование Prettier
npm run storybook      # запуск Storybook на порту 6006
```


