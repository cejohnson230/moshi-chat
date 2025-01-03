import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ChatWindow from '../../components/ChatWindow/index';
import { useChat } from '../../hooks/useChat';
import { useBrandData } from '../../hooks/useBrandData';
import { AdvertisersDataSetProvider } from '../../hooks/useAdvertisersDataSet';
import { UserProvider } from '../../contexts/UserContext';
import '@testing-library/jest-dom';


// Mock the hooks
jest.mock('../../hooks/useChat');
jest.mock('../../hooks/useBrandData');
jest.mock('../../constants', () => ({
  API_BASE_URL: 'http://localhost:3000',
}));

describe('ChatWindow Component', () => {
  const mockOnBack = jest.fn();
  const mockGenerateBotResponse = jest.fn();
  const mockSetMessages = jest.fn();
  const mockSetActiveBrandById = jest.fn();
  
  // Create a wrapper component with all required providers
  const renderWithProviders = (ui: React.ReactElement) => {
    return render(
      <UserProvider>
        <AdvertisersDataSetProvider>
          {ui}
        </AdvertisersDataSetProvider>
      </UserProvider>
    );
  };

  beforeEach(() => {
    // Reset all mocks
    jest.clearAllMocks();
    
    // Mock useChat hook
    (useChat as jest.Mock).mockReturnValue({
      messages: [],
      isTyping: false,
      generateBotResponse: mockGenerateBotResponse,
      setMessages: mockSetMessages
    });

    // Mock useBrandData hook
    (useBrandData as jest.Mock).mockReturnValue({
      activeBrand: {
        name: 'Test Brand',
        iconUrl: 'test-icon.png'
      },
      setActiveBrandById: mockSetActiveBrandById
    });
  });

  test('renders chat window with navigation bar', () => {
    renderWithProviders(<ChatWindow onBack={mockOnBack} />);
    
    expect(screen.getByTestId('chat-window')).toBeInTheDocument();
    expect(screen.getByText('Test Brand')).toBeInTheDocument();
  });

  test('handles sending a message', async () => {
    renderWithProviders(<ChatWindow onBack={mockOnBack} />);
    
    const input = screen.getByPlaceholderText(/message/i);
    const sendButton = screen.getByRole('button', { name: /send/i });

    // Type a message
    fireEvent.change(input, { target: { value: 'Hello' } });
    
    // Send the message
    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(mockSetMessages).toHaveBeenCalled();
      expect(mockGenerateBotResponse).toHaveBeenCalledWith('Hello');
    });
    
    // Input should be cleared
    expect(input).toHaveValue('');
  });

  test('handles sending message with Enter key', () => {
    renderWithProviders(<ChatWindow onBack={mockOnBack} />);
    
    const input = screen.getByPlaceholderText(/message/i);
    fireEvent.change(input, { target: { value: 'Hello' } });
    fireEvent.keyPress(input, { key: 'Enter', code: 13, charCode: 13 });

    expect(mockSetMessages).toHaveBeenCalled();
  });

  test('displays typing indicator when isTyping is true', () => {
    (useChat as jest.Mock).mockReturnValue({
      messages: [],
      isTyping: true,
      generateBotResponse: mockGenerateBotResponse,
      setMessages: mockSetMessages
    });

    renderWithProviders(<ChatWindow onBack={mockOnBack} />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  test('displays messages in the chat', () => {
    const mockMessages = [
      { id: '1', text: 'Hello', sender: 'user', timestamp: new Date() },
      { id: '2', text: 'Hi there!', sender: 'bot', timestamp: new Date() }
    ];

    (useChat as jest.Mock).mockReturnValue({
      messages: mockMessages,
      isTyping: false,
      generateBotResponse: mockGenerateBotResponse,
      setMessages: mockSetMessages
    });

    renderWithProviders(<ChatWindow onBack={mockOnBack} />);
    
    expect(screen.getByText('Hello')).toBeInTheDocument();
    expect(screen.getByText('Hi there!')).toBeInTheDocument();
  });
}); 