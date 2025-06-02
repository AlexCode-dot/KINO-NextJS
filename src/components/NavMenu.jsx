'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NavMenu() {
  const [homeClass, setHomeClass] = useState('header__nav-item')
  const [moviesClass, setMoviesClass] = useState('header__nav-item')
  const [aboutClass, setAboutClass] = useState('header__nav-item')
  const [adminClass, setAdminClass] = useState('header__nav-item')
  const [loginClass, setLoginClass] = useState('header__nav-item')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()

  // Checks if user is logged in by checking cookies
  useEffect(() => {
    const cookies = document.cookie.split(';').map((c) => c.trim())
    const usernameCookie = cookies.find((c) => c.startsWith('Username='))
    setIsLoggedIn(!!usernameCookie && usernameCookie.split('=')[1])
    console.log(isLoggedIn ? 'User is logged in' : 'User is not logged in')
  }, [])

  const updateLoginStatus = () => {
    const cookies = document.cookie.split(';').map((c) => c.trim())
    const usernameCookie = cookies.find((c) => c.startsWith('Username='))
    setIsLoggedIn(!!usernameCookie && usernameCookie.split('=')[1])
  }

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

  const handleLoginClick = () => {
    setHomeClass('header__nav-item')
    setMoviesClass('header__nav-item')
    setAboutClass('header__nav-item')
    setAdminClass('header__nav-item')
    setLoginClass('header__nav-item menu-active')
    router.push('/login')
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
        <li
          className={loginClass}
          onClick={() => {
            if (isLoggedIn) {
              router.push('/login/account')
              updateLoginStatus()
            } else {
              handleLoginClick()
              updateLoginStatus()
            }
          }}
        >
          <a>{isLoggedIn ? 'KONTO' : 'LOGIN'}</a>
        </li>
      </ul>
    </nav>
  )
}
