import type { Filter } from '../types'

interface FiltersProps {
  current: Filter
  onChange: (filter: Filter) => void
}

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'all', label: 'Все' },
  { value: 'active', label: 'Активные' },
  { value: 'completed', label: 'Выполненные' },
]

export default function Filters({ current, onChange }: FiltersProps) {
  return (
    <div className="filters">
      {FILTERS.map(({ value, label }) => (
        <button
          key={value}
          className={`filters__button ${current === value ? 'filters__button--active' : ''}`}
          onClick={() => onChange(value)}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
