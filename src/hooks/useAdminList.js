import { useState } from 'react'

export function useAdminList() {
  const [expandedIds, setExpandedIds] = useState([])

  const toggle = (id) => {
    setExpandedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  const isExpanded = (id) => expandedIds.includes(id)

  return { expandedIds, isExpanded, toggle }
}
