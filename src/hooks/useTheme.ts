'use client'

import { useState, useCallback, useEffect } from "react"
import { LIGHT, DARK } from "Constants/theme"

const useTheme = () => {
  const [theme, setTheme] = useState<string | null>(null)

  const themeToggler = useCallback(() => {
    const nextTheme = theme === LIGHT ? DARK : LIGHT
    setTheme(nextTheme)
    
    if (typeof window !== "undefined") {
      localStorage.setItem('theme', nextTheme)
      document.documentElement.dataset.theme = nextTheme
    }
  }, [theme])

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem('theme')
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      const initialTheme = savedTheme || (prefersDark ? DARK : LIGHT)
      
      setTheme(initialTheme)
      document.documentElement.dataset.theme = initialTheme
    }
  }, [])

  return {
    theme,
    themeToggler,
  } as const
}

export type UseThemeReturnType = ReturnType<typeof useTheme>

export default useTheme
