import DataResource from './DataResource.jsx'
import { formatDate } from '../lib/api.js'

const getEntityName = (value, fallback) => {
  if (!value) {
    return fallback
  }

  if (typeof value === 'string') {
    return value
  }

  return value.name ?? value.title ?? value.email ?? fallback
}

function Activities() {
  return (
    <DataResource
      badge="Activity log"
      description="Recent sessions, duration, calories, and the team or user connected to each log."
      emptyMessage="No activities have been recorded yet."
      endpoint="/activities/"
      title="Activities"
      renderItem={(activity) => (
        <>
          <div className="resource-card__header">
            <span className="resource-pill">{formatDate(activity.date)}</span>
            <span className="resource-pill resource-pill--accent">{activity.type}</span>
          </div>

          <h3>{activity.type}</h3>

          <dl className="resource-specs">
            <div>
              <dt>Duration</dt>
              <dd>{activity.durationMinutes} min</dd>
            </div>
            <div>
              <dt>Calories</dt>
              <dd>{activity.caloriesBurned}</dd>
            </div>
            <div>
              <dt>User</dt>
              <dd>{getEntityName(activity.userId, 'Unassigned user')}</dd>
            </div>
            <div>
              <dt>Team</dt>
              <dd>{getEntityName(activity.teamId, 'Independent')}</dd>
            </div>
          </dl>
        </>
      )}
    />
  )
}

export default Activities