import { ReactNode } from 'react'

export type Gif = {
  id: string
  title: string
  author: string
  url: string
}

export type Favorites = { [key: string]: Gif }

export interface IFavoritesContext {
  favorites: Favorites
  addFavorite: (gif: Gif) => void
  removeFavorite: (id: string) => void
}

export interface IFavoritesProvider {
  children: ReactNode
}
