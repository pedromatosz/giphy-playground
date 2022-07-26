import React from 'react'
import { IFavoritesPageProps } from './types'
import { GifList } from '../../components/GifList'
import { useFavorites } from '../../hooks/favoritesContext'
import S from './style.module.scss'
import { Link } from 'react-router-dom'

export const Favorites: React.FC<IFavoritesPageProps> = () => {
  const { favorites } = useFavorites()
  const gifs = Object.values(favorites)

  return (
    <div>
      <nav className={S.favorite__header}>
        <Link to="/" className={S.favorite__logo_link}>
          <svg className={S.logo_link__icon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          <div className={S.header__logo}>
            <p className={S.first_word}> GIPHY </p> <p className={S.second_word}> PLAYGROUND</p>
          </div>
        </Link>
      </nav>
      <GifList gifs={gifs} searchType={'Favorites'} />
    </div>
  )
}
