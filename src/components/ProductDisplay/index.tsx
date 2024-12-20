import { AdvertisersDataSet } from '../../hooks/useAdvertisersDataSet';
import { styles } from './styles';

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
    return (
        <div>
            <div style={styles.container}>
                <select
                    value={activeDataSetId}
                    onChange={(e) => onDataSetChange(e.target.value)}
                    style={styles.select}
                >
                    {dataSets.map((dataSet) => (
                        <option key={dataSet.id} value={dataSet.id}>
                            {dataSet.productDetails.name}
                        </option>
                    ))}
                </select>

                <div style={styles.imageContainer}>
                    <img
                        src={imageUrl}
                        alt="Product"
                        style={styles.image}
                    />
                    {dataSets.find(ds => ds.id === activeDataSetId)?.adContent.callToAction && (
                        <button
                            onClick={onChatClick}
                            style={styles.button}
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