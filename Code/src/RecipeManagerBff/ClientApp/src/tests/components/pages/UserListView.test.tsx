import { render, screen } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import { UserListView } from "../../../components/pages/UserListView"
import StringResource from "../../../resources/StringResource"

test("renders text of CreateUser button correct", () => {
    // Arrange

    // Act
    render(<BrowserRouter><UserListView /></BrowserRouter>)

    // Assert
    expect(screen.getByText(StringResource.General.CreateUser)).toBeInTheDocument()
})