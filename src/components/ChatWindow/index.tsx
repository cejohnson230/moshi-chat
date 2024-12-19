import React, { useState } from 'react';
import styled from 'styled-components';
import { useAdvertisersDataSet } from '../../hooks/useAdvertisersDataSet';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatContainer = styled.div`
  width: 100%;
  max-width: 400px;
  height: 600px;
  border: 1px solid #dbdbdb;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.colors?.neutral || '#E7E7E7'};
`;

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
`;

const MessageInput = styled.div`
  border-top: 1px solid #dbdbdb;
  padding: 16px;
  background-color: #fff;
  display: flex;
  gap: 8px;
`;

const Input = styled.input`
  flex: 1;
  border: 1px solid #dbdbdb;
  border-radius: 22px;
  padding: 8px 16px;
  outline: none;
`;

const SendButton = styled.button`
  background-color: #FFC4E3;
  color: black;
  border: none;
  border-radius: 22px;
  padding: 8px 16px;
  cursor: pointer;
  
  &:disabled {
    opacity: 0.5;
  }
  
  &:hover {
    background-color: #FFD494;
  }
`;

const Message = styled.div<{ isSender: boolean }>`
  max-width: 70%;
  margin: 8px 0;
  padding: 8px 12px;
  border-radius: 22px;
  align-self: ${props => props.isSender ? 'flex-end' : 'flex-start'};
  background-color: ${props => props.isSender ? '#D9F2FF' : '#A8D9A9'};
  color: black;
  
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  
  border-bottom-right-radius: ${props => props.isSender ? '4px' : '22px'};
  border-bottom-left-radius: ${props => props.isSender ? '22px' : '4px'};
`;

const ChatWindow: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const { activeDataSet } = useAdvertisersDataSet();

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Create user message
      const userMessage: Message = {
        id: Date.now().toString(),
        text: newMessage,
        sender: 'user',
        timestamp: new Date(),
      };
      
      // Create bot message
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: activeDataSet.adContent.caption,
        sender: 'bot',
        timestamp: new Date(),
      };
      
      // Add both messages to the chat
      setMessages([...messages, userMessage, botMessage]);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <ChatContainer>
      <MessagesContainer>
        {messages.map((message) => (
          <Message 
            key={message.id}
            isSender={message.sender === 'user'}
          >
            {message.text}
          </Message>
        ))}
      </MessagesContainer>
      <MessageInput>
        <Input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Message..."
        />
        <SendButton 
          onClick={handleSendMessage}
          disabled={!newMessage.trim()}
        >
          Send
        </SendButton>
      </MessageInput>
    </ChatContainer>
  );
};

export default ChatWindow; 