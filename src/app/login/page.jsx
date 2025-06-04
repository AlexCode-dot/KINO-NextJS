'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Login() {
  const [Username, setUsername] = useState('')
  const [Password, setPassword] = useState('')
  const [Error, setError] = useState('')
  const router = useRouter()

  return (
    <main className="loginPage">
      <div className="loginPage__container">
        <h1 className="loginPage__Title">Logga in</h1>
        <section className="loginPage__section">
          <form
            className="loginPage__form"
            onSubmit={async (ev) => {
              ev.preventDefault()
              const response = await fetch('/api/login', {
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
                window.dispatchEvent(new Event('loginStatusChanged'))
                router.push('/login/account')
              } else {
                setError(true)
              }
            }}
          >
            {Error && <h1 className="loginPage__error_text">Fel användarnamn eller lösenord</h1>}
            <div>
              <p>Inget konto?</p>
              <div className="loginPage__register">
                <a href="/register">Registrera här</a>
              </div>
            </div>
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
            <a href="/forgotpassword">Glömt lösenordet?</a>
            <button className="loginPage__button">Login</button>
          </form>
        </section>
      </div>
    </main>
  )
}
