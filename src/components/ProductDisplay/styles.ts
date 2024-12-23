export const styles = {
  container: {
    padding: '10px',
    marginRight: '0',
    border: '1px solid #ddd',
    borderRadius: '8px',
    width: '400px',
    height: '600px',
    display: 'flex',
    flexDirection: 'column' as const,
  },
  select: {
    marginBottom: '10px'
  },
  imageContainer: {
    position: 'relative' as const,
    flex: '1',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'contain' as const,
    marginBottom: '0',
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
    position: 'absolute' as const,
    transform: 'translateX(-50%)',
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
