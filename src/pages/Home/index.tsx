import React from 'react'
import { IHomePageProps } from './types'
import S from './style.module.scss'
import { Header } from '../../components/Header'

export const Home: React.FC<IHomePageProps> = () => {
  return (
    <div className={S.home}>
      <Header />
      <div>
        <div className={S.search}>
          <svg className={S.search_icon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
            s
          </svg>
          <input className={S.search_field} type="text" placeholder="Search gifs" />
        </div>
      </div>
    </div>
  )
}
