import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { MainView } from '../../../components/pages/MainView'
import StringResource from '../../../resources/StringResource'

test('renders text of RecipeManagement button correct', () => {
    // Arrange

    // Act
    render(<BrowserRouter><MainView /></BrowserRouter>)

    // Assert
    expect(screen.getByText(StringResource.General.RecipeManagement)).toBeInTheDocument()
})

test('renders text of WeeklySchedule button correct', () => {
    // Arrange

    // Act
    render(<BrowserRouter><MainView /></BrowserRouter>)

    // Assert
    expect(screen.getByText(StringResource.General.WeeklySchedule)).toBeInTheDocument()
})