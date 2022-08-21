import { Component } from 'react'
import { Routes, Route } from 'react-router-dom'
import { MainView } from './pages/MainView'
import { UserSession } from "./pages/UserSession"
import { Layout } from './Layout'
import { RecipeManagement } from './pages/RecipeManagement'
import { WeeklyScheduleView } from './pages/WeeklyScheduleView'
import StringResource from '../resources/StringResource'
import { ThemeProvider } from '@emotion/react'
import { createTheme, ThemeOptions } from '@mui/material/styles'
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

export class App extends Component {


    render() {
        return (
            <div className={"app__container "}>
                <ThemeProvider theme={createTheme(themeOptions)}>
                    <Routes>
                        <Route path={StringResource.Routes.Root} element={<Layout />}>
                            <Route
                                index
                                element={<MainView />}
                            />
                            <Route path={`${StringResource.Routes.RecipeManagement}/*`} element={<RecipeManagement />} />
                            <Route path={`${StringResource.Routes.WeeklySchedule}/*`} element={<WeeklyScheduleView />} />
                            <Route path="user-session" element={<UserSession />} />
                        </Route>
                        <Route path={StringResource.Routes.Any} element={<p>{StringResource.Messages.NoContent}</p>} />
                    </Routes>
                </ ThemeProvider>
            </div>
        )
    }
}

export default App