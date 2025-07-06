import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { News } from '../../../payload-types'

export const revalidatePage: CollectionAfterChangeHook<News> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      revalidatePath('/aktuelles')
      revalidateTag('pages-sitemap')
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<News> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    revalidatePath('/aktuelles')
    revalidateTag('pages-sitemap')
  }

  return doc
}
