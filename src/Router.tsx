import { Navigate, Route, Routes, useLocation } from 'react-router-dom'

import { AuthGuard, UnAuthGuard } from 'guards'
import { UserProfile } from 'container/UserProfile/UserProfile'
import { AppHeader } from 'container/AppBar/AppHeader'
import { LoginPage } from 'container/LoginPage/LoginPage'
import { RegistrationPage } from 'container/RegistrationPage/RegistrationPage'
import { App } from 'App'
import 'main.scss'

export const Router = () => {
  const location = useLocation()

  return (
    <div className="main">
      <AppHeader />
      <Routes location={location} key={location.pathname}>
        {/* <Route path="/main" element={<AuthGuard comp={<App />} />} /> */}
        <Route path="/main" element={<App />} />
        <Route path="/sign-in" element={<UnAuthGuard comp={<LoginPage />} />} />
        <Route path="/sign-up" element={<UnAuthGuard comp={<RegistrationPage />} />} />
        <Route path="/profile" element={<AuthGuard comp={<UserProfile />} />} />
        <Route path="/*" element={<Navigate to="/main" />} />
      </Routes>
    </div>
  )
}
