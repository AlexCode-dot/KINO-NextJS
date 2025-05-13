'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NavMenu() {
  const [homeClass, setHomeClass] = useState('header__nav-item')
  const [moviesClass, setMoviesClass] = useState('header__nav-item')
  const [aboutClass, setAboutClass] = useState('header__nav-item')
  const [adminClass, setAdminClass] = useState('header__nav-item')
  const router = useRouter()

  const handleHomeClick = () => {
    setHomeClass('header__nav-item menu-active')
    setMoviesClass('header__nav-item')
    setAboutClass('header__nav-item')
    setAdminClass('header__nav-item')
    router.push('/')
  }

  const handleMoviesClick = () => {
    setMoviesClass('header__nav-item menu-active')
    setHomeClass('header__nav-item')
    setAboutClass('header__nav-item')
    setAdminClass('header__nav-item')
    router.push('/movies')
  }

  const handleAboutClick = () => {
    setAboutClass('header__nav-item menu-active')
    setHomeClass('header__nav-item')
    setMoviesClass('header__nav-item')
    setAdminClass('header__nav-item')
    router.push('/about')
  }

  const handleAdminClick = () => {
    setAdminClass('header__nav-item menu-active')
    setHomeClass('header__nav-item')
    setMoviesClass('header__nav-item')
    setAboutClass('header__nav-item')
    router.push('/admin')
  }

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li
          className={homeClass}
          onClick={() => {
            handleHomeClick()
          }}
        >
          <a>HEM</a>
        </li>
        <li
          className={moviesClass}
          onClick={() => {
            handleMoviesClick()
          }}
        >
          <a>FILMER</a>
        </li>
        <li
          className={aboutClass}
          onClick={() => {
            handleAboutClick()
          }}
        >
          <a>OM OSS</a>
        </li>
        {process.env.NODE_ENV === 'development' && (
          <li
            className={adminClass}
            onClick={() => {
              handleAdminClick()
            }}
          >
            <a>ADMIN</a>
          </li>
        )}
      </ul>
    </nav>
  )
}
