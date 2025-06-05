'use client'
import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { jwtDecode } from 'jwt-decode'

export default function NavMenu() {
  const [homeClass, setHomeClass] = useState('header__nav-item')
  const [moviesClass, setMoviesClass] = useState('header__nav-item')
  const [aboutClass, setAboutClass] = useState('header__nav-item')
  const [adminClass, setAdminClass] = useState('header__nav-item')
  const [loginClass, setLoginClass] = useState('header__nav-item')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [Admin, setAdmin] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  // Checks if user is logged in by checking cookies
  useEffect(() => {
    const checkLogin = () => {
      const cookies = document.cookie.split(';').map((c) => c.trim())
      const jwtCookie = cookies.find((c) => c.startsWith('JWT='))
      console.log('Checking login status...')
      console.log('Cookies:', cookies)
      console.log('JWT Cookie:', jwtCookie)
      if (jwtCookie) {
        const token = jwtCookie.split('=')[1]
        try {
          const decoded = jwtDecode(token)
          setIsLoggedIn(!!decoded.username)
          setAdmin(decoded.admin)
        } catch (e) {
          setIsLoggedIn(false)
          setAdmin(false)
        }
      } else {
        setIsLoggedIn(false)
        setAdmin(false)
      }
    }
    checkLogin()
    window.addEventListener('loginStatusChanged', checkLogin)
    return () => window.removeEventListener('loginStatusChanged', checkLogin)
  }, [])

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
        {(process.env.NODE_ENV === 'development' || Admin === true) && (
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
          className={
            isLoggedIn && pathname === '/login/account'
              ? 'header__nav-item menu-active'
              : !isLoggedIn && pathname === '/login'
                ? 'header__nav-item menu-active'
                : 'header__nav-item'
          }
          onClick={() => {
            if (isLoggedIn) {
              setHomeClass('header__nav-item')
              setMoviesClass('header__nav-item')
              setAboutClass('header__nav-item')
              setAdminClass('header__nav-item')
              setLoginClass('header__nav-item menu-active')
              router.push('/login/account')
            } else {
              handleLoginClick()
            }
          }}
        >
          <a>{isLoggedIn ? 'KONTO' : 'LOGGA IN'}</a>
        </li>
      </ul>
      {process.env.NODE_ENV === 'development' &&
        console.log(`isLoggedIn:${isLoggedIn} NODE_ENV:${process.env.NODE_ENV} Admin:${Admin}`)}
    </nav>
  )
}
