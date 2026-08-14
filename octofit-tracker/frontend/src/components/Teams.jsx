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

function Teams() {
  return (
    <DataResource
      badge="Team management"
      description="Team rosters, sports, captains, and membership counts."
      emptyMessage="No teams have been created yet."
      endpoint="/teams/"
      title="Teams"
      renderItem={(team) => {
        const members = Array.isArray(team.members) ? team.members : []

        return (
          <>
            <div className="resource-card__header">
              <span className="resource-pill resource-pill--accent">{team.sport}</span>
              <span className="resource-pill">{members.length} members</span>
            </div>

            <h3>{team.name}</h3>

            <dl className="resource-specs">
              <div>
                <dt>Captain</dt>
                <dd>{getEntityName(team.captain, 'Unassigned captain')}</dd>
              </div>
              <div>
                <dt>Members</dt>
                <dd>{members.length}</dd>
              </div>
              <div>
                <dt>Roster</dt>
                <dd>{members.map((member) => getEntityName(member, 'Unknown')).join(', ') || 'Empty'}</dd>
              </div>
            </dl>
          </>
        )
      }}
    />
  )
}

export default Teams