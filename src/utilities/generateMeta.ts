import type { Metadata } from 'next'

import type { Config, Dog, Litter, Media, Page } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL()

  let url = serverUrl + '/default_image.webp'

  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image.sizes?.og?.url

    url = ogUrl ? serverUrl + ogUrl : serverUrl + image.url
  }

  return url
}

export const generateMeta = async (args: {
  doc: Partial<Page> | Partial<Dog> | Partial<Litter> | null
}): Promise<Metadata> => {
  const { doc } = args

  const ogImage = getImageURL(doc?.meta?.image || (doc as Partial<Dog>)?.teaserImage)

  const title = doc?.meta?.title
    ? doc?.meta?.title + ' | Golden Retriever vom Bienegässli'
    : doc?.title + ' | Golden Retriever vom Bienegässli'

  return {
    description: doc?.meta?.description,
    openGraph: mergeOpenGraph({
      description: doc?.meta?.description || '',
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title,
      url: Array.isArray(doc?.slug) ? doc?.slug.join('/') : '/',
    }),
    title,
  }
}
