type GeneratedId = () => string

export const generatedId: GeneratedId = () =>
  Math.random().toString(16).slice(2) + new Date().getTime().toString(36)
