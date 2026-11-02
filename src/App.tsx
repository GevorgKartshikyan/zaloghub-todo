import { useState } from 'react'
import type { Filter, Task } from './types'
import { useLocalStorage } from './hooks/useLocalStorage'
import TaskForm from './components/TaskForm'
import Search from './components/Search'
import Filters from './components/Filters'
import TaskList from './components/TaskList'
import Pagination from './components/Pagination'

const TASKS_PER_PAGE = 5

export default function App() {
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', [])
  const [filter, setFilter] = useState<Filter>('all')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const addTask = (text: string) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      text,
      completed: false,
    }
    setTasks((prev) => [newTask, ...prev])
  }

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    )
  }

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  const editTask = (id: string, text: string) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, text } : task)),
    )
  }

  const clearCompleted = () => {
    setTasks((prev) => prev.filter((task) => !task.completed))
  }

  const changeFilter = (value: Filter) => {
    setFilter(value)
    setPage(1)
  }

  const changeSearch = (value: string) => {
    setSearch(value)
    setPage(1)
  }

  const query = search.trim().toLowerCase()

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active' && task.completed) return false
    if (filter === 'completed' && !task.completed) return false
    return task.text.toLowerCase().includes(query)
  })

  const totalPages = Math.max(1, Math.ceil(filteredTasks.length / TASKS_PER_PAGE))
  const currentPage = Math.min(page, totalPages)
  const start = (currentPage - 1) * TASKS_PER_PAGE
  const visibleTasks = filteredTasks.slice(start, start + TASKS_PER_PAGE)

  const activeCount = tasks.filter((task) => !task.completed).length
  const hasCompleted = tasks.length > activeCount

  return (
    <main className="app">
      <h1 className="app__title">Список задач</h1>

      <TaskForm onAdd={addTask} />
      <Search value={search} onChange={changeSearch} />
      <Filters current={filter} onChange={changeFilter} />
      <TaskList
        tasks={visibleTasks}
        onToggle={toggleTask}
        onDelete={deleteTask}
        onEdit={editTask}
      />
      <Pagination page={currentPage} totalPages={totalPages} onChange={setPage} />

      <div className="app__footer">
        <p className="app__counter">Осталось задач: {activeCount}</p>

        {hasCompleted && (
          <button className="app__clear" onClick={clearCompleted}>
            Очистить выполненные
          </button>
        )}
      </div>
    </main>
  )
}
