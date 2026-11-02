interface SearchProps {
  value: string
  onChange: (value: string) => void
}

export default function Search({ value, onChange }: SearchProps) {
  return (
    <input
      className="search"
      type="search"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Поиск по задачам"
      aria-label="Поиск по задачам"
    />
  )
}
