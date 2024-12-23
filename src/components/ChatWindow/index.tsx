import React, { useState } from 'react';
import { Message as MessageType } from '../../types/chat';
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
  TypingDot,
  Message,
 
} from './styles';

interface ChatWindowProps {
  onBack: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ onBack }) => {
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { messages, isTyping, generateBotResponse, setMessages } = useChat();
  const { activeBrand } = useBrandData();

  const handleSendMessage = async () => {
    setIsLoading(true);
    if (newMessage.trim()) {
      const userMessage: MessageType = {
        id: Date.now().toString(),
        text: newMessage,
        sender: 'user',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, userMessage]);
      setNewMessage('');
      setIsLoading(false);
      await generateBotResponse(newMessage);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div data-testid="chat-window">
    <ChatContainer>
      <NavigationBar 
        onBack={onBack}
        brandName={activeBrand?.name || ''}
        brandLogo={activeBrand?.iconUrl || ''}
      />
      <MessagesContainer>
        {messages.map((message: MessageType) => (
          <Message
            key={message.id}
            isSender={message.sender === 'user'}
          >
            <MessageContent text={message.text} />
          </Message>
        ))}
        {isTyping && (
          <TypingIndicator role="status">
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
    </div>
  );
};

export default ChatWindow; 