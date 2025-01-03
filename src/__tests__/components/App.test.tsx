import { render, screen, fireEvent } from '@testing-library/react';
import App from '../../App';
import { useAdvertisersDataSet } from '../../hooks/useAdvertisersDataSet';
import { UserProvider } from '../../contexts/UserContext';
import '@testing-library/jest-dom';

// Mock the custom hook
jest.mock('../../hooks/useAdvertisersDataSet');

jest.mock('../../constants', () => ({
  API_BASE_URL: 'http://localhost:3000',
}));

const mockDataSet = {
    id: '1',
    brandId: 'test-brand',
    productDetails: {
      name: 'Product 1',
      originalPrice: 100,
      discountAmount: 20,
      description: 'Product 1 description',
      variants: ['Variant 1', 'Variant 2']
    },
    adContent: {
      imageUrl: 'test-image-1.jpg',
      callToAction: 'Chat Now',
      caption: 'Product 1',
      checkoutUrl: 'https://test-checkout-url-1.com'
    }
  };

const mockDataSets = [mockDataSet];

describe('App Component', () => {
  beforeEach(() => {
    // Setup mock implementation for the hook
    (useAdvertisersDataSet as jest.Mock).mockReturnValue({
      dataSets: mockDataSets,
      activeDataSet: mockDataSet,
      setActiveDataSetById: jest.fn(),
    });

  });

  // Wrap the render function to include the UserProvider
  const renderWithProviders = (ui: React.ReactElement) => {
    return render(
      <UserProvider>
        {ui}
      </UserProvider>
    );
  };

  test('renders ProductDisplay by default', () => {
    renderWithProviders(<App />);
    
    // Check if the image is rendered
    expect(screen.queryByAltText('Product')).toBeInTheDocument();
    

    // Check if price information is displayed
    expect(screen.getByText(/Now available for/)).toBeInTheDocument();
  });

  test('switches to ChatWindow when chat button is clicked', () => {
    renderWithProviders(<App />);
    
    // Updated to match the actual button text
    const chatButton = screen.getByRole('button', { name: /chat now/i });
    fireEvent.click(chatButton);
    
    // Verify ChatWindow is rendered
    expect(screen.getByTestId('chat-window')).toBeInTheDocument();
  });

  test('returns to ProductDisplay when back button is clicked in chat', () => {
    renderWithProviders(<App />);
    
    // Updated to match the actual button text
    const chatButton = screen.getByRole('button', { name: /chat now/i });
    fireEvent.click(chatButton);
    
    // Click back button
    const backButton = screen.getByRole('button', { name: /back/i });
    fireEvent.click(backButton);
    
    // Verify ProductDisplay is shown again
    expect(screen.queryByAltText('Product')).toBeInTheDocument();
  });
}); 