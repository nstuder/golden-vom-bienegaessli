import type { Metadata } from 'next/types'
import { Pagination } from '@/components/Pagination'
import { NewsBlock } from '@/blocks/News/Component'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import { pageSize } from '@/app/(frontend)/aktuelles/pageSize'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const news = await payload.find({
    collection: 'news',
    depth: 2,
    limit: pageSize,
    sort: '-date',
    overrideAccess: false,
  })

  return (
    <div className="pt-12 pb-12">
      <div className="container mb-16">
        <div className="prose max-w-none">
          <h1 className={'text-center'}>Aktuelles</h1>
        </div>
      </div>

      {/* Render the news posts using the NewsBlock component */}
      <NewsBlock newsItems={news.docs} />

      <div className="container">
        {news.totalPages > 1 && news.page && (
          <Pagination basePath="/aktuelles" page={news.page} totalPages={news.totalPages} />
        )}
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Aktuelles | Golden Retriever vom Bienegässli`,
  }
}
