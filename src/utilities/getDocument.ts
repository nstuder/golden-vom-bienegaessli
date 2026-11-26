import type { Config } from '@/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'

type Collection = keyof Config['collections']

/**
 * Not cached on purpose: the slug of a document can change at any time
 */
export async function getDocumentById(collection: Collection, id: string) {
  const payload = await getPayload({ config: configPromise })

  try {
    return await payload.findByID({ collection, id, depth: 0 })
  } catch {
    return null
  }
}
