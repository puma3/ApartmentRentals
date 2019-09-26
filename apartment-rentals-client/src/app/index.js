import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import { CurrentUserProvider } from './shared/CurrentUserContext'
import PublicLayout from './screens/layouts/PublicLayout'
import { AppLayout } from './screens/shared/Layout'

const App = () => (
  <AppLayout>
    <CurrentUserProvider>
      <Router>
        <PublicLayout />
      </Router>
    </CurrentUserProvider>
  </AppLayout>
)

export default App
