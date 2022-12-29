import { render, screen, waitFor } from "@testing-library/react"
import { rest } from "msw"
import { setupServer, SetupServerApi } from "msw/node"
import { UsersUrl } from "../../../../resources/Api"
import { UserList } from "../../../../components/widgets/user/UserList"
import { User } from "../../../../models/security/User"
import { BrowserRouter } from "react-router-dom"
import StringResource from "../../../../resources/StringResource"

const testUser1Id: string = "abc-def-ghi"
const testUser1Name: string = "Franzi"
const testUser2Id: string = "jkl-mno-pqr"
const testUser2Name: string = "Bobby"

let handlers = [
	rest.get(UsersUrl, (_: any, res: (arg0: any) => any, ctx: { json: (arg0: User[]) => any }) => {
		return res(
			ctx.json([
				{ id: testUser1Id, name: testUser1Name },
                { id: testUser2Id, name: testUser2Name }
            ])
		)
	})
]

let emptyHandlers = [
    rest.get(UsersUrl, (_: any, res: (arg0: any) => any, ctx: { json: (arg0: User[]) => any }) => {
        return res(
            ctx.json([])
        )
    })
]

let server: SetupServerApi

afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test("renders correct users in the list", async () => {
    // Arrange
    server = setupServer(...handlers)
    server.listen()

    // Act
    render(<BrowserRouter><UserList /></BrowserRouter>)

    // Assert
    await waitFor(() => {
        expect(screen.getByText(testUser1Name)).toBeInTheDocument
        expect(screen.getByText(testUser2Name)).toBeInTheDocument
        expect(screen.queryByText(StringResource.Messages.NoUsersToDisplay)).not.toBeInTheDocument
        expect(screen.queryByRole("progressbar")).not.toBeInTheDocument
    })
})

test("renders progress bar if users loading", async () => {
    // Arrange

    // Act
    render(<BrowserRouter><UserList /></BrowserRouter>)

    // Assert
    expect(screen.getByRole("progressbar")).toBeInTheDocument
})

test("render as much list items as user are passed", async () => {
    // Arrange
    server = setupServer(...handlers)
    server.listen()

    // Act
    const { container } = render(<BrowserRouter><UserList /></BrowserRouter>)
    
    // Assert
    await waitFor(() => { expect(container.getElementsByClassName("userListItem__container").length).toBe(2) })
})

test("renders no users text correct", async () => {
    // Arrange
    server = setupServer(...emptyHandlers)
    server.listen()

    // Act
    const { container } = render(<BrowserRouter><UserList /></BrowserRouter>)
    
    // Assert
    await waitFor(() => { expect(container.getElementsByClassName("userListItem__container").length).toBe(0) })
    await waitFor(() => { expect(screen.getByText(StringResource.Messages.NoUsersToDisplay)).toBeInTheDocument })
})
