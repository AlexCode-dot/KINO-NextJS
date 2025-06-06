import { cookies } from 'next/headers'
import LogoutButton from '@/components/LogoutButton'
import { jwtDecode } from 'jwt-decode'

export default async function Secret() {
  const allCookies = await cookies()
  const jwtCookie = allCookies.get('JWT')
  let username = null
  if (jwtCookie) {
    try {
      const decoded = jwtDecode(jwtCookie.value)
      username = decoded.username
    } catch (e) {
      console.error('Invalid JWT token:', e)
    }
  }
  if (username) {
    return (
      <main>
        <div className="loginPage__container">
          <div className="loginPage__section">
            <h1 className="loginPage__status">Användare {username} har loggat in!</h1>
          </div>
          <div className="loginPage__section">
            <h2 className="loginPage__hello">Hej {username}!</h2>
          </div>
          <LogoutButton />
        </div>
      </main>
    )
  } else {
    console.log('User is not logged in')
    return (
      <div>
        <h1>Du är inte inloggad!</h1>
        <a href="/login">Logga in</a>
      </div>
    )
  }
}
