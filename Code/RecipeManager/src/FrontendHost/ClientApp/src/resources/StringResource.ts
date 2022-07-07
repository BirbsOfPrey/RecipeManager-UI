namespace StringResource {
    export namespace Routes {
        export const Root: string = "/"
        export const RecipeManagement: string = '/recipemanagement'
        export const NewRecipe: string = `/new-recipe`
        export const Any: string = "*"
    }
    export namespace Messages {
        export const GeneralError: string = 'Es ist ein Fehler aufgetreten!'
        export const NoRecipesToDisplay: string = 'Es wurden keine Rezepte zur Darstellung gefunden!'
        export const NoContent: string = 'Hier ist nichts vorhanden!'
    }
    export namespace General {
        export const RecipeManagement: string = 'Verwaltung Rezepte'
        export const CreateNewRecipe: string = 'Neues Rezept erstellen'
        export const RecipeName: string = 'Rezeptname'
        export const RecipeId: string = 'Rezept-Id'
        export const RecipeList: string = 'Rezepte-Liste'
        export const Save: string = 'Speichern'
        export const CreateRecipe: string = 'Rezept erstellen'
    }
    export const Copyright: string = '\u00A9 2022 - Adrian Zigerlig, Silvan Wirz'
}

export default StringResource;