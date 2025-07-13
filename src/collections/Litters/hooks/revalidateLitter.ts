import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Litter } from '../../../payload-types'

export const revalidateLitter: CollectionAfterChangeHook<Litter> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = `/wuerfe/${doc.slug}`

      payload.logger.info(`Revalidating litter at path: ${path}`)

      revalidatePath(path)
    }

    // If the post was previously published, we need to revalidate the old path
    if (previousDoc._status === 'published' && doc._status !== 'published') {
      const oldPath = `/wuerfe/${previousDoc.slug}`

      payload.logger.info(`Revalidating old litter at path: ${oldPath}`)

      revalidatePath(oldPath)
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Litter> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    const path = `/wuerfe/${doc?.slug}`

    revalidatePath(path)
    revalidateTag('wuerfe-sitemap')
  }

  return doc
}
