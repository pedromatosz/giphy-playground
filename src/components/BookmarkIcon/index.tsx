import React from 'react'
import { IBookmarkIcon } from './types'

export const BookmarkIcon: React.FC<IBookmarkIcon> = ({ active, className, onClick }) => {
  return (
    <svg
      className={className}
      onClick={onClick}
      fill={active ? '#DB2A80' : 'white'}
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
    </svg>
  )
}
