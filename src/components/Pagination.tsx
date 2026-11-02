interface PaginationProps {
  page: number
  totalPages: number
  onChange: (page: number) => void
}

export default function Pagination({ page, totalPages, onChange }: PaginationProps) {
  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <nav className="pagination" aria-label="Страницы">
      <button
        className="pagination__button"
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        aria-label="Предыдущая страница"
      >
        ‹
      </button>

      {pages.map((p) => (
        <button
          key={p}
          className={`pagination__button ${p === page ? 'pagination__button--active' : ''}`}
          onClick={() => onChange(p)}
        >
          {p}
        </button>
      ))}

      <button
        className="pagination__button"
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        aria-label="Следующая страница"
      >
        ›
      </button>
    </nav>
  )
}
