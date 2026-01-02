import type { Metadata } from 'next/types'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import { notFound } from 'next/navigation'
import { NewsBlock } from '@/blocks/News/Component'

import { pageSize } from '@/app/(frontend)/aktuelles/pageSize'

export const revalidate = 600

type Args = {
  params: Promise<{
    pageNumber: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { pageNumber } = await paramsPromise
  const payload = await getPayload({ config: configPromise })

  const sanitizedPageNumber = Number(pageNumber)

  if (!Number.isInteger(sanitizedPageNumber)) notFound()

  const news = await payload.find({
    collection: 'news',
    depth: 2,
    limit: pageSize,
    page: sanitizedPageNumber,
    sort: '-date',
    overrideAccess: false,
  })

  if (news.docs.length < 1) notFound()

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

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { pageNumber } = await paramsPromise
  return {
    title: `Aktuelles Seite ${pageNumber || ''} | Golden Retriever vom Bienegässli`,
  }
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const { totalDocs } = await payload.count({
    collection: 'dogs',
    overrideAccess: false,
  })

  const totalPages = Math.ceil(totalDocs / 10)

  const pages: { pageNumber: string }[] = []

  for (let i = 1; i <= totalPages; i++) {
    pages.push({ pageNumber: String(i) })
  }

  return pages
}
