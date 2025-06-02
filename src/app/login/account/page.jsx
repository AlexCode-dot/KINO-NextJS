import { cookies } from 'next/headers'
import LogoutButton from '@/components/LogoutButton'

export default async function Secret() {
  const allCookies = await cookies()
  const username = allCookies.get('Username')?.value ?? null

  if (username) {
    console.log(`User ${username} is logged in`)
    return (
      <main>
        <div>
          <h1>User {username} logged in!</h1>
          <h2>Hello {username}!</h2>
          <LogoutButton />
        </div>
        <div>
          <h3>Button</h3>
          <button>Click me</button>
        </div>
      </main>
    )
  } else {
    console.log('User is not logged in')
    return <h1>You are not logged in!</h1>
  }
}
