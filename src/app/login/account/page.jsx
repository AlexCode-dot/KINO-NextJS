import { cookies } from 'next/headers'
import LogoutButton from '@/components/LogoutButton'

export default async function Secret() {
  const allCookies = await cookies()
  const username = allCookies.get('Username')?.value ?? null

  if (username) {
    return (
      <main>
        <div>
          <h1 className="loginPage__status">Användare {username} har loggat in!</h1>
          <h2 className="loginPage__hello">Hej {username}!</h2>
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
