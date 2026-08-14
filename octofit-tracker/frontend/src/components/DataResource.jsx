import { useEffect, useState } from 'react'

import { createApiUrl, getCollectionItems, getPageMeta } from '../lib/api.js'

const formatMetaLabel = (key) =>
  key
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/_/g, ' ')
    .replace(/^./, (character) => character.toUpperCase())

function DataResource({ badge, description, emptyMessage, endpoint, title, renderItem }) {
  const [items, setItems] = useState([])
  const [pageMeta, setPageMeta] = useState({})
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()

    const loadResource = async () => {
      setLoading(true)
      setError('')

      try {
        const response = await fetch(createApiUrl(endpoint), {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const payload = await response.json()
        setItems(getCollectionItems(payload))
        setPageMeta(getPageMeta(payload))
      } catch (error) {
        if (error.name !== 'AbortError') {
          setError(error instanceof Error ? error.message : 'Failed to load data')
          setItems([])
          setPageMeta({})
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    loadResource()

    return () => {
      controller.abort()
    }
  }, [endpoint])

  const metaEntries = Object.entries(pageMeta)

  return (
    <section className="resource-section">
      <header className="resource-header">
        <div>
          <p className="eyebrow">{badge}</p>
          <h2>{title}</h2>
          <p className="resource-description">{description}</p>
        </div>

        <div className="resource-badges">
          <span className="resource-badge">{items.length} records</span>
          <span className="resource-badge resource-badge--subtle">
            {loading ? 'Loading' : error ? 'Needs attention' : 'Live'}
          </span>
        </div>
      </header>

      {error ? <div className="resource-alert">{error}</div> : null}

      <div className="resource-grid">
        {loading && items.length === 0 ? (
          <div className="resource-empty">Loading {title.toLowerCase()}...</div>
        ) : items.length > 0 ? (
          items.map((item, index) => (
            <article className="resource-card" key={item._id ?? item.id ?? `${endpoint}-${index}`}>
              {renderItem(item, index)}
            </article>
          ))
        ) : (
          <div className="resource-empty">{emptyMessage}</div>
        )}
      </div>

      {metaEntries.length > 0 ? (
        <footer className="resource-footer">
          {metaEntries.map(([key, value]) => (
            <span className="resource-meta" key={key}>
              <strong>{formatMetaLabel(key)}</strong>
              <span>{String(value)}</span>
            </span>
          ))}
        </footer>
      ) : null}
    </section>
  )
}

export default DataResource