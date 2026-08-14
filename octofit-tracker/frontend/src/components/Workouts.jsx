import DataResource from './DataResource.jsx'

const formatEquipment = (equipment) => {
  if (!Array.isArray(equipment) || equipment.length === 0) {
    return 'Bodyweight'
  }

  return equipment.join(', ')
}

function Workouts() {
  return (
    <DataResource
      badge="Workout library"
      description="Recommended workouts with category, duration, difficulty, equipment, and focus."
      emptyMessage="No workouts are available yet."
      endpoint="/workouts/"
      title="Workouts"
      renderItem={(workout) => (
        <>
          <div className="resource-card__header">
            <span className="resource-pill resource-pill--accent">{workout.category}</span>
            <span className="resource-pill">{workout.difficulty}</span>
          </div>

          <h3>{workout.name}</h3>

          <dl className="resource-specs">
            <div>
              <dt>Duration</dt>
              <dd>{workout.durationMinutes} min</dd>
            </div>
            <div>
              <dt>Focus</dt>
              <dd>{workout.focus}</dd>
            </div>
            <div>
              <dt>Equipment</dt>
              <dd>{formatEquipment(workout.equipment)}</dd>
            </div>
          </dl>
        </>
      )}
    />
  )
}

export default Workouts