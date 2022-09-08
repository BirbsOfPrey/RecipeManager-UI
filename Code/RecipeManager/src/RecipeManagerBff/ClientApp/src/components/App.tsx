import { Routes, Route } from 'react-router-dom'
import { MainView } from './pages/MainView'
import { UserSession } from "./pages/UserSession"
import { Layout } from './Layout'
import { RecipeManagement } from './pages/RecipeManagement'
import { WeeklyScheduleView } from './pages/WeeklyScheduleView'
import { AboutView } from './pages/AboutView'
import { AuthProvider } from './AuthProvider'
import { ProtectedRoute } from './ProtectedRoute'
import { createTheme, ThemeOptions, ThemeProvider } from '@mui/material/styles'
import StringResource from '../resources/StringResource'
import './App.css'

const themeOptions: ThemeOptions = {
    palette: {
        mode: 'light',
        primary: {
            main: '#4caf50',
        },
        secondary: {
            main: '#66bb6a',
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