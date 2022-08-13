import { Component } from 'react'
import { Routes, Route } from 'react-router-dom'
import { MainView } from './pages/MainView'
import { UserSession } from "./pages/UserSession"
import { Layout } from './Layout'
import { RecipeManagement } from './pages/RecipeManagement'
import { WeeklyScheduleView } from './pages/WeeklyScheduleView'
import StringResource from '../resources/StringResource'
import './App.css'

export class App extends Component {

    render() {
        return (
            <div className={"app__container "}>
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
            </div>
        )
    }
}

export default App