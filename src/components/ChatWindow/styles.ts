import styled from 'styled-components';

export const ChatContainer = styled.div`
  width: 100%;
  width: 400px;
  height: 600px;
  border: 1px solid #dbdbdb;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.colors?.neutral || '#E7E7E7'};
`;

export const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
`;

export const MessageInput = styled.div`
  border-top: 1px solid #dbdbdb;
  padding: 16px;
  background-color: #fff;
  display: flex;
  gap: 8px;
`;

export const Input = styled.input`
  flex: 1;
  border: 1px solid #dbdbdb;
  border-radius: 22px;
  padding: 8px 16px;
  outline: none;
`;

export const SendButton = styled.button`
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

export const Message = styled.div<{ isSender: boolean }>`
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

export const TypingIndicator = styled.div`
  display: flex;
  gap: 4px;
  padding: 12px 16px;
  align-self: flex-start;
  margin: 8px 0;
`;

export const TypingDot = styled.div`
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