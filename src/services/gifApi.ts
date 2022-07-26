import { Gif } from '../hooks/favoritesContext/types'

const GIPHY_API_KEY = process.env.REACT_APP_GIPHY_API_KEY
const GIPHY_BASE_URL = 'https://api.giphy.com/'
const GIFS_PATH = 'v1/gifs'
const DEFAULT_LIMIT = 10

const getGiphyUrl = (queryType: string, limit: number, offset: number) =>
  `${GIPHY_BASE_URL}${GIFS_PATH}/${queryType}?api_key=${GIPHY_API_KEY}&limit=${limit}&offset=${offset}`

const sanitizeGifResponse = async (response: any): Promise<Gif[]> => {
  const json = await response.json()
  return json.map((gif: any) => ({
    id: gif.id,
    title: gif.title,
    author: gif.username,
    url: gif.url,
    favorite: false
  }))
}

export const GifApi = {
  trending: async (limit: number = DEFAULT_LIMIT, offset: number = 0): Promise<Gif[]> => {
    const response = await fetch(getGiphyUrl('trending', limit, offset))
    return sanitizeGifResponse(response)
  },
  search: async (query: string, limit: number = DEFAULT_LIMIT, offset: number = 0): Promise<Gif[]> => {
    const response = await fetch(getGiphyUrl('search', limit, offset) + `&q=${query}`)
    return sanitizeGifResponse(response)
  },
  random: async (query: string, limit: number = DEFAULT_LIMIT, offset: number = 0): Promise<Gif[]> => {
    const response = await fetch(getGiphyUrl('random', limit, offset) + `&tag=${query}`)
    return sanitizeGifResponse(response)
  },
  translate: async (query: string, limit: number = DEFAULT_LIMIT, offset: number = 0): Promise<Gif[]> => {
    const response = await fetch(getGiphyUrl('translate', limit, offset) + `&s=${query}`)
    return sanitizeGifResponse(response)
  }
}
