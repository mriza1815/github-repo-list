import { Dropdown } from '@/components';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Dropdown Component', () => {
    const mockList: { value: 'stars' | 'forks' | 'updated'; name: string }[] = [
        { value: 'stars', name: 'Stars' },
        { value: 'forks', name: 'Forks' },
        { value: 'updated', name: 'Last Updated' }
    ];    

    const mockOnSelectItem = jest.fn();

    const defaultProps = {
        list: mockList,
        onSelectItem: mockOnSelectItem,
        sortBy: 'stars'
    }

    const openDropdown = async () => {
        const button = screen.getByTestId('menu-button');
        await userEvent.click(button);
    };

    const checkMenuIsOpen = async () => {
        const menu = screen.getByTestId('menu-div');
        const isOpen = menu.getAttribute('data-testopen');
        expect(isOpen).toBeTruthy();
        //expect(menu).toHaveClass("isOpen");
    };

    beforeEach(() => {
        mockOnSelectItem.mockClear();
    });

    it('renders dropdown button with "Sort By" text', () => {
        
        render( <Dropdown {...defaultProps} />);
        expect(screen.getByText('Sort By')).toBeInTheDocument();
    });

    it('shows dropdown menu when button is clicked', async () => {
        render(
        <Dropdown
            list={mockList}
            onSelectItem={mockOnSelectItem}
            sortBy="stars"
        />
        );

        await openDropdown();
        await checkMenuIsOpen();
    });

    it('renders all menu items correctly', async () => {
        
        render( <Dropdown {...defaultProps} />);
        await openDropdown();

        mockList.forEach(item => {
        expect(screen.getByText(item.name)).toBeInTheDocument();
        });
    });

    it('calls onSelectItem with correct value when menu item is clicked', async () => {
        
        render( <Dropdown {...defaultProps} />);

        await openDropdown();

        const forksOption = screen.getByText('Forks');
        await userEvent.click(forksOption);

        expect(mockOnSelectItem).toHaveBeenCalledWith('forks');
    });

    it('highlights default selected item', async () => {
        render( <Dropdown {...defaultProps} />);

        await openDropdown();

        const selectedItem = screen.getByText('Stars');
        const isActive = selectedItem.getAttribute('data-testactive');
        expect(isActive).toBeTruthy();
        //expect(selectedItem).toHaveClass('active');
    });

    it('handles empty list gracefully', () => {
        render(
        <Dropdown
            list={[]}
            onSelectItem={mockOnSelectItem}
            sortBy="stars"
        />
        );

        const button = screen.getByTestId('menu-button');
        const menu = screen.getByTestId('menu-div');
        
        expect(button).toBeInTheDocument();
        expect(menu).toBeInTheDocument();
    });

});