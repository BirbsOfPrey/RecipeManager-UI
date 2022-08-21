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
        export const DeleteScheduledRecipeQuestion: string = 'Terminiertes Rezept löschen?'
        export const DeleteScheduledRecipeContent: string = 'Das terminierte Rezept wird gelöscht'
        export const NoRecipeSelected: string = 'Kein Rezept ausgewählt'
        export const MaxDescriptionLength: string = `Maximallänge der Beschreibung ist ${RecipeValidator.maxDescriptionLength} Zeichen`
        export const InvalidRecipeFields: string = 'Das Rezept enthält ungültige Werte und kann daher nicht gespeichert werden.'
    }
    export namespace General {
        export const AppTitle: string = 'RECIPE MANAGER'
        export const RecipeManagement: string = 'Rezepte'
        export const RecipeName: string = 'Rezeptname'
        export const RecipeId: string = 'Rezept-Id'
        export const RecipeDescription: string = 'Rezeptbeschreibung'
        export const RecipeList: string = 'Rezepte-Liste'
        export const RecipePerson: string = 'Personen'
        export const RecipeSteps: string = 'Schritte'
        export const RecipeStep: string = 'Schritt'
        export const Ingredients: string = 'Zutaten'
        export const Ingredient: string = 'Zutat'
        export const Save: string = 'Speichern'
        export const Cancel: string = 'Abbrechen'
        export const Change: string = 'Ändern'
        export const Add: string = 'Hinzufügen'
        export const CreateNewRecipe: string = 'Neues Rezept erstellen'
        export const CreateRecipe: string = 'Rezept erstellen'
        export const AddIngredient: string = 'Zutat hinzufügen'
        export const AddAnotherIngredient: string = 'Weitere Zutat hinzufügen'
        export const NoIngredients: string = 'Keine Zutaten definiert'
        export const NoScheduledRecipes: string = 'Keine terminierten Rezepte vorhanden'
        export const NoRecipeName: string = 'Kein Name'
        export const NoRecipeDescription: string = 'Keine Beschreibung'
        export const DefineIngredientComponent: string = 'Wählen Sie die Zutat und die gewünschte Menge für das Rezept'
        export const NoSteps: string = 'Keine Schritte definiert'
        export const AddStep: string = 'Schritt hinzufügen'
        export const StepInstruction: string = 'Beschreiben Sie die Tätigkeiten von diesem Schritt'
        export const WeeklySchedule: string = 'Wochenplan'
        export const Delete: string = 'Löschen'
        export const SelectedRecipe: string = 'Ausgewähltes Rezept'
        export const SelectNewDate: string = 'Neues Datum auswählen'
    }
    export const Copyright: string = '\u00A9 2022 - Adrian Zigerlig, Silvan Wirz'
}

export default StringResource;