import DataResource from './DataResource.jsx'

const getTeamName = (value) => {
  if (!value) {
    return 'Unassigned'
  }

  if (typeof value === 'string') {
    return value
  }

  return value.name ?? value.title ?? 'Unassigned'
}

function Users() {
  return (
    <DataResource
      badge="User roster"
      description="People in the system with goals, streaks, and team assignments."
      emptyMessage="No users are available yet."
      endpoint="/users/"
      title="Users"
      renderItem={(user) => (
        <>
          <div className="resource-card__header">
            <span className="resource-pill resource-pill--accent">Streak {user.streak ?? 0}</span>
            <span className="resource-pill">{getTeamName(user.teamId)}</span>
          </div>

          <h3>{user.name}</h3>

          <dl className="resource-specs">
            <div>
              <dt>Email</dt>
              <dd>{user.email}</dd>
            </div>
            <div>
              <dt>Goal</dt>
              <dd>{user.fitnessGoal}</dd>
            </div>
            <div>
              <dt>Team</dt>
              <dd>{getTeamName(user.teamId)}</dd>
            </div>
            <div>
              <dt>Streak</dt>
              <dd>{user.streak ?? 0} days</dd>
            </div>
          </dl>
        </>
      )}
    />
  )
}

export default Users