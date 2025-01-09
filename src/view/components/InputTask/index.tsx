import React from 'react'

import styles from './index.module.scss'

interface InputTaskProp {
  id: string
  title: string
  onDone: (id: string) => void
  onEdited: (id: string, value: string) => void
  onRemoved: (id: string) => void
}

export const InputTask: React.FC<InputTaskProp> = ({
  id,
  title,
  onDone,
  onEdited,
  onRemoved,
}) => {
  const [checked, setChecked] = React.useState(false)
  const [isEditMode, setIsEditMode] = React.useState(false)
  const [value, setValue] = React.useState(title)
  const editTitleInputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    if (isEditMode) {
      editTitleInputRef?.current?.focus()
    }
  }, [isEditMode])

  return (
    <div className={styles.inputTask}>
      <label className={styles.inputTaskLabel}>
        <input
          type="checkbox"
          disabled={isEditMode}
          checked={checked}
          className={styles.inputTaskCheckbox}
          onChange={(e) => {
            setChecked(e.target.checked)
            if (e.target.checked) {
              setTimeout(() => {
                onDone(id)
              }, 1000)
            }
          }}
        />
        {isEditMode ? (
          <input
            ref={editTitleInputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                onEdited(id, value)
                setIsEditMode(false)
              }
            }}
            className={styles.inputTaskTitleEdit}
          />
        ) : (
          <h3 className={styles.inputTaskTitle}>{title}</h3>
        )}
      </label>
      {isEditMode ? (
        <button
          aria-label="Save"
          className={styles.inputTaskSave}
          onClick={() => {
            onEdited(id, value)
            setIsEditMode(false)
          }}
        />
      ) : (
        <button
          aria-label="Edit"
          className={styles.inputTaskEdit}
          onClick={() => setIsEditMode(true)}
        />
      )}
      <button
        aria-label="Remove"
        className={styles.inputTaskRemove}
        onClick={() => {
          if (confirm('Are you sure?')) {
            onRemoved(id)
          }
        }}
      />
    </div>
  )
}
