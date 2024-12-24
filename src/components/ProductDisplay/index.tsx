import { AdvertisersDataSet } from '../../hooks/useAdvertisersDataSet';
import { useBrandData } from '../../hooks/useBrandData';
import { styles } from './styles';
import { FaLink, FaEllipsisH } from 'react-icons/fa';
import React from 'react';
interface ProductDisplayProps {
    imageUrl: string;
    originalPrice: number;
    discountAmount: number;
    dataSets: AdvertisersDataSet[];
    activeDataSetId: string;
    onDataSetChange: (id: string) => void;
    onChatClick: () => void;
}

const ProductDisplay: React.FC<ProductDisplayProps> = ({ imageUrl, originalPrice, discountAmount, dataSets, activeDataSetId, onDataSetChange, onChatClick }) => {
    const discountedPrice = originalPrice * (1 - discountAmount / 100);
    const activeDataSet = dataSets.find(ds => ds.id === activeDataSetId);
    const brandInfo = useBrandData();
    return (
        <div>
            <div style={styles.container}>
            <div style={styles.selectContainer as React.CSSProperties}>
                    <select
                        value={activeDataSetId}
                        onChange={(e) => onDataSetChange(e.target.value)}
                        style={styles.select as React.CSSProperties}
                    >
                        {dataSets.map((dataSet) => (
                            <option key={dataSet.id} value={dataSet.id}>
                                {dataSet.productDetails.name}
                            </option>
                        ))}
                    </select>
                    <span style={styles.selectArrow as React.CSSProperties}>▼</span>
                </div>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 0',
                    borderTop: '1px solid #eee',
                    borderBottom: '1px solid #eee',
                    marginBottom: '10px'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <img 
                            src={brandInfo.activeBrand?.iconUrl || ''} 
                            alt="Brand Logo" 
                            style={{ width: '24px', height: '24px', objectFit: 'contain' }}
                        />
                        <span style={{ fontWeight: 500 }}>{brandInfo.activeBrand?.name || 'Brand Name'}</span>
                    </div>
                    <FaEllipsisH style={{ cursor: 'pointer', color: '#666' }} />
                </div>

                <div style={styles.imageContainer as React.CSSProperties}>
                    
                    <img
                        src={imageUrl}
                        alt="Product"
                        style={styles.image}
                    />
                    {activeDataSet?.adContent.callToAction && (
                        <button
                            onClick={onChatClick}
                            style={styles.button}
                        >
                            <FaLink/> {activeDataSet?.adContent.callToAction}
                        </button>
                    )}
                </div>
                { <div>
                    <p style={{ fontSize: '1.2em', fontWeight: 'bold', color: '#e41e31' }}>
                        ${discountedPrice.toFixed(2)}
                        </p>
                    <p>{activeDataSet?.productDetails.description} Now available for {discountAmount}% OFF.</p>
                </div>}
            </div>
        </div>
    );
};

export default ProductDisplay; 