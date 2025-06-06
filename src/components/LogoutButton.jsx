'use client'
import { useRouter } from 'next/navigation'

export default function LogoutButton() {
  const router = useRouter()

  async function handleLogout() {
    await fetch('/api/logout', { method: 'POST' })
    window.dispatchEvent(new Event('loginStatusChanged'))
    router.push('/login')
  }

  return (
    <button className="loginPage__button" onClick={handleLogout}>
      Logout
    </button>
  )
}
