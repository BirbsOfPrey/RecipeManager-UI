import { RecipeValidator } from "../models/RecipeValidator"

namespace StringResource {
    export namespace Routes {
        export const Root: string = '/'
        export const RecipeManagement: string = 'recipemanagement'
        export const Recipe: string = 'recipe'
        export const RecipeId: string = ':recipeId'
        export const WeeklySchedule: string = 'weeklyschedule'
        export const Any: string = '*'
    }
    export namespace Queries {
        export const Edit: string = 'edit'
        export const EditOnValue: string = '1'
        export const EditOn: string = `${Edit}=${EditOnValue}`
    }
    export namespace Messages {
        export const GeneralError: string = 'Es ist ein Fehler aufgetreten!'
        export const NoRecipesToDisplay: string = 'Es wurden keine Rezepte zur Darstellung gefunden!'
        export const RecipeNotFound: string = 'Rezept nicht gefunden. Berechtigung fehlt oder Rezept existiert nicht.'
        export const ScheduledRecipeNotFound: string = 'Terminiertes Rezept nicht gefunden. Berechtigung fehlt oder terminiertes Rezept existiert nicht.'
        export const NoContent: string = 'Hier ist nichts vorhanden!'
        export const RequiredRecipeName: string = 'Ein Rezeptname ist erforderlich'
        export const RequiredIngredientName: string = 'Ein Zutatenname ist erforderlich'
        export const RequiredIngredientComponentAmount: string = 'Eine Menge ist erforderlich'
        export const InvalidPersonAmount: string = `Anzahl muss im Bereich ${RecipeValidator.minPersonRefAmount} - ${RecipeValidator.maxPersonRefAmount} liegen`
    }
    export namespace General {
        export const RecipeManagement: string = 'Verwaltung Rezepte'
        export const RecipeName: string = 'Rezeptname'
        export const RecipeId: string = 'Rezept-Id'
        export const RecipeList: string = 'Rezepte-Liste'
        export const RecipePerson: string = 'Personen'
        export const RecipeSteps: string = 'Schritte'
        export const Ingredients: string = 'Zutaten'
        export const Ingredient: string = 'Zutat'
        export const Save: string = 'Speichern'
        export const CreateNewRecipe: string = 'Neues Rezept erstellen'
        export const CreateRecipe: string = 'Rezept erstellen'
        export const AddIngredient: string = 'Weitere Zutat hinzufügen'
        export const NoIngredients: string = 'Keine Zutaten definiert'
        export const NoScheduledRecipes: string = 'Keine terminierten Rezepte vorhanden'
        export const WeeklySchedule: string = 'Wochenplan'
        export const Monday: string = 'Montag'
        export const Tuesday: string = 'Dienstag'
        export const Wednesday: string = 'Mittwoch'
        export const Thursday: string = 'Donnerstag'
        export const Friday: string = 'Freitag'
        export const Saturday: string = 'Samstag'
        export const Sunday: string = 'Sonntag'
        export const Unknown: string = 'Unbekannt'
    }
    export const Copyright: string = '\u00A9 2022 - Adrian Zigerlig, Silvan Wirz'
}

export default StringResource;