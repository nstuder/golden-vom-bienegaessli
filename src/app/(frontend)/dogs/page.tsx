import type { Metadata } from 'next/types'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import Link from 'next/link'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const dogs = await payload.find({
    collection: 'dogs',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      heroImage: true,
      categories: true,
      meta: true,
    },
  })

  return (
    <div className="pt-24 pb-24">
      <div className="container mb-16">
        <div className="prose max-w-none">
          <h1>Hunde</h1>
        </div>
      </div>

      <div className="container mb-8">
        {dogs &&
          dogs.docs.length > 0 &&
          dogs.docs.map((dog) => (
            <Link href={`/dogs/${dog.slug}`} key={dog.id}>
              <Media
                imgClassName={cn('border border-border rounded-[0.8rem] w-full')}
                resource={dog.heroImage}
              />
              <div className="flex items-center">
                <h1 className={'my-3 mx-auto text-4xl'}>{dog.title}</h1>
              </div>
            </Link>
          ))}
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Payload Website Template Posts`,
  }
}
