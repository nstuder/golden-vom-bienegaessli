import React from 'react'

export const PageRange: React.FC<{
  className?: string
  currentPage?: number
  limit?: number
  totalDocs?: number
}> = (props) => {
  const { className, currentPage, limit, totalDocs } = props

  let indexStart = (currentPage ? currentPage - 1 : 1) * (limit || 1) + 1
  if (totalDocs && indexStart > totalDocs) indexStart = 0

  let indexEnd = (currentPage || 1) * (limit || 1)
  if (totalDocs && indexEnd > totalDocs) indexEnd = totalDocs

  const plural = 'Seiten'
  const singular = 'Seite'

  return (
    <div className={[className, 'font-semibold'].filter(Boolean).join(' ')}>
      {(typeof totalDocs === 'undefined' || totalDocs === 0) && 'Search produced no results.'}
      {typeof totalDocs !== 'undefined' &&
        totalDocs > 0 &&
        `Seite ${indexStart} von ${totalDocs} ${totalDocs > 1 ? plural : singular}`}
    </div>
  )
}
