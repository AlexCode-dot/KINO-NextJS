'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Login() {
  const [Username, setUsername] = useState('')
  const [Password, setPassword] = useState('')
  const router = useRouter()

  return (
    <main className="loginPage">
      <div className="loginPage__container">
        <h1 className="loginPage__Title">Login</h1>
        <section className="loginPage__section">
          <form
            className="loginPage__form"
            onSubmit={(ev) => {
              ev.preventDefault()
              const response = fetch('/api/login', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  Username,
                  Password,
                }),
              })
              router.push('/login/secret')
              console.log(`Login form submitted ${Username} and ${Password}`)
            }}
          >
            <h3 className="loginPage__form_name">Username</h3>
            <input
              className="loginPage__username"
              type="text"
              value={Username}
              onChange={(ev) => setUsername(ev.target.value)}
            />
            <h3 className="loginPage__form_password">Password</h3>
            <input
              className="loginPage__password"
              type="password"
              value={Password}
              onChange={(ev) => setPassword(ev.target.value)}
            />
            <button className="loginPage__button">Login</button>
          </form>
        </section>
      </div>
    </main>
  )
}
