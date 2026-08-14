import DataResource from './DataResource.jsx'

const getEntityName = (value, fallback) => {
  if (!value) {
    return fallback
  }

  if (typeof value === 'string') {
    return value
  }

  return value.name ?? value.title ?? value.email ?? fallback
}

function Leaderboard() {
  return (
    <DataResource
      badge="Competitive view"
      description="Team leaderboard entries sorted by score and rank."
      emptyMessage="No leaderboard entries are available yet."
      endpoint="/leaderboard/"
      title="Leaderboard"
      renderItem={(entry) => (
        <>
          <div className="resource-card__header">
            <span className="resource-pill resource-pill--accent">Rank {entry.rank}</span>
            <span className="resource-pill">Score {entry.score}</span>
          </div>

          <h3>{getEntityName(entry.teamId, 'Unassigned team')}</h3>

          <dl className="resource-specs">
            <div>
              <dt>User</dt>
              <dd>{getEntityName(entry.userId, 'Unknown user')}</dd>
            </div>
            <div>
              <dt>Score</dt>
              <dd>{entry.score}</dd>
            </div>
            <div>
              <dt>Rank</dt>
              <dd>{entry.rank}</dd>
            </div>
          </dl>
        </>
      )}
    />
  )
}

export default Leaderboard