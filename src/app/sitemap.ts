import type { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayload({ config })
  const SITE_URL =
    process.env.NEXT_PUBLIC_SERVER_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    'https://example.com'

  const pages = await payload.find({
    collection: 'pages',
    overrideAccess: false,
    draft: false,
    depth: 0,
    limit: 1000,
    pagination: false,
    where: {
      _status: {
        equals: 'published',
      },
    },
    select: {
      slug: true,
      updatedAt: true,
    },
  })

  const dogs = await payload.find({
    collection: 'dogs',
    overrideAccess: false,
    draft: false,
    depth: 0,
    limit: 1000,
    pagination: false,
    where: {
      _status: {
        equals: 'published',
      },
    },
    select: {
      slug: true,
      updatedAt: true,
    },
  })

  const litters = await payload.find({
    collection: 'litters',
    overrideAccess: false,
    draft: false,
    depth: 0,
    limit: 1000,
    pagination: false,
    where: {
      _status: {
        equals: 'published',
      },
    },
    select: {
      slug: true,
      updatedAt: true,
    },
  })

  return [
    ...pages.docs.map(
      (page) =>
        ({
          url: page.slug === 'home' ? SITE_URL : `${SITE_URL}/${page.slug}`,
          lastModified: page.updatedAt ? new Date(page.updatedAt) : null,
          changeFrequency: 'yearly',
          priority: 1,
        }) as MetadataRoute.Sitemap[0],
    ),
    ...dogs.docs.map(
      (page) =>
        ({
          url: `${SITE_URL}/hunde/${page.slug}`,
          lastModified: page.updatedAt ? new Date(page.updatedAt) : null,
          changeFrequency: 'yearly',
          priority: 1,
        }) as MetadataRoute.Sitemap[0],
    ),
    ...litters.docs.map(
      (page) =>
        ({
          url: `${SITE_URL}/wuerfe/${page.slug}`,
          lastModified: page.updatedAt ? new Date(page.updatedAt) : null,
          changeFrequency: 'yearly',
          priority: 1,
        }) as MetadataRoute.Sitemap[0],
    ),
    {
      url: `${SITE_URL}/aktuelles`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/hunde`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    }
  ]
}
