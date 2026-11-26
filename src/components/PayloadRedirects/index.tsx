import type React from 'react'
import type { Dog, Page } from '@/payload-types'

import { getDocumentById } from '@/utilities/getDocument'
import { getDocumentPath } from '@/utilities/getDocumentPath'
import { getCachedRedirects } from '@/utilities/getRedirects'
import { notFound, redirect } from 'next/navigation'

interface Props {
  disableNotFound?: boolean
  url: string
}

/* This component helps us with SSR based dynamic redirects */
export const PayloadRedirects: React.FC<Props> = async ({ disableNotFound, url }) => {
  const redirects = await getCachedRedirects()()

  const redirectItem = redirects.find((redirect) => redirect.from === url)

  if (redirectItem) {
    if (redirectItem.to?.url) {
      redirect(redirectItem.to.url)
    }

    const reference = redirectItem.to?.reference
    let redirectUrl: string | null = null

    if (reference) {
      const document =
        typeof reference.value === 'string'
          ? ((await getDocumentById(reference.relationTo, reference.value)) as Page | Dog | null)
          : reference.value

      redirectUrl = getDocumentPath(reference.relationTo, document?.slug)
    }

    if (redirectUrl) redirect(redirectUrl)
  }

  if (disableNotFound) return null

  notFound()
}
