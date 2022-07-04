import { Component } from 'react'
import { Routes, Route } from 'react-router-dom'
import { MainView } from './pages/MainView'
import { RecipeManagement } from './pages/RecipeManagement'
import { RecipeForm } from './pages/RecipeForm'
import { Copyright } from './widgets/Copyright'
import './App.css'
import StringResource from '../resources/StringResource'

export class App extends Component {
  
  render() {
    return (
      <div className={"app__container "}>
        <main>
          <Routes>
            <Route path={StringResource.Routes.Root} element={<MainView />} />
            <Route path={StringResource.Routes.RecipeManagement} element={<RecipeManagement />} />
            <Route path={StringResource.Routes.NewRecipe} element={<RecipeForm />} />
            <Route path={StringResource.Routes.Any} element={<p>{StringResource.Messages.NoContent}</p>} />
          </Routes>
        </main>
        <Copyright />
      </div>
    )
  }
}

export default App