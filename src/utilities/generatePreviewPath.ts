import { CollectionSlug, PayloadRequest } from 'payload'

import { getDocumentPath } from '@/utilities/getDocumentPath'

type Props = {
  collection: CollectionSlug
  slug: string
  req: PayloadRequest
}

export const generatePreviewPath = ({ collection, slug }: Props) => {
  // News have no detail page, they are shown on the news overview
  const path = collection === 'news' ? '/aktuelles' : getDocumentPath(collection, slug) || '/'

  const encodedParams = new URLSearchParams({
    slug,
    collection,
    path,
    previewSecret: process.env.PREVIEW_SECRET || '',
  })

  return `/next/preview?${encodedParams.toString()}`
}
