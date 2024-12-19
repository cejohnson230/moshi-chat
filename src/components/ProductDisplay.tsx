interface ProductDisplayProps {
  imageUrl: string;
  originalPrice: number;
  discountAmount: number;
}

const ProductDisplay: React.FC<ProductDisplayProps> = ({ imageUrl, originalPrice, discountAmount }) => {
  const discountedPrice = originalPrice * (1 - discountAmount / 100);

  return (
    <div style={{ 
      padding: '20px',
      marginRight: '20px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      width: '300px'
    }}>
      <img 
        src={imageUrl} 
        alt="Product" 
        style={{ 
          width: '100%', 
          height: 'auto',
          marginBottom: '15px'
        }} 
      />
      <div>
        <p style={{ textDecoration: 'line-through', color: '#666' }}>
          ${originalPrice.toFixed(2)}
        </p>
        <p style={{ fontSize: '1.2em', fontWeight: 'bold', color: '#e41e31' }}>
          ${discountedPrice.toFixed(2)}
          <span style={{ marginLeft: '8px', fontSize: '0.8em' }}>
            ({discountAmount}% OFF)
          </span>
        </p>
      </div>
    </div>
  );
};

export default ProductDisplay; 