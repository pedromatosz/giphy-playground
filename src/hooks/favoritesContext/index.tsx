import React, { createContext, useContext, useState } from 'react'
import { Favorites, Gif, IFavoritesContext, IFavoritesProvider } from './types'

const FavoritesContext = createContext<IFavoritesContext>({} as IFavoritesContext)

export const FavoritesProvider: React.FC<IFavoritesProvider> = ({ children }) => {
  const FAVORITES_STORAGE_KEY = 'favorites'
  const [favorites, setFavorites] = useState<Favorites>(() => {
    const persistedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY)

    if (persistedFavorites) {
      return JSON.parse(persistedFavorites)
    }

    return {}
  })

  const addFavorite = (gif: Gif): void => {
    const updatedFavorites = { ...favorites, [gif.id]: gif }
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(updatedFavorites))
    setFavorites({ ...favorites, ...updatedFavorites })
  }

  const removeFavorite = (id: string): void => {
    const favoritesCopy = favorites
    delete favoritesCopy[id]
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favoritesCopy))
    setFavorites({ ...favorites, ...favoritesCopy })
  }

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>{children}</FavoritesContext.Provider>
  )
}

export const useFavorites = () => {
  const context = useContext(FavoritesContext)

  if (!context) {
    throw new Error('useFavorites must be used inside its provider')
  }

  return context
}
