import { RecipeValidators } from "../models/RecipeValidators"

namespace StringResource {
    export namespace Routes {
        export const Root: string = '/'
        export const RecipeManagement: string = 'recipemanagement'
        export const Recipe: string = 'recipe'
        export const RecipeId: string = ':recipeId'
        export const Any: string = '*'
    }
    export namespace Messages {
        export const GeneralError: string = 'Es ist ein Fehler aufgetreten!'
        export const NoRecipesToDisplay: string = 'Es wurden keine Rezepte zur Darstellung gefunden!'
        export const RecipeNotFound: string = 'Rezept nicht gefunden. Berechtigung fehlt oder Rezept existiert nicht.'
        export const NoContent: string = 'Hier ist nichts vorhanden!'
        export const RequiredRecipeName: string = 'Ein Rezeptname ist erforderlich'
        export const InvalidPersonAmount: string = `Anzahl muss im Bereich ${RecipeValidators.minPersonRefAmount} - ${RecipeValidators.maxPersonRefAmount} liegen`
    }
    export namespace General {
        export const RecipeManagement: string = 'Verwaltung Rezepte'
        export const RecipeName: string = 'Rezeptname'
        export const RecipeId: string = 'Rezept-Id'
        export const RecipeList: string = 'Rezepte-Liste'
        export const RecipePerson: string = 'Personen'
        export const RecipeSteps: string = 'Schritte'
        export const Ingredients: string = 'Zutaten'
        export const Save: string = 'Speichern'
        export const CreateNewRecipe: string = 'Neues Rezept erstellen'
        export const CreateRecipe: string = 'Rezept erstellen'
    }
    export const Copyright: string = '\u00A9 2022 - Adrian Zigerlig, Silvan Wirz'
}

export default StringResource;