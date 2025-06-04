'use client'

import React, { useEffect, useState } from 'react'
import { cn } from '@/utilities/ui'
import { Media } from '@/components/Media'

import type { CarouselBlock as CarouselBlockProps } from '@/payload-types'

type Props = CarouselBlockProps & {
  className?: string
  disableInnerContainer?: boolean
}

export const CarouselBlock: React.FC<Props> = (props) => {
  const { className, items, disableInnerContainer, autoSlide = true, slideTime = 5 } = props
  const [currentIndex, setCurrentIndex] = useState(0)

  // Auto-advance the carousel based on configuration
  useEffect(() => {
    if (!items || items.length <= 1 || !autoSlide) return

    const interval = setInterval(
      () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length)
      },
      (slideTime ?? 5) * 1000,
    ) // Convert seconds to milliseconds

    return () => clearInterval(interval)
  }, [items, autoSlide, slideTime])

  if (!items || items.length === 0) {
    return null
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length)
  }

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length)
  }

  return (
    <div className={cn('relative', className)}>
      <div className={cn('mx-auto', { 'px-0': disableInnerContainer })}>
        <div className="relative overflow-hidden rounded-lg">
          {/* Carousel items */}
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {items.map((item, index) => (
              <div key={index} className="w-full flex-shrink-0">
                {item.media && typeof item.media === 'object' && (
                  <div className="relative aspect-video w-full">
                    <Media imgClassName="object-cover rounded-lg" resource={item.media} fill />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Navigation arrows */}
          {items.length > 1 && (
            <>
              <button
                onClick={goToPrevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-gray-800 shadow-md hover:bg-white"
                aria-label="Previous slide"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={goToNextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-gray-800 shadow-md hover:bg-white"
                aria-label="Next slide"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </>
          )}
        </div>

        {/* Indicators */}
        {items.length > 1 && (
          <div className="relative -mt-6 flex justify-center">
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={cn(
                  'mx-1 h-3 w-3 rounded-full',
                  index === currentIndex ? 'bg-primary' : 'bg-gray-300',
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
