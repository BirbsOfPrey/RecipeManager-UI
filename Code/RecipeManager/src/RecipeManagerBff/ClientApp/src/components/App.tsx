import { Routes, Route } from 'react-router-dom'
import { MainView } from './pages/MainView'
import { UserSession } from "./pages/UserSession"
import { Layout } from './Layout'
import { RecipeManagement } from './pages/RecipeManagement'
import { WeeklyScheduleView } from './pages/WeeklyScheduleView'
import { UserManagement } from './pages/UserManagement'
import { AboutView } from './pages/AboutView'
import { AuthProvider } from './AuthProvider'
import { ProtectedRoute } from './ProtectedRoute'
import { ThemeProvider } from '@emotion/react'
import { createTheme, ThemeOptions } from '@mui/material/styles'
import StringResource from '../resources/StringResource'
import './App.css'

const themeOptions: ThemeOptions = {
    palette: {
        mode: 'light',
        primary: {
            main: '#4caf50',
        },
        secondary: {
            main: '#78909c',
        },
    },
}

export const App = () => {

    return (
        <div className="app__container ">
            <AuthProvider>
                <ThemeProvider theme={createTheme(themeOptions)}>
                    <Routes>
                        <Route path={StringResource.Routes.Root} element={<Layout />}>
                            <Route
                                index
                                element={<MainView />}
                            />
                            <Route path={`${StringResource.Routes.RecipeManagement}/*`} element={<ProtectedRoute><RecipeManagement /></ProtectedRoute>} />
                            <Route path={`${StringResource.Routes.WeeklySchedule}/*`} element={<ProtectedRoute><WeeklyScheduleView /></ProtectedRoute>} />
                            <Route path={`${StringResource.Routes.UserManagement}/*`} element={<ProtectedRoute requireAdmin><UserManagement /></ProtectedRoute>} />
                            <Route path={`${StringResource.Routes.UserSession}/*`} element={<ProtectedRoute><UserSession /></ProtectedRoute>} />
                            <Route path={`${StringResource.Routes.About}/*`} element={<AboutView />} />
                        </Route>
                        <Route path={StringResource.Routes.Any} element={<p>{StringResource.Messages.NoContent}</p>} />
                    </Routes>
                </ ThemeProvider>
            </AuthProvider>
        </div>
    )
}

export default App