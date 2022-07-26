import React from 'react'
import S from './style.module.scss'
import { Link } from 'react-router-dom'

export const HomeHeader: React.FC = () => {
  return (
    <nav className={S.home__header}>
      <div className={S.header__logo}>
        <p className={S.first_word}> GIPHY </p> <p className={S.second_word}> PLAYGROUND</p>
      </div>

      <div className={S.header__favorite}>
        <svg className={S.favorite_icon} fill="#DB2A80" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>

        <Link className={S.favorite_link} to="/favorites">
          My Favorites
        </Link>
      </div>
    </nav>
  )
}
