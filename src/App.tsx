import React from 'react';
import ChatWindow from './components/ChatWindow';
import { useAdvertisersDataSet } from './hooks/useAdvertisersDataSet';
import ProductDisplay from './components/ProductDisplay';

const App: React.FC = () => {
  const { dataSets, activeDataSet, setActiveDataSetById } = useAdvertisersDataSet();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
      <select 
        value={activeDataSet.id}
        onChange={(e) => setActiveDataSetById(e.target.value)}
        style={{ marginBottom: '20px', padding: '8px', width: '200px' }}
      >
        {dataSets.map((ds) => (
          <option key={ds.id} value={ds.id}>{ds.productDetails.name}</option>
        ))}
      </select>
      <div style={{ display: 'flex', alignItems: 'flex-start' }}>
        <ProductDisplay
          imageUrl={activeDataSet.adContent.imageUrl}
          originalPrice={activeDataSet.productDetails.originalPrice}
          discountAmount={activeDataSet.productDetails.discountAmount || 0}
        />
        <ChatWindow />
      </div>
    </div>
  );
};

export default App; 