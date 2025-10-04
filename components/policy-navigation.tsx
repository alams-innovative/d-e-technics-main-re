"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

interface PolicySection {
  id: string
  title: string
}

interface PolicyNavigationProps {
  sections: PolicySection[]
  className?: string
}

export default function PolicyNavigation({ 
  sections, 
  className = "" 
}: PolicyNavigationProps) {
  const [activeSection, setActiveSection] = useState<string>("")

  useEffect(() => {
    let ticking = false

    const updateActiveSection = () => {
      let currentSection = ""

      sections.forEach((section) => {
        const element = document.getElementById(section.id)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 200) {
            currentSection = section.id
          }
        }
      })

      setActiveSection(currentSection)
      ticking = false
    }

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateActiveSection)
        ticking = true
      }
    }

    // Initial check
    updateActiveSection()

    // Check for hash in URL on mount
    if (window.location.hash) {
      const targetId = window.location.hash.substring(1)
      if (sections.find(s => s.id === targetId)) {
        setTimeout(() => {
          const element = document.getElementById(targetId)
          if (element) {
            window.scrollTo({
              top: element.offsetTop - 100,
              behavior: "smooth",
            })
            setActiveSection(targetId)
          }
        }, 300)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [sections])

  const handleNavClick = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: "smooth",
      })
      setActiveSection(sectionId)
    }
  }

  return (
    <nav className={`policy-navigation sticky top-4 ${className}`}>
      <div className="bg-white rounded-lg shadow-sm border p-4">
        <h3 className="font-semibold text-gray-900 mb-3">Contents</h3>
        <ul className="space-y-2">
          {sections.map((section) => (
            <li key={section.id}>
              <button
                onClick={() => handleNavClick(section.id)}
                className={`policy-nav-item w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                  activeSection === section.id
                    ? "bg-blue-100 text-blue-700 font-medium"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                {section.title}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
