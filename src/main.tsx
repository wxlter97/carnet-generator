import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@wxlter.dev/ui-css/src/index.css'
import './index.css'
import './print.css'
import App from './App.tsx'
import { WizardProvider } from './state/WizardContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WizardProvider>
      <App />
    </WizardProvider>
  </StrictMode>,
)
