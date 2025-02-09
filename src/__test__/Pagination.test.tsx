import { render, screen } from '@testing-library/react';
import Pagination from '../components/Pagination/Pagination';

describe('Pagination', () => {
  const mockProps = {
    totalCount: 50,
    currentPage: 1,
    onClickPrev: jest.fn(),
    onClickNext: jest.fn(),
    handleChangePage: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders pagination buttons correctly', () => {
    render(<Pagination {...mockProps} />);

    // Check if all navigation buttons are present
    expect(screen.getByTestId('first-page')).toBeInTheDocument();
    expect(screen.getByTestId('previous-page')).toBeInTheDocument();
    expect(screen.getByTestId('next-page')).toBeInTheDocument();
    expect(screen.getByTestId('last-page')).toBeInTheDocument();

    // Check if page numbers are rendered correctly (1,2 for currentPage = 2)
    expect(screen.getByLabelText('Page 1')).toBeInTheDocument();
    expect(screen.getByLabelText('Page 2')).toBeInTheDocument();
  });

  it('disables first and previous buttons on first page', () => {
    render(
      <Pagination {...mockProps} currentPage={1} />
    );

    expect(screen.getByTestId('first-page')).toBeDisabled();
    expect(screen.getByTestId('previous-page')).toBeDisabled();
    expect(screen.getByTestId('next-page')).not.toBeDisabled();
    expect(screen.getByTestId('last-page')).not.toBeDisabled();
  });

  it('disables next and last buttons on last page', () => {
    render(
      <Pagination {...mockProps} currentPage={4} />
    );

    expect(screen.getByTestId('first-page')).not.toBeDisabled();
    expect(screen.getByTestId('previous-page')).not.toBeDisabled();
    expect(screen.getByTestId('next-page')).toBeDisabled();
    expect(screen.getByTestId('last-page')).toBeDisabled();
  });

  it('applies active class to current page button', () => {
    render(<Pagination {...mockProps} />);
    
    const pageContainer = screen.getByTestId('pagination-container');
    const currentPageButton = pageContainer.getElementsByTagName('button')[2];
    const isActive = currentPageButton.getAttribute('data-testisactive');
    
    expect(isActive).toBeTruthy();
  });
});