import { AdvertisersDataSet } from '../hooks/useAdvertisersDataSet';

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
console.log(dataSets.find(ds => ds.id === activeDataSetId));
    return (
        <div>
            <div style={{
                padding: '20px',
                marginRight: '20px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                width: '300px'
            }}>
                <select
                    value={activeDataSetId}
                    onChange={(e) => onDataSetChange(e.target.value)}
                    style={{ marginBottom: '10px' }}
                >
                    {dataSets.map((dataSet) => (
                        <option key={dataSet.id} value={dataSet.id}>
                            {dataSet.productDetails.name}
                        </option>
                    ))}
                </select>

                <div style={{ position: 'relative' }}>
                    <img
                        src={imageUrl}
                        alt="Product"
                        style={{
                            width: '100%',
                            height: 'auto',
                            marginBottom: '15px'
                        }}
                    />
                    {dataSets.find(ds => ds.id === activeDataSetId)?.adContent.callToAction && (
                        <button
                            onClick={onChatClick}
                            style={{
                                // position: 'absolute',
                                bottom: '20px',
                                left: '50%',
                                // transform: 'translateX(-50%)',
                                backgroundColor: '#0095f6',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                padding: '8px 16px',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                zIndex: 10,
                                width: '100%',
                            }}
                        >
                            {dataSets.find(ds => ds.id === activeDataSetId)?.adContent.callToAction}
                        </button>
                    )}
                </div>
                {/* <div>
                    <p style={{ textDecoration: 'line-through', color: '#666' }}>
                        ${originalPrice.toFixed(2)}
                    </p>
                    <p style={{ fontSize: '1.2em', fontWeight: 'bold', color: '#e41e31' }}>
                        ${discountedPrice.toFixed(2)}
                        <span style={{ marginLeft: '8px', fontSize: '0.8em' }}>
                            ({discountAmount}% OFF)
                        </span>
                    </p>
                </div> */}
            </div>
        </div>
    );
};

export default ProductDisplay; 