import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RadioButton from '../components/RadioGroup/RadioButton';

describe('RadioButton', () => {
  const mockProps = {
    name: 'language',
    value: 'JavaScript',
    selectedLang: 'Python',
    onSelectedLang: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders radio button with correct label', () => {
    render(<RadioButton {...mockProps} />);
    
    const radioInput = screen.getByTestId('radio-input');
    const label = screen.getByText('JavaScript');
    
    expect(radioInput).toBeInTheDocument();
    expect(label).toBeInTheDocument();
  });

  it('is unchecked when value does not match selectedLang', () => {
    render(<RadioButton {...mockProps} />);
    
    const radioInput = screen.getByTestId('radio-input');
    expect(radioInput).not.toBeChecked();
  });

  it('is checked when value matches selectedLang', () => {
    render(
      <RadioButton
        {...mockProps}
        selectedLang="JavaScript"
      />
    );
    
    const radioInput = screen.getByTestId('radio-input');
    expect(radioInput).toBeChecked();
  });

  it('calls onSelectedLang when clicked', async () => {
    render(<RadioButton {...mockProps} />);
    
    const radioInput = screen.getByTestId('radio-input');
    await userEvent.click(radioInput);
    
    expect(mockProps.onSelectedLang).toHaveBeenCalledTimes(1);
  });

  it('has correct name attribute', () => {
    render(<RadioButton {...mockProps} />);
    
    const radioInput = screen.getByTestId('radio-input');
    expect(radioInput).toHaveAttribute('name', 'language');
  });

  it('has correct value attribute', () => {
    render(<RadioButton {...mockProps} />);
    
    const radioInput = screen.getByTestId('radio-input');
    expect(radioInput).toHaveAttribute('value', 'JavaScript');
  });
});