import React, { useCallback, useState } from 'react'
import { IGifCard } from './types'
import S from './style.module.scss'
import { useFavorites } from '../../hooks/favoritesContext'
import { BookmarkIcon } from '../BookmarkIcon'

export const GifCard: React.FC<IGifCard> = ({ gif }) => {
  const { favorites, addFavorite, removeFavorite } = useFavorites()
  const [isFavorite, setIsFavorite] = useState<boolean>(!!favorites[gif.id])

  const handleClick = useCallback(() => {
    if (isFavorite) {
      removeFavorite(gif.id)
      setIsFavorite(!isFavorite)
      return
    }

    addFavorite(gif)
    setIsFavorite(!isFavorite)
  }, [addFavorite, gif, isFavorite, removeFavorite])

  return (
    <div className={S.gif_card}>
      <img className={S.gif_card__image} src={gif.url} alt={gif.title} />
      <div className={S.gif_card__controls}>
        <div className={S.gif_card__infos}>
          <h3 className={S.infos__title}>{gif.title}</h3>
          <p className={S.infos__author}> {gif.author}</p>
        </div>
        <div className={S.infos__bookmark}>
          <BookmarkIcon className={S.infos__bookmark_icon} active={isFavorite} onClick={handleClick} />
        </div>
      </div>
    </div>
  )
}
