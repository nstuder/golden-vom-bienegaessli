'use client'

import React, { useEffect, useRef, useState } from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []
  const [openDropdown, setOpenDropdown] = useState<number | null>(null)
  const dropdownRefs = useRef<(HTMLDivElement | null)[]>([])
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const drawerRef = useRef<HTMLDivElement | null>(null)
  const burgerButtonRef = useRef<HTMLButtonElement | null>(null)

  const toggleDropdown = (index: number) => {
    if (openDropdown === index) {
      setOpenDropdown(null)
    } else {
      setOpenDropdown(index)
    }
  }

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen)
  }

  // Close dropdown when clicking outside (only for desktop)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openDropdown !== null) {
        const dropdownRef = dropdownRefs.current[openDropdown]
        // Check if the click is inside the drawer
        const isClickInsideDrawer =
          drawerRef.current && drawerRef.current.contains(event.target as Node)

        // Only close dropdown if it's not inside the drawer and not inside the dropdown itself
        if (dropdownRef && !dropdownRef.contains(event.target as Node) && !isClickInsideDrawer) {
          setOpenDropdown(null)
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [openDropdown])

  // Close dropdown when pressing escape key
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (openDropdown !== null) {
          setOpenDropdown(null)
        }
        if (isDrawerOpen) {
          setIsDrawerOpen(false)
        }
      }
    }

    document.addEventListener('keydown', handleEscapeKey)
    return () => {
      document.removeEventListener('keydown', handleEscapeKey)
    }
  }, [openDropdown, isDrawerOpen])

  // Close drawer when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Don't close if clicking on the drawer or the burger button
      const isClickInsideDrawer =
        drawerRef.current && drawerRef.current.contains(event.target as Node)
      const isClickOnBurgerButton =
        burgerButtonRef.current && burgerButtonRef.current.contains(event.target as Node)

      if (isDrawerOpen && !isClickInsideDrawer && !isClickOnBurgerButton) {
        setIsDrawerOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isDrawerOpen])

  // Prevent body scrolling when drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      // Add overflow: hidden to body when drawer is open
      document.body.style.overflow = 'hidden'
    } else {
      // Remove overflow: hidden from body when drawer is closed
      document.body.style.overflow = ''
    }

    // Cleanup function to ensure body scrolling is restored when component unmounts
    return () => {
      document.body.style.overflow = ''
    }
  }, [isDrawerOpen])

  return (
    <>
      {/* Burger menu - visible only on mobile */}
      <button
        ref={burgerButtonRef}
        className="md:hidden text-black focus:outline-none"
        onClick={toggleDrawer}
        aria-label="Toggle menu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {isDrawerOpen ? (
            // X icon when drawer is open
            <>
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </>
          ) : (
            // Burger icon when drawer is closed
            <>
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </>
          )}
        </svg>
      </button>

      {/* Mobile drawer - always rendered but translated out of view when closed */}
      <div
        ref={drawerRef}
        className={`md:hidden mt-14 fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="p-4 flex flex-col gap-2">
          {navItems.map((item, i) => {
            // Handle single link
            if (item.type === 'link' && item.link?.link) {
              return (
                <div key={i} className="py-1">
                  <CMSLink
                    {...item.link.link}
                    appearance="link"
                    className={'text-black block w-full'}
                    onClick={() => setIsDrawerOpen(false)}
                  />
                </div>
              )
            }

            // Handle dropdown menu
            if (item.type === 'dropdown' && item.dropdown) {
              const { label, links } = item.dropdown
              const isOpen = openDropdown === i

              return (
                <div key={i} className="py-1" ref={(el) => (dropdownRefs.current[i] = el)}>
                  <button
                    onClick={() => toggleDropdown(i)}
                    className="flex items-center justify-between w-full text-black font-medium focus:outline-none"
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                  >
                    {label}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
                      aria-hidden="true"
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </button>

                  {isOpen && links && links.length > 0 && (
                    <div className="pl-4 mt-1 border-l border-gray-200">
                      {links.map((linkItem, j) => (
                        <div key={j} className="py-1">
                          <CMSLink
                            {...linkItem.link}
                            appearance="link"
                            className={'text-black block w-full'}
                            onNavigate={() => setIsDrawerOpen(false)}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )
            }

            // Fallback for old structure
            if (!item.type && item.link) {
              return (
                <div key={i} className="py-1">
                  <CMSLink
                    {...item.link}
                    appearance="link"
                    className={'text-black block w-full'}
                    onClick={() => setIsDrawerOpen(false)}
                  />
                </div>
              )
            }

            return null
          })}
        </div>
      </div>

      {/* Desktop navigation - hidden on mobile */}
      <nav className="hidden md:flex gap-4 items-center container">
        {navItems.map((item, i) => {
          // Handle single link
          if (item.type === 'link' && item.link?.link) {
            return (
              <CMSLink key={i} {...item.link.link} appearance="link" className={'text-black'} />
            )
          }

          // Handle dropdown menu
          if (item.type === 'dropdown' && item.dropdown) {
            const { label, links } = item.dropdown
            const isOpen = openDropdown === i

            return (
              <div key={i} className="relative" ref={(el) => (dropdownRefs.current[i] = el)}>
                <button
                  onClick={() => toggleDropdown(i)}
                  className="flex items-center gap-1 text-black font-medium hover:underline underline-offset-4 focus:outline-none"
                  aria-expanded={isOpen}
                  aria-haspopup="true"
                >
                  {label}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    aria-hidden="true"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>

                {isOpen && links && links.length > 0 && (
                  <div
                    className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby={`dropdown-button-${i}`}
                  >
                    <div className="py-1">
                      {links.map((linkItem, j) => (
                        <div
                          key={j}
                          className="block text-black px-4 py-2 hover:bg-gray-100"
                          role="menuitem"
                        >
                          <CMSLink
                            {...linkItem.link}
                            appearance="link"
                            className={'text-black w-full text-left'}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )
          }

          // Fallback for old structure
          if (!item.type && item.link) {
            return <CMSLink key={i} {...item.link} appearance="link" className={'text-black'} />
          }

          return null
        })}
      </nav>
    </>
  )
}
