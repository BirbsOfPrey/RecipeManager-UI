import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { UserView } from '../../../components/pages/UserView'

test('renders UserDetailView correct', () => {
    // Arrange

    // Act
    const { container } = render(<BrowserRouter><UserView /></BrowserRouter>)

    // Assert
    expect(container.getElementsByClassName("userDetailView__container").length).toBe(1)
})