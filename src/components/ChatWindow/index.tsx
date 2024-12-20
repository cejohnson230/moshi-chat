import React, { useState } from 'react';
import { Message } from '../../types/chat';
import { MessageContent } from '../MessageContent';
import  NavigationBar from '../NavigationBar';
import { useChat } from '../../hooks/useChat';
import { useBrandData } from '../../hooks/useBrandData';
import {
  ChatContainer,
  MessagesContainer,
  MessageInput,
  Input,
  SendButton,
  TypingIndicator,
  TypingDot
} from './styles';

interface ChatWindowProps {
  onBack: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ onBack }) => {
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { messages, isTyping, generateBotResponse } = useChat();
  const { activeBrand } = useBrandData();

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      const userMessage: Message = {
        id: Date.now().toString(),
        text: newMessage,
        sender: 'user',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, userMessage]);
      setNewMessage('');
      setIsLoading(true);

      await generateBotResponse(newMessage);
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <ChatContainer>
      <NavigationBar 
        onBack={onBack}
        brandName={activeBrand?.name || ''}
        brandLogo={activeBrand?.iconUrl || ''}
      />
      <MessagesContainer>
        {messages.map((message) => (
          <Message 
            key={message.id}
            isSender={message.sender === 'user'}
          >
            <MessageContent text={message.text} />
          </Message>
        ))}
        {isTyping && (
          <TypingIndicator>
            <TypingDot />
            <TypingDot />
            <TypingDot />
          </TypingIndicator>
        )}

      </MessagesContainer>
      <MessageInput>
        <Input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Message..."
          disabled={isLoading}
        />
        <SendButton 
          onClick={handleSendMessage}
          disabled={!newMessage.trim() || isLoading}
        >
          {isLoading ? 'Sending...' : 'Send'}
        </SendButton>
      </MessageInput>
    </ChatContainer>
  );
};

export default ChatWindow; 