import { Component } from 'react'
import { Routes, Route } from 'react-router-dom'
import { MainView } from './pages/MainView'
import { UserSession } from "./pages/UserSession"
import { Layout } from './Layout'
import { RecipeManagement } from './pages/RecipeManagement'
import { RecipeView } from './pages/RecipeView'
import { RecipeListView } from './pages/RecipeListView'
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
                        <Route path={StringResource.Routes.RecipeManagement} element={<RecipeManagement />}>
                            <Route
                                index
                                element={<RecipeListView />}
                            />
                            <Route path={StringResource.Routes.Recipe} element={<RecipeView />}>
                                <Route path={StringResource.Routes.RecipeId} element={<RecipeView />} />
                            </Route>
                        </Route>
                        <Route path="user-session" element={<UserSession />} />
                    </Route>
                    <Route path={StringResource.Routes.Any} element={<p>{StringResource.Messages.NoContent}</p>} />
                </Routes>
            </div>
        )
    }
}

export default App