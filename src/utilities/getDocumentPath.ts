/**
 * URL prefix of the frontend route for each collection that has its own pages
 */
const collectionPrefixes = {
  pages: '',
  dogs: '/hunde',
  litters: '/wuerfe',
} as const

/**
 * Returns the frontend path of a document, or null if the collection has no detail pages
 */
export const getDocumentPath = (
  collection: string | null | undefined,
  slug: string | null | undefined,
): string | null => {
  if (!collection || !slug || !(collection in collectionPrefixes)) return null

  return `${collectionPrefixes[collection as keyof typeof collectionPrefixes]}/${slug}`
}
