import React from 'react';
import { useAdvertisersDataSet } from '../../hooks/useAdvertisersDataSet';
import {
  LinkPreviewWrapper,
  PreviewImage,
  PreviewContent,
  PreviewTitle,
  PreviewDescription,
} from './styles';

interface MessageContentProps {
  text: string;
}

export const MessageContent: React.FC<MessageContentProps> = ({ text }) => {
    const { activeDataSet } = useAdvertisersDataSet();
    const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g;
    const parts = text.split(linkRegex);
    
    if (!text.match(linkRegex)) {
      return <>{text}</>;
    }
  
    const handlePreviewClick = (url: string) => {
      const cleanUrl = url.endsWith('.') ? url.slice(0, -1) : url;
      window.open(cleanUrl, '_blank');
    };

    const cleanText = (text: string) => {
      return text.replace(/^\.\s+/, ''); // Remove leading period and whitespace
    };
  
    return (
      <>
        {parts.map((part, index) => {
          if (index % 3 === 0) {
            return cleanText(part);
          }
          if (index % 3 === 1) {
            const url = parts[index + 1];
            const cleanUrl = url.endsWith('.') ? url.slice(0, -1) : url;
            return (
              <LinkPreviewWrapper key={index} onClick={() => handlePreviewClick(cleanUrl)}>
                <PreviewImage 
                  src={activeDataSet.adContent.imageUrl} 
                  alt={activeDataSet.adContent.caption}
                />
                <PreviewContent>
                  <PreviewTitle>{activeDataSet.brandId}</PreviewTitle>
                  <PreviewDescription>{part}</PreviewDescription>
                </PreviewContent>
              </LinkPreviewWrapper>
            );
          }
          return null;
        })}
      </>
    );
  };
  