import { Link, NavLink, Navigate, Route, Routes } from 'react-router-dom'

import logo from '@docs/octofitapp-small.png'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import { codespaceName, hasCodespaceName } from './lib/api.js'
import './App.css'

function App() {
  const navItems = [
    { to: '/activities', label: 'Activities' },
    { to: '/leaderboard', label: 'Leaderboard' },
    { to: '/teams', label: 'Teams' },
    { to: '/users', label: 'Users' },
    { to: '/workouts', label: 'Workouts' },
  ]

  const overviewCards = [
    {
      to: '/activities',
      title: 'Activities',
      description: 'Review recent logs, duration, and calories burned.',
    },
    {
      to: '/leaderboard',
      title: 'Leaderboard',
      description: 'Compare score and rank across the active roster.',
    },
    {
      to: '/teams',
      title: 'Teams',
      description: 'Inspect captains, members, and sport specialties.',
    },
    {
      to: '/users',
      title: 'Users',
      description: 'See fitness goals, streaks, and team assignments.',
    },
    {
      to: '/workouts',
      title: 'Workouts',
      description: 'Browse workout plans with duration and difficulty.',
    },
  ]

  return (
    <div className="app-shell">
      <header className="app-hero">
        <div className="brand-block">
          <img className="brand-logo" src={logo} alt="Octofit Tracker logo" />
          <div>
            <p className="eyebrow">Octofit Tracker</p>
            <h1>React 19 presentation tier for training data, teams, and goals.</h1>
            <p className="hero-copy">
              Route through the activity, leaderboard, team, user, and workout views while
              the frontend resolves the Codespaces API host from Vite environment variables.
            </p>
          </div>
        </div>

        <div className="hero-meta">
          <div className="meta-card">
            <span className="meta-label">API host</span>
            <strong>
              {hasCodespaceName ? `https://${codespaceName}-8000.app.github.dev` : 'http://localhost:8000'}
            </strong>
          </div>
          <div className="meta-card">
            <span className="meta-label">Routing</span>
            <strong>react-router-dom</strong>
          </div>
        </div>

        {!hasCodespaceName ? (
          <div className="config-banner">
            VITE_CODESPACE_NAME is not set. Define it in .env.local for Codespaces deployments;
            the app is falling back to localhost so it does not generate an undefined host.
          </div>
        ) : null}

        <div className="hero-actions">
          <Link className="btn btn-primary btn-lg" to="/activities">
            Open activities
          </Link>
          <Link className="btn btn-outline-light btn-lg" to="/users">
            Browse users
          </Link>
        </div>
      </header>

      <nav className="app-nav" aria-label="Primary">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            to={item.to}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <main className="app-main">
        <Routes>
          <Route
            path="/"
            element={
              <section className="overview-grid">
                <article className="overview-panel overview-panel--intro">
                  <p className="eyebrow">Overview</p>
                  <h2>Choose a resource view</h2>
                  <p>
                    Each section fetches from the backend API under /api and accepts both array
                    responses and paginated envelopes.
                  </p>
                </article>

                {overviewCards.map((card) => (
                  <Link className="overview-card" key={card.to} to={card.to}>
                    <span className="overview-card__label">Open</span>
                    <h3>{card.title}</h3>
                    <p>{card.description}</p>
                  </Link>
                ))}
              </section>
            }
          />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
