import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { generatedId } from '../helpers'

interface Task {
  id: string
  title: string
  createdAt: number
}

interface ToDoStore {
  tasks: Task[]
  createTask: (title: string) => void
  updateTask: (id: string, title: string) => void
  removeTask: (id: string) => void
}

export const useToDoStore = create<ToDoStore>()(
  persist(
    (set) => ({
      tasks: [],
      createTask: (title: string) => {
        const newTask = {
          id: generatedId(),
          title,
          createdAt: Date.now(),
        }
        set((state) => ({ tasks: [newTask, ...state.tasks] }))
      },
      updateTask: (id: string, title: string) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, title } : task
          ),
        }))
      },
      removeTask: (id: string) => {
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        }))
      },
    }),
    {
      name: 'tasks',
      storage: createJSONStorage(() => localStorage),
      version: 0,
    }
  )
)

export type { Task, ToDoStore }
