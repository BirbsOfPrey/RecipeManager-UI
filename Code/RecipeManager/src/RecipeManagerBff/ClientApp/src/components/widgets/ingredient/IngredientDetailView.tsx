import LoadingButton from "@mui/lab/LoadingButton"
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, LinearProgress, Paper, Typography } from "@mui/material"
import SaveIcon from "@mui/icons-material/Save"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import Edit from "@mui/icons-material/Edit"
import VisibilityIcon from "@mui/icons-material/Visibility"
import DeleteIcon from "@mui/icons-material/Delete"
import { Component } from "react"
import { Link, NavigateFunction } from "react-router-dom"
import { createDefaultHeader, IngredientsUrl } from "../../../resources/Api"
import StringResource from "../../../resources/StringResource"
import { IngredientEdit } from "./IngredientEdit"
import "./IngredientDetailView.css"
import { createIngredient, Ingredient } from "../../../models/Ingredient"
import { IngredientValidator } from "../../../models/IngredientValidator"

interface IProps {
    ingredientId?: string
    editable?: boolean
    navigate: NavigateFunction
}

interface IState {
    redirect: boolean
    saved: boolean
    ingredient: Ingredient
    loading: boolean
    saving: boolean
    openDeleteConfirmDialog: boolean
    error: string
}

export class IngredientDetailView extends Component<IProps, IState> {
    state: IState = {
        redirect: false,
        saved: true,
        ingredient: createIngredient(),
        loading: false,
        saving: false,
        openDeleteConfirmDialog: false,
        error: ""
    }

    async componentDidMount() {
        if (this.props.ingredientId) {
            await this.fetchIngredient(this.props.ingredientId)
        }
    }

    fetchIngredient = async (id: string) => {
        this.setState({ loading: true })
        const response = await fetch(`${IngredientsUrl}/${id}`, {
            headers: createDefaultHeader()
        })
        if (response.status >= 300) {
            this.setState({ error: StringResource.Messages.IngredientNotFound, loading: false })
        } else {
            const ingredient: Ingredient = await response.json()
            this.setState({ error: "", loading: false, ingredient: ingredient })
        }
    }

    update = (property: string, value: string) => {
        var ingredientToUpdate = { ...this.state.ingredient, [property]: value }
        this.setState({ ingredient: ingredientToUpdate, saved: false })
    }

    requestToDeleteIngredient = () => {
        this.setState({ openDeleteConfirmDialog: true })
    }

    deleteIngredient = async () => {
        const response = await fetch(`${IngredientsUrl}/${this.state.ingredient.id}`, {
            method: "delete",
            headers: createDefaultHeader()
        })

        if (response.status === 409) {
            this.setState({ error: StringResource.Messages.DeleteIngredientError })
        } else if (response.status >= 300) {
            this.setState({ error: StringResource.Messages.GeneralError })
        } else {
            this.setState({ error: "", redirect: true })
        }

        this.setState({ openDeleteConfirmDialog: false })
    }

    handleAbort = () => {
        this.setState({ openDeleteConfirmDialog: false })
    }

    save = async () => {
        if (!IngredientValidator.validateName(this.state.ingredient.name)) {
            this.setState({ error: StringResource.Messages.InvalidRecipeFields })
            return
        }

        this.setState({ saving: true })

        const response = await fetch(`${IngredientsUrl}`, {
            method: this.state.ingredient.id ? "put" : "post",
            headers: createDefaultHeader(),
            body: JSON.stringify(this.state.ingredient)
        })

        if (response.status >= 300) {
            this.setState({ error: StringResource.Messages.GeneralError })
        } else {
            const ingredient: Ingredient = await response.json()
            this.setState({ error: "", saved: true, ingredient: ingredient })
        }

        this.setState({ saving: false })
    }

    render() {
        if (this.state.redirect) {
            this.props.navigate(`/${StringResource.Routes.IngredientManagement}`)
        }

        const ingredientRoute: string = `/${StringResource.Routes.IngredientManagement}/${StringResource.Routes.Ingredient}/${this.state.ingredient.id}`
        const { ingredient, loading, error, openDeleteConfirmDialog } = this.state

        return (
            <div className="ingredientDetailView__container">
                {loading ? <LinearProgress /> : <div></div>}
                <Typography
                    className="ingredientDetailView__mainTitle"
                    variant="h6"
                    component="p"
                    sx={{ pb: "5px", mt: "30px" }}>
                    {this.props.editable ? (this.state.ingredient.id ? StringResource.General.EditIngredient : StringResource.General.CreateNewIngredient) : StringResource.General.IngredientView}
                </Typography>

                <Box className="ingredientDetailView__handleButtons">
                    <IconButton component={Link} to={`/${StringResource.Routes.IngredientManagement}`}>
                        <ArrowBackIcon />
                    </IconButton>

                    {this.props.editable ? (
                        <IconButton
                            aria-label="view"
                            className="ingredientDetailView__viewButton"
                            component={Link} to={`${ingredientRoute}`}>
                            <VisibilityIcon />
                        </IconButton>) : (
                        <IconButton
                            aria-label="edit"
                            className="ingredientDetailView__editButton"
                            component={Link} to={`${ingredientRoute}?${StringResource.Queries.EditOn}`}>
                            <Edit />
                        </IconButton>)
                    }
                </Box>

                <Box className="ingredientDetailView__editButtons">
                    {this.props.editable ? (
                        <div>
                            <LoadingButton
                                className="ingredientDetailView__saveButton"
                                variant="outlined"
                                loadingPosition="start"
                                loading={this.state.saving}
                                startIcon={<SaveIcon />}
                                disabled={this.state.saved}
                                onClick={this.save}>{StringResource.General.Save}
                            </LoadingButton>
                            <IconButton
                                aria-label="delete"
                                className="ingredientDetailView__deleteButton"
                                disabled={!this.state.ingredient.id}
                                sx={{ alignSelf: "flex-end" }}
                                onClick={this.requestToDeleteIngredient}>
                                <DeleteIcon />
                            </IconButton>
                        </div>) : <div></div>
                    }
                </Box>

                <Typography
                    className="ingredientDetailView__errorField"
                    variant="subtitle1"
                    component="p"
                    color="error.main"
                    sx={{ mt: "25px" }}>
                    {error}
                </Typography>

                <Paper
                    className="ingredientDetailView__editContent"
                    sx={{ p: "20px" }}>
                    <IngredientEdit
                        ingredient={ingredient}
                        setValue={this.update}
                        editable={this.props.editable}
                    />
                </Paper>

                <Dialog
                    open={openDeleteConfirmDialog}
                    onClose={this.handleAbort}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    className="ingredientDetailView__dialog">
                    <DialogTitle id="alert-dialog-title">
                        {StringResource.Messages.DeleteIngredientQuestion}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {StringResource.Messages.DeleteIngredientContent}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleAbort}>{StringResource.General.Cancel}</Button>
                        <Button onClick={this.deleteIngredient} autoFocus>{StringResource.General.Delete}</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}