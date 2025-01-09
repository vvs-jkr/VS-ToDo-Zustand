import React from 'react'
import { Task, useToDoStore } from '../../data/stores/useToDoStore' // Импортируем типы
import { InputPLus } from '../components/InputPlus'
import styles from './index.module.scss'
import { InputTask } from '../components/InputTask'

export const App: React.FC = () => {
  const tasks = useToDoStore((state) => state.tasks)
  const createTask = useToDoStore((state) => state.createTask)
  const updateTask = useToDoStore((state) => state.updateTask)
  const removeTask = useToDoStore((state) => state.removeTask)

  return (
    <article className={styles.article}>
      <h1 className={styles.articleTitle}>VS To Do App</h1>
      <section className={styles.articleSection}>
        <InputPLus onAdd={createTask} />
      </section>
      <section className={styles.articleSection}>
        {!tasks.length && (
          <p className={styles.articleSectionTitle}>There is no tasks</p>
        )}
        {tasks.map((task: Task) => (
          <InputTask
            key={task.id}
            id={task.id}
            title={task.title}
            onDone={() => removeTask(task.id)}
            onEdited={(newTitle) => updateTask(task.id, newTitle)}
            onRemoved={() => removeTask(task.id)}
          />
        ))}
      </section>
    </article>
  )
}
