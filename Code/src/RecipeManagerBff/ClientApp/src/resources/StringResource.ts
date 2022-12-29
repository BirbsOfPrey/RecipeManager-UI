import { RecipeImportValidator } from "../models/RecipeImportValidator"
import { RecipeValidator } from "../models/RecipeValidator"
import { UserValidator } from "../models/security/UserValidator"

namespace StringResource {
    export namespace Routes {
        export const Root: string = "/"
        export const RecipeManagement: string = "recipemanagement"
        export const Recipe: string = "recipe"
        export const RecipeId: string = ":recipeId"
        export const IngredientManagement: string = "ingredientmanagement"
        export const Ingredient: string = "ingredient"
        export const IngredientId: string = ":ingredientId"
        export const WeeklySchedule: string = "weeklyschedule"
        export const RecipeImport: string = "recipeimport"
        export const UserManagement: string = "usermanagement"
        export const User: string = "user"
        export const UserId: string = ":userId"
        export const BffLogin: string = "bff/login"
        export const BffLogout: string = "bff/logout"
        export const BffUser: string = "bff/user"
        export const About: string = "about"
        export const Any: string = "*"
    }
    export namespace Queries {
        export const Edit: string = "edit"
        export const EditOnValue: string = "1"
        export const EditOn: string = `${Edit}=${EditOnValue}`
        export const SearchName: string = "name="
    }
    export namespace Messages {
        export const GeneralError: string = "Es ist ein Fehler aufgetreten!"
        export const NoRecipesToDisplay: string = "Es wurden keine Rezepte zur Darstellung gefunden."
        export const RecipeNotFound: string = "Rezept nicht gefunden. Berechtigung fehlt oder Rezept existiert nicht."
        export const ScheduledRecipeNotFound: string = "Kein terminiertes Rezept gefunden, da die Berechtigung fehlt."
        export const NoContent: string = "Hier ist nichts vorhanden!"
        export const RequiredRecipeName: string = "Ein Rezeptname ist erforderlich"
        export const RequiredIngredientName: string = "Ein Zutatenname ist erforderlich"
        export const RequiredIngredientComponentAmount: string = "Eine Menge ist erforderlich"
        export const InvalidPersonAmount: string = `Anzahl muss im Bereich ${RecipeValidator.minPersonRefAmount} - ${RecipeValidator.maxPersonRefAmount} liegen`
        export const DeleteScheduledRecipeQuestion: string = "Terminiertes Rezept löschen?"
        export const DeleteScheduledRecipeContent: string = "Das terminierte Rezept wird gelöscht"
        export const DeleteRecipeQuestion: string = "Rezept löschen?"
        export const DeleteRecipeContent: string = "Das Rezept wird gelöscht. Wenn noch terminierte Rezepte mit diesem Rezept verknüpft sind, werden diese ebenfalls gelöscht."
        export const DeleteUserQuestion: string = "Benutzer löschen?"
        export const DeleteUserContent: string = "Der Benutzer wird gelöscht. Der Benutzer kann sich danach nicht mehr einloggen."
        export const NoRecipeSelected: string = "Kein Rezept ausgewählt"
        export const MaxDescriptionLength: string = `Maximallänge der Beschreibung ist ${RecipeValidator.maxDescriptionLength} Zeichen`
        export const InvalidRecipeFields: string = "Das Rezept enthält ungültige Werte und kann daher nicht gespeichert werden."
        export const RequiredUserName: string = `Erlaubt sind die Zeichen ${UserValidator.allowedChars}`
        export const RequiredPassword: string = `Passwortänge muss mindestens ${UserValidator.minPasswordLength} sein. Es muss aus Zahl, Sonderzeichen, Klein- und Grossbuchstaben bestehen.`
        export const RequiredOldPassword: string = "Altes Passwort zur Verifikation benötigt"
        export const NoUsersToDisplay: string = "Es wurden keine Benutzer gefunden."
        export const UserNotFound: string = "Benutzer nicht gefunden."
        export const InvalidUserFields: string = "Der User enthält ungültige Werte und kann nicht gespeichert werden."
        export const InvalidImportAmount: string = `Anzahl muss im Bereich ${RecipeImportValidator.minImportAmount} - ${RecipeImportValidator.maxImportAmount} liegen`
        export const NoRecipesImported: string = "Es wurden keine Rezepte importiert. (Ursache: Die gefundenen Rezepte sind bereits vorhanden oder deren Format war nicht passend)"
        export const RecipeImportError: string = "Import fehlgeschlagen oder Berechtigung fehlt."
        export const NoIngredientsToDisplay: string = "Es wurden keine Zutaten gefunden."
        export const IngredientNotFound: string = "Zutat nicht gefunden."
        export const DeleteIngredientQuestion: string = "Zutat löschen?"
        export const DeleteIngredientContent: string = "Die Zutat wird gelöscht, falls diese in keinem Rezept verwendet wird."
        export const InvalidIngredientFields: string = "Die Zutat enthält ungültige Werte und kann daher nicht gespeichert werden."
        export const DeleteIngredientError: string = "Die Zutat konnte nicht gelöscht werden, da sie noch verwendet wird."
    }
    export namespace General {
        export const AppTitle: string = "RECIPE MANAGER"
        export const RecipeManagement: string = "Rezepte"
        export const RecipeName: string = "Rezeptname"
        export const RecipeId: string = "Rezept-Id"
        export const RecipeDescription: string = "Rezeptbeschreibung"
        export const RecipePerson: string = "Personen"
        export const RecipeRefPerson: string = "Referenzanzahl Personen"
        export const RecipeSteps: string = "Schritte"
        export const RecipeStep: string = "Schritt"
        export const Ingredients: string = "Zutaten"
        export const Ingredient: string = "Zutat"
        export const Save: string = "Speichern"
        export const Cancel: string = "Abbrechen"
        export const Change: string = "Ändern"
        export const Add: string = "Hinzufügen"
        export const EditRecipe: string = "Rezept bearbeiten"
        export const CreateRecipe: string = "Neues Rezept erstellen"
        export const AddIngredient: string = "Zutat hinzufügen"
        export const AddAnotherIngredient: string = "Weitere Zutat hinzufügen"
        export const NewIngredient: string = "Neue Zutat erfassen"
        export const NoIngredients: string = "Keine Zutaten definiert"
        export const NoScheduledRecipes: string = "Keine terminierten Rezepte vorhanden"
        export const NoRecipeName: string = "Kein Name"
        export const NoRecipeDescription: string = "Keine Beschreibung"
        export const DefineIngredientComponent: string = "Wählen Sie die Zutat und die gewünschte Menge für das Rezept"
        export const NoSteps: string = "Keine Schritte definiert"
        export const AddStep: string = "Schritt hinzufügen"
        export const StepInstruction: string = "Beschreiben Sie die Tätigkeiten von diesem Schritt"
        export const WeeklySchedule: string = "Wochenplan"
        export const Delete: string = "Löschen"
        export const SelectedRecipe: string = "Rezept für "
        export const SelectNewDate: string = "Neues Datum auswählen"
        export const Session: string = "Sitzung"
        export const About: string = "Über"
        export const Login: string = "Login"
        export const Logout: string = "Logout"
        export const ShowSelectedWeek: string = "Woche vom "
        export const SelectRecipe: string = "Wählen Sie das Rezept"
        export const UserManagement: string = "Benutzer"
        export const User: string = "Benutzer"
        export const UserView: string = "Benutzeransicht"
        export const CreateUser: string = "Benutzer erstellen"
        export const CreateNewUser: string = "Neuen Benutzer erstellen"
        export const EditUser: string = "Benutzer bearbeiten"
        export const SelectUser: string = "Wählen Sie den Benutzer"
        export const UserName: string = "Benutzername"
        export const NoUserName: string = "Kein Benutzername"
        export const Role: string = "Rolle"
        export const NoUserRole: string = "Keine Rolle zugewiesen"
        export const OldPassword: string = "Altes Passwort"
        export const NewPassword: string = "Neues Passwort"
        export const FirstName: string = "Vorname"
        export const FamilyName: string = "Nachname"
        export const EMail: string = "E-Mail"
        export const RecipeView: string = "Rezepteansicht"
        export const RecipeImport: string = "Import"
        export const RecipeImportHeader: string = "Rezepteimport von TheMealDB"
        export const RecipeImportButton: string = "Rezepte importieren"
        export const RecipeImportListHeader: string = "Importierte Rezepte"
        export const RecipeImportAmount: string = "Anzahl Rezepte"
        export const ScheduledRecipesToday: string = "Tagesplan"
        export const AdditionalRecipes: string = "Weitere Rezepte"
        export const CreateIngredient: string = "Zutat erstellen"
        export const CreateNewIngredient: string = "Neue Zutat erstellen"
        export const EditIngredient: string = "Zutat bearbeiten"
        export const SelectIngredient: string = "Wählen Sie eine Zutat"
        export const IngredientName: string = "Zutatenname"
        export const NoIngredientName: string = "Kein Zutatenname"
        export const IngredientView: string = "Zutatenansicht"
        export const IngredientManagement: string = "Zutaten"
        export const Search: string = "Suche"
    }
    export const CopyrightHeader: string = "MAS SE 2020-22: Masterarbeit RecipeManager"
    export const Copyright: string = "\u00A9 2022 - Adrian Zigerlig, Silvan Wirz"
}

export default StringResource