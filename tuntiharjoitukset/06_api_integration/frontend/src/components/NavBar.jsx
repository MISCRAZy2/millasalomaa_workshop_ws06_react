import { NavLink, Link } from 'react-router-dom'

const NAV_LINKS = [
  { to: '/notes', label: 'Notes', end: true },
]

function NavBar() {
  return (
    <header className="navbar">
      <span className="navbar-brand">⚛ API Integration Demo</span>
      <nav>
        <ul className="nav-list">
          {NAV_LINKS.map(({ to, label, end }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={end}
                className={({ isActive }) =>
                  isActive ? 'nav-link nav-link--active' : 'nav-link'
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <Link to="/notes/new" className="btn-new">+ New note</Link>
    </header>
  )
}

export default NavBar
