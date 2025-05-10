'use client'

import { useState, useEffect } from 'react'

// Mimicking OMDB API response
const mockData = [
  {
    Title: 'Inception',
    Year: '2010',
    imdbID: 'tt1375666',
    Type: 'movie',
    Poster: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
  },
  {
    Title: 'The Matrix',
    Year: '1999',
    imdbID: 'tt0133093',
    Type: 'movie',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
  },
  {
    Title: 'Breaking Bad',
    Year: '2008–2013',
    imdbID: 'tt0903747',
    Type: 'series',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BYmQ4YWMxYjUtNjZmYi00MDQ1LWFjMjMtNjA5ZDdiYjdiODU5XkEyXkFqcGdeQXVyMTMzNDExODE5._V1_SX300.jpg',
  },
  {
    Title: 'The Godfather',
    Year: '1972',
    imdbID: 'tt0068646',
    Type: 'movie',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNjk1NjU0ODA@._V1_SX300.jpg',
  },
]
