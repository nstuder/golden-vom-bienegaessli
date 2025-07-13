import type { Metadata } from 'next/types'

import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import { NewsBlock } from '@/blocks/News/Component'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'news',
    depth: 2,
    limit: 12,
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
      <NewsBlock newsItems={posts.docs} />

      <div className="container mb-8">
        <PageRange
          collection="news"
          currentPage={posts.page}
          limit={12}
          totalDocs={posts.totalDocs}
        />
      </div>

      <div className="container">
        {posts.totalPages > 1 && posts.page && (
          <Pagination page={posts.page} totalPages={posts.totalPages} />
        )}
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Payload Website Template Posts`,
  }
}
