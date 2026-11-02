import type { Task } from '../types'
import TaskItem from './TaskItem'

interface TaskListProps {
  tasks: Task[]
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onEdit: (id: string, text: string) => void
}

export default function TaskList({ tasks, onToggle, onDelete, onEdit }: TaskListProps) {
  if (tasks.length === 0) {
    return <p className="empty">Здесь пока пусто</p>
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  )
}
