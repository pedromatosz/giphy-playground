import React, { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { IHomePageProps, SearchTypes } from './types'
import S from './style.module.scss'
import { HomeHeader } from '../../components/HomeHeader'
import { Gif } from '../../hooks/favoritesContext/types'
import { DEFAULT_LIMIT, GifApi } from '../../services/gifApi'
import { GifList } from '../../components/GifList'

export const Home: React.FC<IHomePageProps> = () => {
  const [search, setSearch] = useState('')
  const [offset, setOffset] = useState(0)
  const [gifs, setGifs] = useState<Gif[]>([])
  const [searchType, setSearchType] = useState(SearchTypes.TRENDING)

  const fetchGifs = useCallback(
    async (type: SearchTypes) => {
      let gifs

      if (type === SearchTypes.TRENDING) {
        gifs = await GifApi.trending(offset)
        setGifs(gifs)
        return
      }

      if (type === SearchTypes.SEARCH) {
        gifs = !!search ? await GifApi.search(search, offset) : await GifApi.trending(offset)
        setGifs(gifs)
        return
      }

      gifs = await GifApi[type](search)
      setGifs(gifs)
    },
    [offset, setGifs, search]
  )

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (search) {
        fetchGifs(SearchTypes.SEARCH)
        setSearchType(SearchTypes.SEARCH)
        return
      }

      fetchGifs(SearchTypes.TRENDING)
      setSearchType(SearchTypes.TRENDING)
    }
  }

  const handleSearchButtonClick = () => {
    if (search) {
      setSearchType(SearchTypes.SEARCH)
      fetchGifs(SearchTypes.SEARCH)
      return
    }

    fetchGifs(SearchTypes.TRENDING)
    setSearchType(SearchTypes.TRENDING)
  }

  const handleRandomButtonClick = () => {
    if (search) {
      setSearchType(SearchTypes.RANDOM)
      fetchGifs(SearchTypes.RANDOM)
    }
  }

  const handleTranslateButtonClick = () => {
    if (search) {
      setSearchType(SearchTypes.TRANSLATE)
      fetchGifs(SearchTypes.TRANSLATE)
    }
  }

  const handleChangeNextPage = () => {
    setOffset(offset + DEFAULT_LIMIT)
  }

  const handleChangePreviousPage = () => {
    setOffset(offset - DEFAULT_LIMIT)
  }

  useEffect(() => {
    fetchGifs(SearchTypes.TRENDING)
  }, [])

  return (
    <div className={S.home}>
      <HomeHeader />
      <div>
        <div className={S.search}>
          <div className={S.controls}>
            <svg className={S.search_icon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
              s
            </svg>
            <input
              className={S.search_field}
              type="text"
              placeholder="Search gifs"
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              value={search}
            />
            <button className={S.search_button} onClick={handleSearchButtonClick}>
              Search
            </button>
          </div>
          <div className={S.extra_buttons}>
            <button className={S.control_button} onClick={handleRandomButtonClick}>
              Random
            </button>
            <button className={S.control_button} onClick={handleTranslateButtonClick}>
              Translate
            </button>
          </div>
        </div>
      </div>
      <GifList gifs={gifs} searchType={searchType} />
      {(searchType === SearchTypes.SEARCH || searchType === SearchTypes.TRENDING) && (
        <div className={S.pagination}>
          {offset > 0 ? (
            <button className={S.pagination__button} onClick={handleChangePreviousPage}>
              <svg
                className={S.pagination_button__icon}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          ) : (
            <div className={S.pagination__invisible_button} />
          )}
          <p className={S.pagination__current_page}>Page {offset / DEFAULT_LIMIT}</p>
          <button className={S.pagination__button} onClick={handleChangeNextPage}>
            <svg
              className={S.pagination_button__icon}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}
