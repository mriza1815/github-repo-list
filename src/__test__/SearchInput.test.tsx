import { render, screen, act } from '@testing-library/react';
import SearchInput from '../components/SearchInput/SearchInput';

// Mock timer
jest.useFakeTimers();

describe('SearchInput', () => {

    const mockProps = {
        searchKeyword: "",
        onChangeSearchKeyword: jest.fn(),
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    afterEach(() => {
        jest.clearAllTimers();
    });

    it('renders search input with initial value from props', () => {
        render(
            <SearchInput {...mockProps} searchKeyword="Tetris" />
        );

        const input = screen.getByTestId('search-input');
        expect(input).toBeInTheDocument();
        expect(input).toHaveValue('Tetris');
    });

    it('renders search icon', () => {
        render( <SearchInput {...mockProps} />);

        const svg = document.querySelector('svg');
        expect(svg).toBeInTheDocument();
    });

    it('calls onChangeSearchKeyword after user stops typing for 800ms', () => {
        render(<SearchInput {...mockProps} />);

        const input = screen.getByTestId('search-input');
        
        // Simulate typing
        act(() => {
            input.setAttribute('value', 'test-search');
            input.dispatchEvent(new Event('change', { bubbles: true }));
        });

        // Verify the callback hasn't been called yet
        expect(mockProps.onChangeSearchKeyword).not.toHaveBeenCalled();

        // Fast-forward time
        act(() => jest.runAllTimers());

        // Now the callback should have been called
        expect(mockProps.onChangeSearchKeyword).toHaveBeenCalledWith('test-search');
    });

    it('clears previous timeout when user types again quickly', () => {
        render(<SearchInput {...mockProps} />);

        const input = screen.getByTestId('search-input');
        
        // First type
        act(() => {
            input.setAttribute('value', 't');
            input.dispatchEvent(new Event('change', { bubbles: true }));
        });
        
        // Advance timer partially
        act(() => jest.advanceTimersByTime(799));
        
        // Second type
        act(() => {
            input.setAttribute('value', 'test-search');
            input.dispatchEvent(new Event('change', { bubbles: true }));
        });
        
        // Verify callback hasn't been called yet
        expect(mockProps.onChangeSearchKeyword).not.toHaveBeenCalled();
        
        // Complete the timer
        act(() => jest.runAllTimers());
        
        // Verify callback was called once with final value
        expect(mockProps.onChangeSearchKeyword).toHaveBeenCalledTimes(1);
        expect(mockProps.onChangeSearchKeyword).toHaveBeenCalledWith('test-search');
    });
});