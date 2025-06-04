'use client'
import { useState } from 'react'

export default function AdminCreate() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [users, setUsers] = useState([]) // <-- Lägg till denna
  const [userError, setUserError] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Username: username, Password: password }),
      })
      if (!response.ok) throw new Error('Failed to create user')
      setSuccess('Användare skapad!')
      setUsername('')
      setPassword('')
    } catch (err) {
      setError('Kunde inte skapa användare')
    }
  }

  async function fetchUsers() {
    setUserError(null)
    try {
      const response = await fetch('/api/getusers')
      if (!response.ok) throw new Error('Kunde inte hämta användare')
      const data = await response.json()
      setUsers(data)
    } catch (err) {
      setUserError('Kunde inte hämta användare')
    }
  }

  async function handleToggleAdmin(username) {
    try {
      const res = await fetch('/api/toggleadmin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username }),
      })
      if (!res.ok) throw new Error('Kunde inte toggla admin')
      // Uppdatera användarlistan efter toggling
      fetchUsers()
    } catch (err) {
      setUserError('Kunde inte toggla admin')
    }
  }

  async function handleDeleteUser(username) {
    try {
      const res = await fetch('/api/deleteuser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username }),
      })
      if (!res.ok) throw new Error('Kunde inte ta bort användare')
      fetchUsers()
    } catch (err) {
      setUserError('Kunde inte ta bort användare')
    }
  }

  return (
    <main>
      <section className="admin-page__section">
        <h2 className="admin-page__section-title">Skapa konto</h2>
        <form className="admin-page__form" onSubmit={handleSubmit}>
          <input
            className="admin-page__input"
            placeholder="Användarnamn"
            type="text"
            autoComplete="username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="admin-page__input"
            placeholder="Lösenord"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="admin-page__button">
            Skapa konto
          </button>
        </form>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        {success && <div style={{ color: 'green' }}>{success}</div>}
      </section>
      <section>
        <div>
          <h2 className="admin-page__section-title">Användare</h2>
          <p>Här kan du hantera befintliga användare.</p>
          <button className="admin-page__button" onClick={fetchUsers}>
            Hämta användare
          </button>
        </div>
        {userError && <div style={{ color: 'red' }}>{userError}</div>}
        <div className="admin-list"></div>

        {Array.isArray(users) &&
          users.map((user) => (
            // <section className='admin-list__movie'>
            <h1 className="admin-list__movie-title" key={user._id || user.Username}>
              {user.Username} {user.Admin === true || user.Admin === 'true' ? '(Admin)' : ''}
              <button className="admin-list__delete-button" onClick={() => handleToggleAdmin(user.Username)}>
                Toggla admin
              </button>
              <button className="admin-list__delete-button" onClick={() => handleDeleteUser(user.Username)}>
                Ta bort
              </button>
            </h1>
            // </section>
          ))}
      </section>
    </main>
  )
}
