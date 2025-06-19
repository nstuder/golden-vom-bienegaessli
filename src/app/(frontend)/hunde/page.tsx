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
      teaserImage: true,
      meta: true,
    },
  })

  return (
    <div className="pt-10 pb-24">
      <div className="container mb-10">
        <h1 className={'text-5xl text-center'}>Hunde</h1>
      </div>

      <div className="container mb-8 grid sm:grid-cols-2 gap-5 align-middle">
        {dogs &&
          dogs.docs.length > 0 &&
          dogs.docs.map((dog) => (
            <Link href={`/hunde/${dog.slug}`} key={dog.id} className={'block'}>
              <Media
                imgClassName={cn('border border-border rounded-[0.4rem] w-full hover:shadow-xl')}
                resource={dog.teaserImage}
              />
              <div className="flex items-center">
                <h2 className={'my-3 mx-auto text-4xl'}>{dog.title}</h2>
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
