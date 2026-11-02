import { useState } from 'react'
import type { FormEvent } from 'react'

interface TaskFormProps {
  onAdd: (text: string) => void
}

export default function TaskForm({ onAdd }: TaskFormProps) {
  const [text, setText] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    const trimmed = text.trim()
    if (!trimmed) return

    onAdd(trimmed)
    setText('')
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        className="task-form__input"
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Что нужно сделать?"
        aria-label="Текст задачи"
      />
      <button className="task-form__button" type="submit" disabled={!text.trim()}>
        Добавить
      </button>
    </form>
  )
}
