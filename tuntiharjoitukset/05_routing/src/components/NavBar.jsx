import { NavLink } from 'react-router-dom'

// NavLink is like <Link> but automatically adds an "active" class (or any
// class you choose via the className callback) when its href matches the
// current URL. This is useful for highlighting the current page in a nav bar.
//
// The `end` prop on the Home link means it only matches exactly "/" and not
// any path that starts with "/" (which would be every path).

const NAV_LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/posts', label: 'Posts' },
  { to: '/about', label: 'About' },
]

function NavBar() {
  return (
    <header className="navbar">
      <span className="navbar-brand">⚛ React Router Demo</span>
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
    </header>
  )
}

export default NavBar
