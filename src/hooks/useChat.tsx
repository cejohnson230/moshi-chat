import { useState, useCallback, useEffect } from 'react';
import { Message, ChatMessage } from '../types/chat';
import { useAdvertisersDataSet } from './useAdvertisersDataSet';
import { useUser } from '../contexts/UserContext';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const { activeDataSet } = useAdvertisersDataSet();
  const { userId } = useUser();

  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);

  // Add effect to reset chat when brandId changes
  useEffect(() => {
    setMessages([]);
    setChatHistory([]);
  }, [activeDataSet?.brandId]);

  const generateBotResponse = useCallback(async (userMessage: string) => {
    setIsTyping(true);

    const updatedHistory: ChatMessage[] = [...chatHistory, { role: 'user', content: userMessage }];
    setChatHistory(updatedHistory);

    try {
      const response = await fetch(`${API_BASE_URL}/openai/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          userId: userId, 
          brandId: activeDataSet.brandId,
          messages: updatedHistory 
        }),
      });

      const data = await response.json();
      const botResponse = data.response;

      // Create and add the bot message
      const botMessage: Message = {
        id: Date.now().toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);

      // Update chat history with bot's response
      setChatHistory(prev => [...prev, {
        role: 'assistant',
        content: botResponse
      }]);

    } catch (error) {
      console.error('Error generating bot response:', error);
      const errorMessage: Message = {
        id: Date.now().toString(),
        text: 'I apologize, but I encountered an error processing your request.',
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  }, [chatHistory]);

  // Add effect to fetch chat history on mount
  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/chat-history?userId=${userId}&brandId=${activeDataSet.brandId}`
        );
        const history = await response.json();

        // Set both the chat history and messages
        setChatHistory([
          {
            role: 'system',
            content: `You are a helpful shopping assistant representing ${activeDataSet.brandId}. 
      Be brief and concise, answering in 2 to 3 sentences. 
                The product being discussed is ${activeDataSet.adContent.caption} 
                with a deal amount of ${activeDataSet.productDetails.discountAmount}% off 
                of the original price of ${activeDataSet.productDetails.originalPrice}.
                The product is available in the following variants: ${activeDataSet.productDetails.variants.join(', ')}.
                You should give the user the price of the product, the variants options, and ask if they would like to purchase the product.
                Only once the users agrees to purchase the product, give them the checkout link and ask them to click the link below to purchase the product.
                The checkout link is ${activeDataSet.adContent.checkoutUrl}
                `
          },
          ...history
        ]);

        // Convert ChatMessages to Message format for display
        const displayMessages = history
          .filter((msg: ChatMessage) => msg.role !== 'system')
          .map((msg: ChatMessage) => ({
            id: Date.now().toString() + Math.random(),
            text: msg.content,
            sender: msg.role === 'user' ? 'user' : 'bot',
            timestamp: new Date(),
          }));

        setMessages(displayMessages);
      } catch (error) {
        console.error('Error fetching chat history:', error);
      }
    };

    if (userId && activeDataSet?.brandId) {
      fetchChatHistory();
    }
  }, [userId, activeDataSet?.brandId]);

  return {
    messages,
    isTyping,
    chatHistory,
    generateBotResponse,
    setMessages,
    setChatHistory
  };
}; 