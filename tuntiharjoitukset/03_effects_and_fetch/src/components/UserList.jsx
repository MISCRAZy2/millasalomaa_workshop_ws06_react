function UserList({ users, status, error, selectedId, onSelect }) {
  if (status === 'loading') {
    return <p className="status-message">Loading users…</p>
  }

  if (status === 'error') {
    return <p className="status-message status-error">Error: {error}</p>
  }

  return (
    <ul className="user-list">
      {users.map((user) => (
        <li key={user.id}>
          <button
            className={`user-btn${selectedId === user.id ? ' user-btn--active' : ''}`}
            onClick={() => onSelect(user.id)}
          >
            <span className="user-name">{user.name}</span>
            <span className="user-email">{user.email}</span>
          </button>
        </li>
      ))}
    </ul>
  )
}

export default UserList
