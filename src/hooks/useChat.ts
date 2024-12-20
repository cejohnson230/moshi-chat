import { useState, useCallback } from 'react';
import { Message, ChatMessage } from '../types/chat';
import { useAdvertisersDataSet } from './useAdvertisersDataSet';

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const { activeDataSet } = useAdvertisersDataSet();
  
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      role: 'system',
      content: `You are a helpful shopping assistant representing ${activeDataSet.brandId}...`
    }
  ]);

  const generateBotResponse = useCallback(async (userMessage: string) => {
    // ... existing generateBotResponse logic ...
  }, [chatHistory, activeDataSet]);

  return {
    messages,
    isTyping,
    chatHistory,
    generateBotResponse,
    setMessages,
    setChatHistory
  };
}; 