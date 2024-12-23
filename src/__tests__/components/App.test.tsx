import { render, screen, fireEvent } from '@testing-library/react';
import App from '../../App';
import { useAdvertisersDataSet } from '../../hooks/useAdvertisersDataSet';
import '@testing-library/jest-dom';

// Mock the custom hook
jest.mock('../../hooks/useAdvertisersDataSet');

const mockDataSet = {
  id: '1',
  adContent: {
    imageUrl: 'test-image.jpg',
  },
  productDetails: {
    originalPrice: 100,
    discountAmount: 20,
  },
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

  test('renders ProductDisplay by default', () => {
    render(<App />);
    
    // Check if the image is rendered
    expect(screen.getByRole('img')).toBeInTheDocument();
    
    // Check if price information is displayed
    expect(screen.getByText(/100/)).toBeInTheDocument();
  });

  test('switches to ChatWindow when chat button is clicked', () => {
    render(<App />);
    
    // Find and click the chat button
    const chatButton = screen.getByRole('button', { name: /chat/i });
    fireEvent.click(chatButton);
    
    // Verify ChatWindow is rendered
    expect(screen.getByTestId('chat-window')).toBeInTheDocument();
  });

  test('returns to ProductDisplay when back button is clicked in chat', () => {
    render(<App />);
    
    // Navigate to chat
    const chatButton = screen.getByRole('button', { name: /chat/i });
    fireEvent.click(chatButton);
    
    // Click back button
    const backButton = screen.getByRole('button', { name: /back/i });
    fireEvent.click(backButton);
    
    // Verify ProductDisplay is shown again
    expect(screen.getByRole('img')).toBeInTheDocument();
  });
}); 