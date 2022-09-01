import { render } from '@testing-library/react'
import { AboutView } from "../../../components/pages/AboutView"

test('renders copyright correct', () => {
    // Arrange

    // Act
    const { container } = render(<AboutView />)

    // Assert
    expect(container.getElementsByClassName("copyright__container").length).toBe(1)
})