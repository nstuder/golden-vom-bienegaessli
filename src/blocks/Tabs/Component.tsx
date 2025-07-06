'use client'

import React, { useEffect, useState } from 'react'
import { cn } from '@/utilities/ui'
import { TabContent } from './TabContent'

import type { TabsBlock as TabsBlockProps } from '@/payload-types'

export const TabsBlock: React.FC<TabsBlockProps> = (props) => {
  const { tabs } = props
  const [activeTab, setActiveTab] = useState(0)

  // Handle hash links for direct access to tabs
  useEffect(() => {
    const hash = window.location.hash
    if (hash && tabs) {
      const tabIndex = tabs.findIndex(
        (tab) => `#${tab.name?.toLowerCase().replace(/\s+/g, '-')}` === hash,
      )
      if (tabIndex !== -1) {
        setActiveTab(tabIndex)
        // Scroll to the tabs section
        setTimeout(() => {
          const tabsElement = document.getElementById('tabs-section')
          if (tabsElement) {
            tabsElement.scrollIntoView({ behavior: 'smooth' })
          }
        }, 100)
      }
    }
  }, [tabs])

  // Update hash when tab changes
  const handleTabClick = (index: number) => {
    if (tabs && tabs[index]) {
      const tabName = tabs[index].name?.toLowerCase().replace(/\s+/g, '-')
      window.history.pushState(null, '', `#${tabName}`)
      setActiveTab(index)
    }
  }

  if (!tabs || tabs.length === 0) return null

  return (
    <div className="my-16" id="tabs-section">
      {/* Tab navigation */}
      <div className="w-full bg-primary mb-8">
        <div className="flex flex-wrap justify-center">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={cn(
                'py-3 px-6 text-black font-medium transition-colors hover:underline ',
                activeTab === index ? 'bg-primary-foreground' : 'hover:bg-primary-light',
              )}
              onClick={() => handleTabClick(index)}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div className="tab-content">
        {tabs[activeTab]?.content && <TabContent blocks={tabs[activeTab].content} />}
      </div>
    </div>
  )
}
