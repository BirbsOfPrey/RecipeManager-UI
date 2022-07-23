import { Component, ReactNode } from "react"
import { Link } from "react-router-dom"
import { getDefaultHeader, RecipesUrl } from "../../resources/Api"
import { Recipe } from "../../models/Recipe"
import "./RecipeCreateAssistant.css"
import StringResource from "../../resources/StringResource"
import { RecipeEditHead } from "../widgets/RecipeEditHead"
import { Button, IconButton, Pagination } from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { RecipeEditIngredients } from "../widgets/RecipeEditIngredients"
import { RecipeEditSteps } from "../widgets/RecipeEditSteps"

interface IState {
    redirect: boolean
    saved: boolean
    recipe: Recipe
    loading: boolean
    error: string
    contentNr: number
}

interface IProps {
    recipeId?: string
    editable?: boolean
}

export class RecipeCreateAssistant extends Component<IProps, IState> {

    state: IState = {
        redirect: false,
        saved: true,
        recipe: new Recipe(),
        loading: false,
        error: '',
        contentNr: 1
    }

    async componentDidMount() {
        if (this.props.recipeId) {
            await this.fetchRecipe(this.props.recipeId)
        }
    }

    setContentNr = (event: React.ChangeEvent<unknown>, value: number) => {
        this.setState({ contentNr: value })
    }

    update = (property: string, value: string) => {
        const updatedRecipe = Object.assign(this.state.recipe, {
            [property]: value
        })
        this.setState({ recipe: updatedRecipe, saved: false })
    }

    fetchRecipe = async (id: string) => {
        this.setState({ loading: true })
        const response = await fetch(`${RecipesUrl}/${id}`, {
            headers: getDefaultHeader()
        })
        if (response.status >= 300) {
            this.setState({ error: StringResource.Messages.RecipeNotFound, loading: false })
        } else {
            const recipe = await response.json()
            this.setState({ loading: false, recipe: recipe })
        }
    }

    save = async () => {
        const response = await fetch(`${RecipesUrl}`, {
            method: this.state.recipe.id ? 'put' : 'post',
            headers: getDefaultHeader(),
            body: JSON.stringify(this.state.recipe)
        })

        if (response.status >= 300) {
            this.setState({ error: StringResource.Messages.GeneralError, loading: false })
        } else {
            const update = await response.json()
            const recipe = Object.assign(this.state.recipe, update)
            this.setState({ redirect: true, recipe, saved: true })
        }
    }

    render() {
        const contents: ReactNode[] = [
            <RecipeEditHead
                recipe={this.state.recipe}
                setValue={this.update}
                editable={this.props.editable}
            />,
            <RecipeEditIngredients
                recipe={this.state.recipe}
                setValue={this.update}
                editable={this.props.editable}
            />,
            <RecipeEditSteps
                recipe={this.state.recipe}
                setValue={this.update}
                editable={this.props.editable}
            />,
        ]

        const content = contents[this.state.contentNr - 1]

        const saveContent = this.props.editable ? <Button className="recipeCreateAssistant__saveButton" disabled={this.state.saved} onClick={() => this.save()}>{StringResource.General.Save}</Button> : <></>

        if (this.state.loading) {
            return <p>Loading...</p>
        } else {
            return (
                <div className="recipeCreateAssistant__container">
                    <IconButton component={Link} to={-1 as any}>
                        <ArrowBackIcon></ArrowBackIcon>
                    </IconButton>
                    <Pagination
                        variant="outlined"
                        count={contents.length}
                        page={this.state.contentNr}
                        onChange={this.setContentNr}
                    />
                    <p className="recipeCreateAssistant__mainTitle">{StringResource.General.CreateNewRecipe}</p>
                    {content}
                    <p className="recipeCreateAssistant__errorField" >{this.state.error}</p>
                    {saveContent}
                </div>
            )
        }
    }
}