import { useState } from 'react'
import type { KeyboardEvent } from 'react'
import type { Task } from '../types'

interface TaskItemProps {
  task: Task
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onEdit: (id: string, text: string) => void
}

export default function TaskItem({ task, onToggle, onDelete, onEdit }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [draft, setDraft] = useState(task.text)

  const startEditing = () => {
    setDraft(task.text)
    setIsEditing(true)
  }

  const saveEditing = () => {
    const trimmed = draft.trim()

    if (trimmed && trimmed !== task.text) {
      onEdit(task.id, trimmed)
    }
    setIsEditing(false)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') saveEditing()
    if (e.key === 'Escape') setIsEditing(false)
  }

  return (
    <li className={`task ${task.completed ? 'task--completed' : ''}`}>
      {isEditing ? (
        <input
          className="task__edit"
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={saveEditing}
          aria-label="Изменить задачу"
          autoFocus
        />
      ) : (
        <label className="task__label">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(task.id)}
          />
          <span
            className="task__text"
            onDoubleClick={startEditing}
            title="Двойной клик, чтобы изменить"
          >
            {task.text}
          </span>
        </label>
      )}

      <div className="task__actions">
        {!isEditing && (
          <button
            className="task__icon-button"
            onClick={startEditing}
            aria-label={`Изменить задачу «${task.text}»`}
            title="Изменить"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <path
                d="M4 20h4L19 9l-4-4L4 16v4zM14 6l4 4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}

        <button
          className="task__icon-button task__icon-button--danger"
          onClick={() => onDelete(task.id)}
          aria-label={`Удалить задачу «${task.text}»`}
          title="Удалить"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <path
              d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </li>
  )
}
