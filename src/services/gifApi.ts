import { Gif } from '../hooks/favoritesContext/types'

const GIPHY_API_KEY = process.env.REACT_APP_GIPHY_API_KEY
const GIPHY_BASE_URL = 'https://api.giphy.com/'
const GIFS_PATH = 'v1/gifs'
export const DEFAULT_LIMIT = 12

const getGiphyUrl = (queryType: string) => `${GIPHY_BASE_URL}${GIFS_PATH}/${queryType}?api_key=${GIPHY_API_KEY}`

const mapRawDataToGif = (data: any): Gif => {
  return {
    id: data.id,
    title: data.title,
    author: data.username || 'Unknown',
    url: data.images.original.url
  }
}

const sanitizeGifResponse = async (response: any): Promise<Gif[]> => {
  const { data } = await response.json()
  return data.map(mapRawDataToGif)
}

export const GifApi = {
  trending: async (offset: number = 0, limit: number = DEFAULT_LIMIT): Promise<Gif[]> => {
    const response = await fetch(getGiphyUrl('trending') + `&limit=${limit}&offset=${offset}&rating=g`)
    return sanitizeGifResponse(response)
  },
  search: async (query: string, offset: number = 0, limit: number = DEFAULT_LIMIT): Promise<Gif[]> => {
    const response = await fetch(getGiphyUrl('search') + `&limit=${limit}&offset=${offset}&q=${query}`)
    return sanitizeGifResponse(response)
  },
  random: async (query: string): Promise<Gif[]> => {
    const response = await fetch(getGiphyUrl('random') + `&tag=${query}`)
    const { data } = await response.json()
    return [mapRawDataToGif(data)]
  },
  translate: async (query: string): Promise<Gif[]> => {
    const response = await fetch(getGiphyUrl('translate') + `&s=${query}`)
    const { data } = await response.json()
    return [mapRawDataToGif(data)]
  }
}
