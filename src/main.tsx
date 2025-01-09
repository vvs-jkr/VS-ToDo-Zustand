import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './view/App/index'

import './view/styles/reset.scss'
import './view/styles/common.scss'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
