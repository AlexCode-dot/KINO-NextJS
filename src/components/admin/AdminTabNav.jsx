'use client'

export default function AdminTabNav({ activeTab, setActiveTab }) {
  return (
    <nav className="admin-panel__nav">
      <button onClick={() => setActiveTab('list')} className={activeTab === 'list' ? 'active' : ''}>
        Översikt
      </button>
      <button onClick={() => setActiveTab('import')} className={activeTab === 'import' ? 'active' : ''}>
        Importera film
      </button>
      <button onClick={() => setActiveTab('screening')} className={activeTab === 'screening' ? 'active' : ''}>
        Skapa visning
      </button>
      <button onClick={() => setActiveTab('room')} className={activeTab === 'room' ? 'active' : ''}>
        Skapa salong
      </button>
    </nav>
  )
}
