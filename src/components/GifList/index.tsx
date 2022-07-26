import React from 'react'
import { IGifList } from './types'
import { GifCard } from '../GifCard'
import S from './style.module.scss'

export const GifList: React.FC<IGifList> = ({ gifs, searchType }) => {
  return (
    <div>
      <div className={S.search_type}>
        <h1 className={S.search_type__text}> {searchType} </h1>
      </div>
      <div className={S.gif_list}>
        {gifs.map((gif) => (
          <GifCard key={gif.id} gif={gif} />
        ))}
      </div>
    </div>
  )
}
