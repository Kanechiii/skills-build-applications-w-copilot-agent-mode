const rawCodespaceName = import.meta.env.VITE_CODESPACE_NAME

export const codespaceName =
  typeof rawCodespaceName === 'string' ? rawCodespaceName.trim() : ''

export const hasCodespaceName = codespaceName.length > 0

export const apiOrigin = hasCodespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export const apiBaseUrl = `${apiOrigin}/api`

export const createApiUrl = (path) => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${apiBaseUrl}${normalizedPath}`
}

const findArrayValue = (value, visited = new Set()) => {
  if (!value || typeof value !== 'object' || visited.has(value)) {
    return []
  }

  visited.add(value)

  if (Array.isArray(value)) {
    return value
  }

  for (const nestedValue of Object.values(value)) {
    if (Array.isArray(nestedValue)) {
      return nestedValue
    }

    if (nestedValue && typeof nestedValue === 'object') {
      const items = findArrayValue(nestedValue, visited)
      if (items.length > 0) {
        return items
      }
    }
  }

  return []
}

export const getCollectionItems = (payload) => {
  if (Array.isArray(payload)) {
    return payload
  }

  if (!payload || typeof payload !== 'object') {
    return []
  }

  const envelope = 'data' in payload && payload.data ? payload.data : payload
  return findArrayValue(envelope)
}

export const getPageMeta = (payload) => {
  if (!payload || typeof payload !== 'object') {
    return {}
  }

  const envelope = 'data' in payload && payload.data && typeof payload.data === 'object'
    ? payload.data
    : payload

  const metaKeys = [
    'page',
    'pageNumber',
    'currentPage',
    'limit',
    'pageSize',
    'perPage',
    'total',
    'totalPages',
    'pages',
    'count',
    'hasNextPage',
    'hasPrevPage',
  ]

  return metaKeys.reduce((meta, key) => {
    if (envelope[key] !== undefined) {
      meta[key] = envelope[key]
    }

    return meta
  }, {})
}

export const formatDate = (value) => {
  if (!value) {
    return 'Not set'
  }

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return String(value)
  }

  return date.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export const formatDateTime = (value) => {
  if (!value) {
    return 'Not set'
  }

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return String(value)
  }

  return date.toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}