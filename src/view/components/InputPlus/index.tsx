import React, { useCallback } from 'react'

import styles from './index.module.scss'

interface InputPlusProp {
  onAdd: (title: string) => void
}

export const InputPLus: React.FC<InputPlusProp> = ({ onAdd }) => {
  const [inputValue, setInputValue] = React.useState('')
  const addTask = useCallback(() => {
    onAdd(inputValue)
    setInputValue('')
  }, [inputValue])

  return (
    <div className={styles.inputPlus}>
      <input
        type="text"
        className={styles.inputPlusValue}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') addTask()
        }}
        placeholder="What needs to be done?"
      />
      <button
        onClick={addTask}
        aria-label="Add"
        className={styles.inputPlusButton}
      />
    </div>
  )
}
