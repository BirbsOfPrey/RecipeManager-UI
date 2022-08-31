import { render } from '@testing-library/react'
import { AboutView } from "../../../components/pages/AboutView"

test('renders copyright correct', () => {
    // Arrange

    // Act
    const { container } = render(<AboutView />)

    // Assert
    const linkElementCopyright = container.getElementsByClassName("copyright__container")[0]
    expect(linkElementCopyright).toBeInTheDocument()
})