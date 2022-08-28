import { render, screen } from '@testing-library/react'
import { EmptyListItem } from '../../../components/widgets/EmptyListItem'

const emptyText: string = "Leerer Eintrag"

test('renders empty text', () => {
    // Arrange

    // Act
    render(<EmptyListItem icon={undefined} text={emptyText}/>)

    // Assert
    const linkElementEmptyText = screen.getByText(emptyText)
    expect(linkElementEmptyText).toBeInTheDocument()
})
