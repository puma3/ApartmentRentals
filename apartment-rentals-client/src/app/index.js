import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

// import Login from "./screens/Login";
import PublicLayout from './screens/layouts/PublicLayout'
import { AppLayout } from './screens/shared/Layout'

const App = () => (
  <AppLayout>
    <Router>
      <PublicLayout />
    </Router>
  </AppLayout>
)

export default App
