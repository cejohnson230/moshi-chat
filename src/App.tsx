import React, { useState } from 'react';
import ChatWindow from './components/ChatWindow';
import { useAdvertisersDataSet } from './hooks/useAdvertisersDataSet';
import ProductDisplay from './components/ProductDisplay';

const App: React.FC = () => {
  const { dataSets, activeDataSet, setActiveDataSetById } = useAdvertisersDataSet();
  const [showChat, setShowChat] = useState(false);

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '20px'
    }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {showChat ? (
          <ChatWindow onBack={() => setShowChat(false)} />
        ) : (
          <ProductDisplay
            imageUrl={activeDataSet.adContent.imageUrl}
            originalPrice={activeDataSet.productDetails.originalPrice}
            discountAmount={activeDataSet.productDetails.discountAmount || 0}
            dataSets={dataSets}
            activeDataSetId={activeDataSet.id}
            onDataSetChange={setActiveDataSetById}
            onChatClick={() => setShowChat(true)}
          />
        )}
      </div>
    </div>
  );
};

export default App; 