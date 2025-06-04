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
        const response = await fetch('/api/register', {
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
      {Error && <h1 className="loginPage__error_text">Användaren finns redan</h1>}
      <h1>Registrera konto</h1>
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
      <h3 className="loginPage__form_password">Lösenord</h3>
      <input
        className="loginPage__password"
        placeholder="Lösenord"
        type="password"
        autoComplete="current-password"
        required
        value={Password}
        onChange={(ev) => setPassword(ev.target.value)}
      />
      <button className="loginPage__button">Registrera</button>
    </form>
  )
}
