'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Register() {
  const [Username, setUsername] = useState('')
  const [Password, setPassword] = useState('')
  const [Error, setError] = useState(false)
  const router = useRouter()

  return (
    <form
      className="loginPage__form"
      onSubmit={async (ev) => {
        ev.preventDefault()
        const response = await fetch('/api/changepassword', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            Username,
            Password,
          }),
        })
        if (response.ok) {
          router.push('/login')
        } else {
          setError(true)
        }
      }}
    >
      <h1>Glömt lösenord</h1>
      <h3 className="loginPage__form_name">Användarnamn</h3>
      <input
        className="loginPage__username"
        placeholder="Användarnamn"
        type="text"
        autoComplete="username"
        required
        value={Username}
        onChange={(ev) => setUsername(ev.target.value)}
      />
      <h3 className="loginPage__form_password">Nytt lösenord</h3>
      <input
        className="loginPage__password"
        placeholder="Nytt Lösenord"
        type="password"
        autoComplete="current-password"
        required
        value={Password}
        onChange={(ev) => setPassword(ev.target.value)}
      />
      <button className="loginPage__button">Byt lösenord</button>
    </form>
  )
}
