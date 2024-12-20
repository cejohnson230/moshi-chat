import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { useAdvertisersDataSet } from '../../hooks/useAdvertisersDataSet';
import NavigationBar from '../NavigationBar';
import { useBrandData } from '../../hooks/useBrandData';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface OllamaStreamResponse {
  message?: {
    content: string;
  };
  done: boolean;
}

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
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

const TypingIndicator = styled.div`
  display: flex;
  gap: 4px;
  padding: 12px 16px;
  align-self: flex-start;
  margin: 8px 0;
`;

const TypingDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #A8D9A9;
  animation: typing 1.4s infinite ease-in-out;

  &:nth-child(1) {
    animation-delay: 0s;
  }
  &:nth-child(2) {
    animation-delay: 0.2s;
  }
  &:nth-child(3) {
    animation-delay: 0.4s;
  }

  @keyframes typing {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }
`;

const LinkPreviewWrapper = styled.div`
  margin: 8px 0;
  max-width: 300px;
  border: 1px solid #dbdbdb;
  border-radius: 8px;
  overflow: hidden;
  background: white;
  cursor: pointer;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 160px;
  object-fit: cover;
`;

const PreviewContent = styled.div`
  padding: 12px;
`;

const PreviewTitle = styled.div`
  font-weight: bold;
  margin-bottom: 4px;
`;

const PreviewDescription = styled.div`
  font-size: 0.9em;
  color: #666;
`;

interface ChatWindowProps {
  onBack: () => void;
}

const extractUrls = (text: string): string[] => {
  const urlRegex = /<(https?:\/\/[^\s>]+)>/g;
  const matches = [...text.matchAll(urlRegex)];
  return matches.map(match => match[1]);
};

const MessageContent: React.FC<{ text: string }> = ({ text }) => {
  const { activeDataSet } = useAdvertisersDataSet();
  const urls = extractUrls(text);
  
  if (urls.length === 0) {
    return <>{text}</>;
  }

  const handlePreviewClick = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <>
      {text.split(/<https?:\/\/[^\s>]+>/g).map((part, index) => (
        <React.Fragment key={index}>
          {part}
          {urls[index] && (
            <LinkPreviewWrapper onClick={() => handlePreviewClick(urls[index])}>
              <PreviewImage 
                src={activeDataSet.adContent.imageUrl} 
                alt={activeDataSet.adContent.caption}
              />
              <PreviewContent>
                <PreviewTitle>{activeDataSet.brandId}</PreviewTitle>
                <PreviewDescription>{activeDataSet.adContent.caption}</PreviewDescription>
              </PreviewContent>
            </LinkPreviewWrapper>
          )}
        </React.Fragment>
      ))}
    </>
  );
};

const ChatWindow: React.FC<ChatWindowProps> = ({ onBack }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const { activeDataSet } = useAdvertisersDataSet();
  const { activeBrand } = useBrandData();
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      role: 'system',
      content: `You are a helpful shopping assistant representing ${activeDataSet.brandId}. 
      Be brief and concise, answering in 2 to 3 sentences. 
                The product being discussed is ${activeDataSet.adContent.caption} 
                with a deal amount of ${activeDataSet.productDetails.discountAmount}% off 
                of the original price of ${activeDataSet.productDetails.originalPrice}.
                The product is available in the following variants: ${activeDataSet.productDetails.variants.join(', ')}.
                You should give the user the price of the product, the variants options, and ask if they would like to purchase the product.
                If the users agrees to purchase the product, give them the checkout link and ask them to click the link below to purchase the product.
                The checkout link is ${activeDataSet.adContent.checkoutUrl}
                `
                
    }
  ]);

  const generateBotResponse = useCallback(async (userMessage: string) => {
    setIsTyping(true);
    
    // Add user message to chat history
    const updatedHistory: ChatMessage[] = [...chatHistory, { role: 'user', content: userMessage }];
    setChatHistory(updatedHistory);

    try {
      const response = await fetch('http://localhost:11434/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama2',
          stream: true,
          messages: updatedHistory
        })
      });

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No reader available');

      let accumulatedText = '';
      
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = new TextDecoder().decode(value);
        const lines = chunk.split('\n').filter(line => line.trim());
        
        for (const line of lines) {
          try {
            const data: OllamaStreamResponse = JSON.parse(line);
            if (data.message?.content) {
              accumulatedText += data.message.content;
              
              if (accumulatedText.includes('\n\n')) {
                const paragraphs = accumulatedText.split('\n\n');
                accumulatedText = paragraphs.pop() || '';
                
                for (const paragraph of paragraphs) {
                  if (paragraph.trim()) {
                    const botMessage: Message = {
                      id: Date.now().toString(),
                      text: paragraph.trim(),
                      sender: 'bot',
                      timestamp: new Date(),
                    };
                    setMessages(prev => [...prev, botMessage]);
                  }
                }
              }
            }
          } catch (e) {
            console.error('Error parsing stream chunk:', e);
          }
        }
      }

      // Send any remaining text as the final message
      if (accumulatedText.trim()) {
        const botMessage: Message = {
          id: Date.now().toString(),
          text: accumulatedText.trim(),
          sender: 'bot',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, botMessage]);
        
        // Add bot's response to chat history
        setChatHistory(prev => [...prev, { 
          role: 'assistant', 
          content: accumulatedText.trim() 
        }]);
      }
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
  }, [chatHistory, activeDataSet]);

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