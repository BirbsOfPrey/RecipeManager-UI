import { render, screen } from '@testing-library/react'
import { PersonAmountField } from '../../../components/controls/PersonAmountField'

const mockSetValue = jest.fn()
const mockSetViewValue = jest.fn()

test('renders textfield of person amount correct', () => {
    // Arrange
    const personAmount: number = 4

    // Act
    const { container } = render(<PersonAmountField personAmount={personAmount} setValue={mockSetValue} setViewValue={mockSetViewValue} editable={false} />)

    // Assert
    expect(screen.getByDisplayValue(personAmount)).toBeInTheDocument()

    const elements = container.getElementsByClassName("personAmountField__refAmount")
    expect(elements.length).toBe(1)
})