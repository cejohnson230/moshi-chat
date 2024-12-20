export const styles = {
  container: {
    padding: '20px',
    marginRight: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    width: '300px'
  },
  select: {
    marginBottom: '10px'
  },
  imageContainer: {
    position: 'relative' as const,
  },
  image: {
    width: '100%',
    height: 'auto',
    marginBottom: '15px'
  },
  button: {
    bottom: '20px',
    left: '50%',
    backgroundColor: '#0095f6',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    padding: '8px 16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    zIndex: 10,
    width: '100%',
  },
  // Keeping commented styles for reference
  // originalPrice: {
  //   textDecoration: 'line-through',
  //   color: '#666'
  // },
  // discountedPrice: {
  //   fontSize: '1.2em',
  //   fontWeight: 'bold',
  //   color: '#e41e31'
  // },
  // discountLabel: {
  //   marginLeft: '8px',
  //   fontSize: '0.8em'
  // }
};
