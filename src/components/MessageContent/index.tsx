import React from 'react';
import { useAdvertisersDataSet } from '../../hooks/useAdvertisersDataSet';
import { extractUrls } from '../../utils/urlExtractor';
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
  