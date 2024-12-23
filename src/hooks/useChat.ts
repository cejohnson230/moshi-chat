import { useState, useCallback } from 'react';
import { Message, ChatMessage, OllamaStreamResponse } from '../types/chat';
import { useAdvertisersDataSet } from './useAdvertisersDataSet';

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const { activeDataSet } = useAdvertisersDataSet();
  
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
                Only once the users agrees to purchase the product, give them the checkout link and ask them to click the link below to purchase the product.
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

  return {
    messages,
    isTyping,
    chatHistory,
    generateBotResponse,
    setMessages,
    setChatHistory
  };
}; 