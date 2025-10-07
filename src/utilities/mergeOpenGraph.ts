import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description: 'Golden Retriever Zucht vom Bienegässli',
  images: [
    {
      url: `${getServerSideURL()}/default_image.webp`,
    },
  ],
  siteName: 'Golden Retriever vom Bienegässli',
  title: 'Golden Retriever vom Bienegässli',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
