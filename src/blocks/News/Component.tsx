import React from 'react'
import RichText from '@/components/RichText'

import type { NewsBlock as NewsBlockProps } from '@/payload-types'

export const NewsBlock: React.FC<NewsBlockProps> = (props) => {
  const { newsItems } = props

  return (
    <div className="container my-16">
      <div className="space-y-8">
        {newsItems &&
          newsItems.length > 0 &&
          newsItems.map((item, index) => {
            const { date, title, content } = item

            return (
              <div key={index} className="px-2 md:px-4">
                <div className={'flex justify-between mb-2'}>
                  <h3 className="text-xl font-semibold">{title}</h3>
                  <div className="text-sm text-muted-foreground">
                    {date && new Date(date).toLocaleDateString()}
                  </div>
                </div>
                {content && <RichText enableGutter={false} data={content} />}
              </div>
            )
          })}
      </div>
    </div>
  )
}
