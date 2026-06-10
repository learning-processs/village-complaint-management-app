
import { createContext, useContext, useEffect, useState } from 'react'

export const ThemeContext = createContext()

const ThemeContextProvider = ({ children }) => {

  const [darkMode, setDarkMode] = useState(() => {
    // Load from localStorage
    return localStorage.getItem('theme') === 'dark'
  })

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [darkMode])

  const toggleTheme = () => {
  setDarkMode(!darkMode)
}

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)

export default ThemeContextProvider